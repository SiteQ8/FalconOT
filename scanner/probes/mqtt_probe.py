import socket
def mqtt_banner(ip: str, port: int = 1883, timeout=2.0):
    try:
        s = socket.create_connection((ip, port), timeout=timeout); s.close()
        return {"ip": ip, "open": True}
    except Exception as e:
        return {"ip": ip, "open": False, "error": str(e)}
