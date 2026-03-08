# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reporting a Vulnerability

**Do NOT open a public issue for security vulnerabilities.**

If you discover a security vulnerability in FalconOT, please report it responsibly:

1. **GitHub Security Advisory** (preferred): Go to the [Security Advisories](https://github.com/SiteQ8/FalconOT/security/advisories) tab and click **"Report a vulnerability"**.
2. **Email**: Send details to **site@hotmail.com** with the subject line `[FalconOT Security]`.

### What to include

- Description of the vulnerability
- Steps to reproduce
- Affected version(s)
- Potential impact assessment
- Suggested fix (if any)

### Response timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 5 business days
- **Fix or mitigation**: Depends on severity; critical issues targeted within 7 days

### Scope

This policy covers the FalconOT codebase, including:

- Web GUI (`docs/`)
- REST API (`api/`)
- Scanner modules (`scanner/`)
- Docker configurations
- CI/CD workflows

### Out of scope

- Issues in third-party dependencies (report upstream; we will update)
- Social engineering attacks
- Denial of service against demo instances

### Disclosure

We follow coordinated disclosure. We will credit reporters in the release notes unless anonymity is requested.

## Security Best Practices for Users

- **Never expose** the FalconOT API to the public internet without authentication.
- **Rotate** all default credentials before any production use.
- **Restrict** scanning to assets you own and have written authorization to test.
- **Review** `config.example.yaml` and set appropriate allow-lists.
- Keep your Shodan API key confidential — never commit it to version control.
