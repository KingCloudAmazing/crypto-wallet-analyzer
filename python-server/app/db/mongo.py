from pymongo import MongoClient
from app.config.settings import MONGO_URI, DB_NAME
from datetime import datetime, timezone

# Lazy connection — only initialize when MONGO_URI is configured
_client = None
_db = None


def _get_db():
    global _client, _db
    if _db is None:
        if not MONGO_URI:
            raise RuntimeError("MONGO_URI is not configured. Set it in .env to use DB features.")
        _client = MongoClient(MONGO_URI)
        _db = _client[DB_NAME]
    return _db


def get_wallet_transactions(wallet_address: str, chain: str = None) -> list:
    """Fetch all raw transactions for a wallet from ledgerentries."""
    db = _get_db()
    query = {"wallet": wallet_address}
    if chain:
        query["chain"] = chain
    return list(db["ledgerentries"].find(query))


def insert_normalized_transactions(transactions: list) -> None:
    if transactions:
        db = _get_db()
        db["normalized_transactions"].insert_many(transactions)


def is_wallet_normalized(wallet: str, chain: str = None) -> bool:
    db = _get_db()
    query = {"wallet": wallet}
    if chain:
        query["chain"] = chain
    return db["normalized_transactions"].count_documents(query) > 0


def save_analysis_result(wallet: str, risk_result: dict, chain: str = None) -> None:
    """
    Upserts the risk analysis result into analysisHistory collection.
    """
    db = _get_db()
    
    query = {"wallet": wallet}
    if chain:
        query["chain"] = chain
        risk_result["chain"] = chain

    db["analysisHistory"].update_one(
        query,
        {
            "$set": {
                **risk_result,
                "updatedAt": datetime.now(tz=timezone.utc),
            },
            "$setOnInsert": {
                "createdAt": datetime.now(tz=timezone.utc),
            },
        },
        upsert=True,
    )