# 🛡️ Security

Monorepo-wide security policy and vulnerability report for `vubon.com.bd`.

---

## 📊 Current Security Status

**Scan date:** 2026-09-27
**Scanner:** `pnpm audit --prod`

    ✅ auth-service    → No known vulnerabilities
    ✅ user-service    → No known vulnerabilities

| Metric | Before | After |
|--------|--------|-------|
| Total vulnerabilities | 32 | **0** |
| High severity | 11 | **0** |
| Moderate severity | 19 | **0** |
| Low severity | 2 | **0** |

---

## 🔒 Fixed Vulnerabilities

The following CVEs were remediated via `pnpm.overrides` in the root `package.json`.

| CVE / Advisory | Package | Vulnerable | Fixed to | Severity |
|----------------|---------|-----------|----------|----------|
| GHSA-xf7r-hgr6-v32p | multer | <2.1.0 | **2.4.0** | High |
| GHSA-v52c-386h-88mc | multer | <2.1.0 | **2.4.0** | High |
| GHSA-4pg4-qvpc-pvv6 | multer | <2.1.1 | **2.4.0** | High |
| CVE-2026-4800 | lodash | <=4.17.23 | **4.18.0** | High |
| GHSA-2883-xcg3-v3hh | js-yaml | <4.3.2 | **4.3.2** | High |
| GHSA-96hv-2xvq-fx4p | ws | <8.21.0 | **8.21.0** | High |
| GHSA-w5hq-g745-h8pq | uuid | <11.1.1 | **11.1.1** | Moderate |
| GHSA-xf7r-hgr6-v32p | file-type | <21.3.2 | **21.3.2** | Moderate |
| GHSA-v422-hmwv-36x6 | body-parser | <1.20.6 | **2.3.0** | Low |
| GHSA-9q82-xgwf-vj6h | @apollo/server | <5.5.0 | **5.5.1** | Moderate |
| GHSA-r5fr-rjxr-66jc | qs | <6.16.0 | **6.16.0** | Moderate |

---

## 🎯 Framework Upgrade

NestJS was upgraded from **v10** → **v12** across the entire monorepo.

| Package | Old | New |
|---------|-----|-----|
| @nestjs/common | 10.3.0 | **12.1.0** |
| @nestjs/core | 10.3.0 | **12.1.0** |
| @nestjs/cqrs | 10.2.0 | **12.0.0** |
| @nestjs/config | 3.3.0 | **12.0.1** |
| @nestjs/jwt | 10.2.0 | **12.0.2** |
| @nestjs/passport | 10.0.0 | **12.0.0** |
| @nestjs/platform-express | 10.3.0 | **12.1.0** |
| @nestjs/swagger | 7.3.0 | **12.0.2** |
| @nestjs/throttler | 5.0.0 | **6.7.1** |
| @nestjs/terminus | 10.x | **12.1.0** |
| @nestjs/graphql | 14.0.1 | **14.0.2** |
| @nestjs/event-emitter | 2.0.0 | **12.0.1** |

This upgrade resolved **CVE-2026-35515** (SSE message injection in `@nestjs/core`).

---

## 🛠️ Override Configuration

All security overrides live in root `package.json`:

    {
      "pnpm": {
        "overrides": {
          "multer": "2.4.0",
          "js-yaml": "4.3.2",
          "ws": "8.21.0",
          "lodash": "4.18.0",
          "file-type": "21.3.2",
          "qs": "6.16.0",
          "uuid": "11.1.1",
          "body-parser": "2.3.0",
          "@apollo/server": "5.5.1"
        }
      }
    }

When a new CVE is disclosed:

1. Identify patched version via GitHub Advisory Database.
2. Add the override in root `package.json`.
3. Run `pnpm install`.
4. Verify with `pnpm audit --prod`.
5. Commit — no source-code change required.

---

## 📋 Recurring Audit Process

### Local audit

    cd apps/auth-service && pnpm audit --prod
    cd apps/user-service && pnpm audit --prod

### CI integration

The CI workflow (`\.github/workflows/ci\.yml`) runs:

    pnpm audit --prod --audit-level=high

This blocks merges when **high** severity vulnerabilities are introduced.
Moderate and low severities are logged but do not block.

### Weekly scan

`.github/workflows/codeql.yml` runs every Sunday (`0 0 * * *`) and scans
the entire repository for static-analysis findings.

---

## 🔐 Secrets & Environment

| Rule | Enforcement |
|------|-------------|
| `.env` files **never** committed | `.gitignore` block |
| `.env.example` templates committed | reviewed per service |
| Secrets injected via Railway | dashboard variables |
| No hardcoded secrets in source | verified via `grep` + CodeQL |

### Checks performed

    ✅ .env files — 0 tracked
    ✅ .env.example — tracked (safe, redacted)
    ✅ .pem / .key / .secret — 0 tracked
    ✅ Hardcoded JWT secret — 0 found
    ✅ Hardcoded API keys — 0 found
    ✅ Hardcoded passwords — 0 found

---

## 🚫 Accepted Risks

No accepted risks at this time. The repository is at **0 known vulnerabilities**.

Any future accepted risk **must** be documented here with:

- CVE / advisory ID
- Reason for acceptance
- Mitigation in place
- Review-by date

---

## 📞 Reporting a Vulnerability

If you discover a security issue:

1. **Do not open a public GitHub issue.**
2. Email: security@vubon.com.bd
3. Include: affected package, CVE (if any), reproduction steps.
4. Expect an acknowledgement within 48 hours.

---

## 📄 References

- [README.md](./README.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- GitHub Advisory Database: https://github.com/advisories
- pnpm audit docs: https://pnpm.io/cli/audit
