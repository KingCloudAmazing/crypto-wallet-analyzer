from app.processors.risk_engine import RiskEngine
from app.schemas.models import WalletAggregates


# ── Existing heuristic tests (updated with new default fields) ──────


def test_evaluate_heuristic_max_score():
    """All original rules fire → capped at 100."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0x123",
        total_tx_count=2000,
        total_volume=500000.0,
        unique_interacted_addresses=600,
        avg_tx_value=250.0,
        active_days=2,
        risk_factors=[],
    )

    score = engine.evaluate_heuristic(agg)
    # 10 base + 30 (tx count) + 20 (volume) + 20 (unique addrs) + 30 (burner) = 110 → capped 100
    assert score == 100.0
    assert "High transaction frequency" in agg.risk_factors
    assert "High transaction volume" in agg.risk_factors
    assert "High activity in short duration (burner wallet format)" in agg.risk_factors


def test_evaluate_heuristic_base_only():
    """Low-risk profile — only the base 10 points."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0xabc",
        total_tx_count=10,
        total_volume=500.0,
        unique_interacted_addresses=5,
        avg_tx_value=50.0,
        active_days=10,
        risk_factors=[],
    )

    score = engine.evaluate_heuristic(agg)
    assert score == 10.0
    assert agg.risk_factors == []


# ── New heuristic rule tests ────────────────────────────────────────


def test_heuristic_large_single_tx():
    """max_tx_value > 50 000 → +15 + flag."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0xwhale",
        total_tx_count=5,
        total_volume=60000.0,
        unique_interacted_addresses=3,
        avg_tx_value=12000.0,
        active_days=10,
        max_tx_value=55000.0,
        risk_factors=[],
    )
    score = engine.evaluate_heuristic(agg)
    assert score == 25.0  # 10 base + 15
    assert "Unusually large single transaction" in agg.risk_factors


def test_heuristic_high_error_rate():
    """error_tx_ratio > 0.15 → +15 + flag."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0xerr",
        total_tx_count=20,
        total_volume=1000.0,
        unique_interacted_addresses=5,
        avg_tx_value=50.0,
        active_days=10,
        error_tx_count=5,
        error_tx_ratio=0.25,
        risk_factors=[],
    )
    score = engine.evaluate_heuristic(agg)
    assert score == 25.0  # 10 + 15
    assert "High failed transaction rate" in agg.risk_factors


def test_heuristic_mixer_pattern():
    """Near-zero net flow + >100 txs → +25."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0xmix",
        total_tx_count=150,
        total_volume=10000.0,
        unique_interacted_addresses=50,
        avg_tx_value=66.67,
        active_days=30,
        net_flow=100.0,  # < 10000 * 0.05 = 500
        total_incoming_volume=5050.0,
        total_outgoing_volume=4950.0,
        std_tx_value=50.0, # Prevent uniform value rule
        risk_factors=[],
    )
    score = engine.evaluate_heuristic(agg)
    assert score == 35.0  # 10 + 25
    assert "Near-zero net flow (potential mixer)" in agg.risk_factors


def test_heuristic_bot_detection():
    """avg_time_between_tx < 30s + >200 txs → +20."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0xbot",
        total_tx_count=300,
        total_volume=5000.0,
        unique_interacted_addresses=10,
        avg_tx_value=16.67,
        active_days=5,
        avg_time_between_tx=15.0,
        net_flow=1000.0, # Prevent mixer pattern rule
        std_tx_value=50.0, # Prevent uniform value rule
        risk_factors=[],
    )
    score = engine.evaluate_heuristic(agg)
    assert score == 30.0  # 10 + 20
    assert "Rapid-fire transactions (bot pattern)" in agg.risk_factors


def test_heuristic_address_concentration():
    """max_single_address_volume > 80% of total_volume → +15."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0xconc",
        total_tx_count=10,
        total_volume=1000.0,
        unique_interacted_addresses=3,
        avg_tx_value=100.0,
        active_days=10,
        max_single_address_volume=900.0,  # 90% > 80%
        risk_factors=[],
    )
    score = engine.evaluate_heuristic(agg)
    assert score == 25.0  # 10 + 15
    assert "High counterparty concentration" in agg.risk_factors


def test_heuristic_uniform_values():
    """std_tx_value < avg_tx_value * 0.05 + >50 txs → +10."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0xuniform",
        total_tx_count=100,
        total_volume=50000.0,
        unique_interacted_addresses=20,
        avg_tx_value=500.0,
        active_days=30,
        std_tx_value=10.0,  # < 500 * 0.05 = 25
        risk_factors=[],
    )
    score = engine.evaluate_heuristic(agg)
    assert score == 20.0  # 10 + 10
    assert "Suspiciously uniform transaction values" in agg.risk_factors


# ── ML scoring tests ───────────────────────────────────────────────


def test_ml_fallback_without_model():
    """Without a model file, ML returns (25.0, {})."""
    engine = RiskEngine()
    engine.model = None  # force no model
    agg = WalletAggregates(
        wallet_address="0xfallback",
        total_tx_count=10,
        total_volume=500.0,
        unique_interacted_addresses=5,
        avg_tx_value=50.0,
        active_days=10,
        risk_factors=[],
    )
    score, contributions = engine.evaluate_ml(agg)
    assert score == 25.0
    assert contributions == {}


def test_ml_feature_vector_length():
    """Feature vector has exactly 17 elements."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0xlen",
        total_tx_count=10,
        total_volume=500.0,
        unique_interacted_addresses=5,
        avg_tx_value=50.0,
        active_days=10,
        risk_factors=[],
    )
    fv = engine._build_feature_vector(agg)
    assert len(fv) == 17


# ── Full pipeline test ──────────────────────────────────────────────


def test_calculate_risk_full_pipeline():
    """calculate_risk returns a valid RiskScoreResponse."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0xpipeline",
        total_tx_count=10,
        total_volume=500.0,
        unique_interacted_addresses=5,
        avg_tx_value=50.0,
        active_days=10,
        risk_factors=[],
    )
    res = engine.calculate_risk(agg)
    assert res.wallet_address == "0xpipeline"
    assert res.heuristic_score == 10.0  # base only
    assert res.overall_score >= 0.0
    assert res.risk_level in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    assert isinstance(res.feature_contributions, dict)


def test_calculate_risk_high_risk_profile():
    """Profile triggering multiple rules gets a higher score."""
    engine = RiskEngine()
    agg = WalletAggregates(
        wallet_address="0xdanger",
        total_tx_count=1500,
        total_volume=200000.0,
        unique_interacted_addresses=600,
        avg_tx_value=133.33,
        active_days=2,
        max_tx_value=80000.0,
        error_tx_ratio=0.20,
        error_tx_count=300,
        risk_factors=[],
    )
    res = engine.calculate_risk(agg)
    assert res.heuristic_score == 100.0  # capped
    assert res.risk_level in ["HIGH", "CRITICAL"]
    assert "High transaction frequency" in res.flags
    assert "Unusually large single transaction" in res.flags
    assert "High failed transaction rate" in res.flags
