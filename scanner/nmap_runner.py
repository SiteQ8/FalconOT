import shlex
def build_cmd(targets, top_ports=100, host_timeout_ms=8000, safe=True):
    base = f"nmap -Pn -sS -sV --top-ports {top_ports} --host-timeout {host_timeout_ms}ms"
    if safe: base += " --scan-delay 150ms --max-retries 1"
    if not isinstance(targets, (list, tuple)) or not targets: targets = ["127.0.0.1"]
    return shlex.split(base + " " + " ".join(shlex.quote(t) for t in targets))
