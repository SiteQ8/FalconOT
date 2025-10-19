import os, ipaddress
def _cidr_ok(cidr: str) -> bool:
    try:
        ipaddress.ip_network(cidr, strict=False); return True
    except: return False
def find_assets(cidrs=None, org=None):
    try: import shodan
    except Exception as e: return {"error":"shodan library not available", "details": str(e)}
    api_key = os.getenv("SHODAN_API_KEY")
    if not api_key: return {"error": "Missing SHODAN_API_KEY"}
    api = shodan.Shodan(api_key)
    results = []
    if cidrs:
        for c in cidrs:
            if not _cidr_ok(c): continue
            res = api.search(f'net:"{c}"'); results.extend(res.get("matches", []))
    if org:
        res = api.search(f'org:"{org}"'); results.extend(res.get("matches", []))
    cleaned = [{
        "ip_str": m.get("ip_str"),
        "port": m.get("port"),
        "transport": m.get("transport"),
        "product": m.get("product") or (m.get("opts") or {}).get("product"),
        "data_snippet": (m.get("data") or "")[:400]
    } for m in results]
    return {"count": len(cleaned), "items": cleaned[:500]}
