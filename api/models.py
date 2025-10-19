from pydantic import BaseModel
from typing import List

class Asset(BaseModel):
    id: str
    name: str
    ip: str
    type: str
    purdue: str
    ports: List[int] = []
    tags: List[str] = []

class Finding(BaseModel):
    asset_id: str
    severity: str
    title: str
    remediation: str
