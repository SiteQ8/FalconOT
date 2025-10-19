from fastapi import APIRouter
from ..deps import load_json
router = APIRouter()

@router.get("")
def list_assets():
    return load_json("demo-assets.json")

@router.get("/findings")
def list_findings():
    return load_json("demo-findings.json")
