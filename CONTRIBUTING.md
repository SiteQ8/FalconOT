# Contributing to FalconOT

Thank you for your interest in contributing to FalconOT! This guide will help you get started.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/FalconOT.git
   cd FalconOT
   ```
3. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites

- Python 3.12+
- Docker & Docker Compose (optional, for containerized runs)
- A modern web browser (for the GUI)

### Backend (API)

```bash
pip install -r requirements.txt
cd api && uvicorn main:app --reload
```

### Frontend (GUI)

The GUI is static HTML/CSS/JS in `docs/`. Open `docs/index.html` directly in a browser or serve it:

```bash
python -m http.server 8080 -d docs
```

**Demo credentials**: Username `FalconOT-Demo01` / Password `FalconOT`

### Docker

```bash
docker compose up --build
```

## How to Contribute

### Reporting Bugs

- Use the [Bug Report](https://github.com/SiteQ8/FalconOT/issues/new?template=bug_report.md) issue template
- Include browser/OS info, steps to reproduce, and expected vs actual behavior

### Suggesting Features

- Use the [Feature Request](https://github.com/SiteQ8/FalconOT/issues/new?template=feature_request.md) issue template
- Explain the use case and how it benefits OT/ICS security practitioners

### Security Vulnerabilities

- **Do NOT open a public issue.** See [SECURITY.md](SECURITY.md) for responsible disclosure.

### Code Contributions

- Look for issues labeled `good-first-issue` or `help-wanted`
- Comment on the issue to claim it before starting work
- Keep PRs focused — one feature or fix per PR

## Code Standards

### Python (API & Scanner)

- Follow PEP 8
- Use type hints where practical
- All modules must pass `python -m compileall -q`
- Keep dependencies minimal — add to `requirements.txt` only when necessary

### JavaScript (GUI)

- Vanilla JS only — no frameworks or build tools
- Desktop-only layout (fixed 1440px width)
- Maintain bilingual support (EN/AR)
- Safe defaults for all ICS/OT-related functionality

### General

- Write clear, descriptive commit messages
- Add comments for non-obvious logic, especially around ICS protocols
- Keep the demo mode functional — embedded data must work without an API

## Pull Request Process

1. Ensure your code passes CI checks (`python -m compileall -q api scanner`)
2. Verify the GUI works with demo data (no API required)
3. Update documentation if your change affects usage
4. Fill out the PR template completely
5. Request review from `@SiteQ8`

### PR Checklist

- [ ] Code follows the project style guidelines
- [ ] Self-review completed
- [ ] Demo mode still works
- [ ] No secrets or credentials committed
- [ ] Documentation updated (if applicable)
- [ ] Tested in a clean environment

## Issue Guidelines

- Search existing issues before creating a new one
- Use the appropriate issue template
- Be specific and include context
- For OT/ICS-specific issues, mention the protocol/device type involved

## Community

- Be respectful and constructive (see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md))
- Help others in discussions when you can
- Share your use cases — they help prioritize development

## License

By contributing to FalconOT, you agree that your contributions will be licensed under the Apache-2.0 License.
