# FalconOT

IoT / ICS / OT self-security toolkit — **demo data embedded by default** so the UI works out of the box.

> **Ethics & Scope:** For **authorized self-assessment only**. Scans restricted to allow-listed assets you control. See `DISCLAIMER.md`.

---

## Quick Start (UI only — Demo Mode)
```bash
python -m http.server --directory docs 9000
# open http://localhost:9000
```

## Full Stack (API + UI via Docker)
```bash
cp config/config.example.yaml config/config.yaml
cp .env.example .env  # add SHODAN_API_KEY if needed
docker compose up --build
# UI: http://localhost:8080  |  API: http://localhost:8000
```

## Why this UI works everywhere
- Single **`app.js`** (no module imports), so it runs on any static host.
- Demo dataset **embedded** in JS (no fetch needed to start).
- Optional **Use Live API** toggle to fetch local API when you’re ready.

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

## Serving `/docs` on GitHub Pages
- Repo Settings → Pages → **Build from branch** → `main` → `/docs`.

## License
Apache-2.0.
