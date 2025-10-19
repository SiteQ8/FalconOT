# FalconOT

IoT / ICS / OT self-security toolkit — **demo data embedded by default** so the UI works out of the box.

> **Ethics & Scope:** For **authorized self-assessment only**. Scans restricted to allow-listed assets you control. See `DISCLAIMER.md`.


## Layout
```
FalconOT/
├─ docs/                # Desktop Web GUI (static, GitHub Pages-ready)
│  ├─ index.html
│  ├─ styles.css
│  └─ app.js
├─ api/                 # FastAPI REST API
│  ├─ main.py
│  ├─ models.py
│  ├─ deps.py
│  ├─ routers/{assets,scans,shodan}.py
│  └─ workers/scheduler.py
├─ scanner/             # Scanning/enrichment logic
│  ├─ nmap_runner.py
│  ├─ shodan_client.py
│  ├─ inventory.py
│  └─ probes/{modbus_probe.py,bacnet_probe.py,mqtt_probe.py}
├─ data/                # Demo datasets (API uses these)
│  ├─ demo-assets.json
│  └─ demo-findings.json
├─ config/config.example.yaml
├─ .github/workflows/ci.yml
├─ compose.yml
├─ Dockerfile.api
├─ Dockerfile.ui
├─ requirements.txt
├─ .env.example
├─ LICENSE (Apache-2.0)
├─ SECURITY.md
├─ CODE_OF_CONDUCT.md
├─ CONTRIBUTING.md
└─ DISCLAIMER.md
```
