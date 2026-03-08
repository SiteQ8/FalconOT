# Changelog

All notable changes to FalconOT will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-03-08

### Added
- **Login page** with demo credentials displayed (`FalconOT-Demo01` / `FalconOT`)
- **Password visibility toggle** on login form
- **Severity distribution chart** (bar chart on Overview dashboard)
- **Assets by type chart** (bar chart on Overview dashboard)
- **CSV export** for asset inventory
- **Executive summary report** generator
- **Reports** section in sidebar navigation
- **Critical severity** level for findings
- **Scan profiles** — Safe (ICS-friendly), Quick Discovery, Deep Audit
- **Max targets** selector in Scan Planner
- Enhanced topology visualization with colored zone indicators
- Sortable asset table with column sort indicators
- Asset count display in inventory view
- Session user display in Settings
- Sign Out button in header and Settings
- `.gitignore` — comprehensive Python/Docker/IDE ignore rules
- `CODEOWNERS` — code ownership for review automation
- `CODE_OF_CONDUCT.md` — Contributor Covenant v2.1 with ICS/OT-specific standards
- `CONTRIBUTING.md` — full contributor guide with setup, standards, and PR process
- `SUPPORT.md` — support channels and self-help guide
- `CHANGELOG.md` — version history (this file)
- `.github/dependabot.yml` — automated dependency updates for pip and GitHub Actions
- `.github/workflows/security.yml` — CodeQL analysis and dependency review
- `.github/ISSUE_TEMPLATE/bug_report.md` — structured bug report template
- `.github/ISSUE_TEMPLATE/feature_request.md` — feature request template
- `.github/ISSUE_TEMPLATE/security_vulnerability.md` — security report redirect template
- `.github/PULL_REQUEST_TEMPLATE.md` — PR checklist template

### Changed
- **UI completely redesigned** — dark login screen, improved dashboard layout
- Expanded demo findings dataset (15 → 18 findings, including critical severity)
- KPI grid now shows 5 cards (Total, Critical, High, Medium, Low)
- Findings list now sorted by severity (critical first)
- Finding cards redesigned with colored left border and severity badges
- Improved topology canvas rendering with zone colors and circular nodes
- `SECURITY.md` expanded with supported versions, scope, and response timelines
- Footer updated to show v2.0.0

### Security
- Login gate prevents unauthenticated access to dashboard
- No credentials stored in localStorage (session-only)

## [1.0.0] - 2026-03-08

### Added
- Desktop Web GUI with embedded demo data (GitHub Pages-ready)
- FastAPI REST API with asset inventory and findings endpoints
- Network topology visualization using Purdue Model levels
- OT/ICS/IoT asset discovery via Nmap and Shodan
- Protocol probes: Modbus TCP, BACnet, MQTT
- Scan Planner with safe defaults for ICS networks
- Bilingual UI (English / Arabic)
- Docker Compose deployment (API + UI containers)
- Demo datasets: 25 assets, 15 findings
- Apache-2.0 license
- CI workflow for Python compilation and docs validation

[2.0.0]: https://github.com/SiteQ8/FalconOT/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/SiteQ8/FalconOT/releases/tag/v1.0.0
