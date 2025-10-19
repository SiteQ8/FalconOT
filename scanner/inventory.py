def merge_assets(*lists):
    seen={}
    for L in lists:
        for a in L: seen[a['id']] = a
    return list(seen.values())
