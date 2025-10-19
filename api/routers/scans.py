from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from ..deps import load_config
from ...scanner.nmap_runner import build_cmd

router = APIRouter()

class ScanReq(BaseModel):
    targets: List[str]
    safe: bool = True
    top_ports: int | None = None

@router.post("")
def plan_scan(req: ScanReq):
    cfg = load_config()
    top = req.top_ports or cfg.get("scanner", {}).get("nmap_top_ports", 100)
    cmd = " ".join(build_cmd(req.targets, top_ports=top, host_timeout_ms=cfg.get("scanner",{}).get("host_timeout_ms",8000), safe=req.safe))
    return {"plan": cmd, "note": "Execution disabled in demo. Use a worker in production."}
