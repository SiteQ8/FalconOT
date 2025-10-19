from pymodbus.client import ModbusTcpClient
def modbus_id(ip: str, port: int = 502, unit: int = 0xFF, timeout=2.0):
    try:
        c = ModbusTcpClient(ip, port=port, timeout=timeout)
        if not c.connect(): return {"ip": ip, "error": "connect failed"}
        rr = c.execute(function_code=0x2B, MEI_Type=0x0E, read_code=0x01, object_id=0x00, unit=unit)
        c.close()
        if not hasattr(rr, "information"): return {"ip": ip, "result": None}
        return {"ip": ip, "device_id": rr.information}
    except Exception as e:
        return {"ip": ip, "error": str(e)}
