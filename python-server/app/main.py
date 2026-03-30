from fastapi import FastAPI
from app.db.mongo import (
    get_wallet_transactions,
    insert_normalized_transactions,
    is_wallet_normalized
)
from app.processors.normalize import normalize_transactions
from app.schemas.transaction import NormalizedTransaction

app = FastAPI()

@app.get("/health")
def get_health():
    return {"status": "healthy", "service": "python-normalizer"}

@app.post("/normalize/{wallet}")
def normalize_wallet(wallet: str):
    if is_wallet_normalized(wallet):
        return {"message": "Already normalized"}

    # 1. Fetch raw transactions
    raw_txns = get_wallet_transactions(wallet)

    if not raw_txns:
        return {"message": "No transactions found"}

    # 2. Normalize
    normalized = normalize_transactions(raw_txns, wallet)

    # 3. Validate
    validated = []
    for tx in normalized:
        try:
            validated_tx = NormalizedTransaction(**tx).model_dump()
            validated.append(validated_tx)
        except Exception as e:
            print("Validation error:", e)

    # 4. Store
    insert_normalized_transactions(validated)

    return {
        "wallet": wallet,
        "normalized_count": len(validated)
    }