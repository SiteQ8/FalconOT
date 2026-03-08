# FalconOT

**IoT / ICS / OT self-security toolkit** — demo data embedded by default so the UI works out of the box.

> **Ethics & Scope:** For **authorized self-assessment only**. Scans restricted to allow-listed assets you control. See [`DISCLAIMER.md`](DISCLAIMER.md).

---

## Features

- **Dashboard** with KPIs, severity distribution charts, and asset-type breakdown
- **Network topology** visualization using the Purdue Model (L1–L3.5 + DMZ)
- **Asset inventory** with search, sortable columns, and CSV export
- **Findings engine** with Critical/High/Medium/Low severity levels
- **Scan Planner** with ICS-safe profiles (Safe, Quick Discovery, Deep Audit)
- **Executive reports** generated from current dataset
- **Login gate** with demo credentials for instant evaluation
- **Bilingual UI** (English / Arabic) with RTL support
- **Protocol probes**: Modbus TCP, BACnet, MQTT
- **Enrichment**: Shodan API integration for device fingerprinting
- **Docker-ready**: Single `docker compose up` deployment

## Demo

The GUI ships with 25 OT/ICS/IoT assets and 18 findings — no API or backend required.

**Demo credentials:**

| Field    | Value              |
| -------- | ------------------ |
| Username | `FalconOT-Demo01`  |
| Password | `FalconOT`         |

Open `docs/index.html` in any modern browser or visit the GitHub Pages deployment.

## Quick Start

### Option 1: Static GUI (no backend)

```bash
# Clone and open
git clone https://github.com/SiteQ8/FalconOT.git
cd FalconOT
python -m http.server 8080 -d docs
# Open http://localhost:8080
```

### Option 2: Full Stack (API + GUI)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the API
cd api && uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# In the GUI, toggle "Use Live API" to connect
```

### Option 3: Docker Compose

```bash
docker compose up --build
# API: http://localhost:8000
# GUI: http://localhost:8080
```

## Project Layout

```
FalconOT/
├── docs/                          # Desktop Web GUI (GitHub Pages-ready)
│   ├── index.html                 # Login + dashboard
│   ├── styles.css                 # Styles (login, charts, layout)
│   └── app.js                     # Application logic
├── api/                           # FastAPI REST API
│   ├── main.py
│   ├── models.py
│   ├── deps.py
│   ├── routers/
│   │   ├── assets.py
│   │   ├── scans.py
│   │   └── shodan.py
│   └── workers/
│       └── scheduler.py
├── scanner/                       # Scanning & enrichment
│   ├── nmap_runner.py
│   ├── shodan_client.py
│   ├── inventory.py
│   └── probes/
│       ├── modbus_probe.py
│       ├── bacnet_probe.py
│       └── mqtt_probe.py
├── data/                          # Demo datasets
│   ├── demo-assets.json
│   └── demo-findings.json
├── config/
│   └── config.example.yaml
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # Build & lint
│   │   └── security.yml           # CodeQL, Bandit, dependency review
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── security_vulnerability.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── dependabot.yml
│   └── FUNDING.yml
├── compose.yml
├── Dockerfile.api
├── Dockerfile.ui
├── requirements.txt
├── .env.example
├── .gitignore
├── CODEOWNERS
├── LICENSE                        # Apache-2.0
├── README.md
├── CHANGELOG.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── SUPPORT.md
└── DISCLAIMER.md
```

## Configuration

Copy the example config and customize:

```bash
cp config/config.example.yaml config/config.yaml
cp .env.example .env
```

Set your Shodan API key in `.env`:

```
SHODAN_API_KEY=your_key_here
```

## Security

- **Vulnerability reporting**: See [SECURITY.md](SECURITY.md)
- **Automated scanning**: CodeQL, Bandit SAST, dependency review via GitHub Actions
- **Dependency updates**: Dependabot monitors pip, Docker, and GitHub Actions dependencies

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Quick summary:
1. Fork → branch → PR
2. Maintain desktop-only UI (1440px) and safe ICS/OT defaults
3. Keep demo mode functional
4. Fill out the PR template

## Support

See [SUPPORT.md](SUPPORT.md) for how to get help.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## License

[Apache-2.0](LICENSE) — Copyright 2026 [SiteQ8](https://github.com/SiteQ8)

---

Built in Kuwait by [@SiteQ8](https://github.com/SiteQ8)
