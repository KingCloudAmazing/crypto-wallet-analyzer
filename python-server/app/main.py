from fastapi import FastAPI
from app.schemas.models import WalletHistory, WalletAggregates, RiskScoreResponse
from app.processors.aggregates import compute_aggregates
from app.processors.risk_engine import RiskEngine

app = FastAPI(
    title="Crypto Wallet Risk Analyzer - Python Engine",
    description="Calculates statistical aggregates and ML risk scores heavily from normalized data representations.",
    version="1.0.0"
)

risk_engine = RiskEngine()

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "python-server"}

@app.post("/aggregates", response_model=WalletAggregates)
def get_aggregates(history: WalletHistory):
    return compute_aggregates(history)

@app.post("/risk-score", response_model=RiskScoreResponse)
def get_risk_score(history: WalletHistory):
    aggregates = compute_aggregates(history)
    return risk_engine.calculate_risk(aggregates)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
