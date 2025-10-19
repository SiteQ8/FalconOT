from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ...scanner.shodan_client import find_assets as shodan_find

router = APIRouter()

class ShodanQuery(BaseModel):
    cidrs: List[str] = []
    org: Optional[str] = None

@router.post("/search")
def shodan_search(q: ShodanQuery):
    if not q.cidrs and not q.org:
        raise HTTPException(400, "Provide cidrs or org")
    return shodan_find(cidrs=q.cidrs, org=q.org)
