# 🔐 auth-service

Authentication and authorization microservice for **Vubon.com.bd**.

Part of the `@vubon/auth-service` workspace package.

---

## 📊 Service Overview

| Field | Value |
|-------|-------|
| Name | `auth-service` |
| Version | 1.0.0 |
| Package | `@vubon/auth-service` |
| Runtime | Node.js ≥ 22 |
| Framework | NestJS 12 |
| ORM | Prisma 5 + PostgreSQL |
| Cache | Redis |
| Queue | BullMQ |
| Port | 3001 |
| Endpoints | 70 |
| Prisma models | 27 |
| Source files | ~730 |
| Tests | 2,293 across 309 suites |

---

## 🎯 Responsibilities

| Domain | Owns |
|--------|------|
| **Credentials** | Password hash, password policy, password reset |
| **Sessions** | Access tokens, refresh tokens, session lifecycle |
| **MFA** | TOTP secrets, recovery codes, 2FA enrollment |
| **OAuth / SSO** | Google, GitHub, Facebook, generic OIDC |
| **Device** | Device fingerprint, trust, revocation |
| **Account Lock** | Failed login tracking, lockout policy |
| **Verification** | Email verification, phone verification |
| **RBAC** | Roles, permissions, role-permission mapping |
| **Security** | CSRF, HSTS, rate limiting, login attempts |

**Does NOT own:** user profile, KYC, addresses, contacts, preferences — those belong to `user-service`.

---

## 🏛️ 5-Layer Architecture

    ┌─────────────────────────────────────┐
    │  L5  Modules      (NestJS wiring)   │
    ├─────────────────────────────────────┤
    │  L4  Interfaces   (HTTP/Controllers)│
    ├─────────────────────────────────────┤
    │  L3  Infrastructure (DB/Cache/Queue)│
    ├─────────────────────────────────────┤
    │  L2  Application  (Use Cases/CQRS)  │
    ├─────────────────────────────────────┤
    │  L1  Domain       (Business rules)  │
    └─────────────────────────────────────┘

Rule: a higher layer may import from a lower layer, never the reverse.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full details.

---

## 📁 Folder Structure

    apps/auth-service/
    ├── docs/                              # source-of-truth docs (.doc.ts)
    │   ├── architecture.doc.ts
    │   ├── api.doc.ts
    │   ├── deployment.doc.ts
    │   ├── development.doc.ts
    │   ├── testing.doc.ts
    │   └── extract-docs.cjs               # .doc.ts → .md generator
    │
    ├── src/
    │   ├── main.ts                        # bootstrap entrypoint
    │   └── module/
    │       ├── domain/                    # L1 — pure business logic
    │       ├── application/               # L2 — CQRS use cases
    │       ├── infrastructure/            # L3 — adapters
    │       ├── interfaces/                # L4 — HTTP transport
    │       └── modules/                   # L5 — NestJS wiring
    │
    ├── test/                              # unit + e2e tests
    ├── ARCHITECTURE.md                    # AUTO-GENERATED
    ├── API.md                             # AUTO-GENERATED
    ├── DEPLOYMENT.md                      # AUTO-GENERATED
    ├── DEVELOPMENT.md                     # AUTO-GENERATED
    ├── TESTING.md                         # AUTO-GENERATED
    ├── Dockerfile
    ├── railway.toml
    ├── package.json
    └── README.md

---

## 🚀 Quick Start

### 1. Install dependencies (from monorepo root)

    cd ~/vubon.com.bd
    pnpm install

### 2. Configure environment

    cp apps/auth-service/.env.example apps/auth-service/.env
    # Edit apps/auth-service/.env with your values

### 3. Generate Prisma client (from shared-kernel)

    cd packages/shared-kernel
    pnpm prisma generate

### 4. Run migrations

    pnpm prisma migrate dev

### 5. Start the service

    cd apps/auth-service
    pnpm start:dev

Server: **http://localhost:3001/api/v1**
Swagger: **http://localhost:3001/api/docs**

---

## 🔌 API Surface

Base path: `/api/v1`. Full reference in [API.md](./API.md).

### Auth (core)

    POST   /auth/login
    POST   /auth/register
    POST   /auth/refresh
    POST   /auth/logout
    POST   /auth/forgot-password
    POST   /auth/reset-password
    POST   /auth/verify-email
    POST   /auth/resend-verification

### MFA

    POST   /auth/mfa/enable
    DELETE /auth/mfa/disable
    POST   /auth/mfa/verify
    POST   /auth/mfa/backup-codes

### Session

    GET    /auth/sessions
    DELETE /auth/sessions/:id
    DELETE /auth/sessions          # revoke all

### Device

    GET    /auth/devices
    POST   /auth/devices/:id/trust
    DELETE /auth/devices/:id

### OAuth / SSO

    GET    /auth/oauth/:provider
    POST   /auth/oauth/:provider/callback
    GET    /auth/sso/:provider

### RBAC

    GET    /auth/roles
    GET    /auth/permissions
    POST   /auth/roles/assign
    DELETE /auth/roles/revoke

Full OpenAPI: `http://localhost:3001/api/docs-json`

---

## 🧪 Testing

    cd apps/auth-service
    pnpm test          # unit tests
    pnpm test:cov      # coverage
    pnpm test:e2e      # E2E
    pnpm type-check    # TypeScript check

Current coverage: **2,293 tests across 309 suites**.

Details in [TESTING.md](./TESTING.md).

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 5-layer architecture + design rules |
| [API.md](./API.md) | Full endpoint reference |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Local setup guide |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Railway / Fly.io / Render / VPS |
| [TESTING.md](./TESTING.md) | Test patterns + coverage |
| [../../SECURITY.md](../../SECURITY.md) | Monorepo security policy |

### Regenerating docs

The `.md` files are auto-generated from `docs/*.doc.ts`. To regenerate:

    cd apps/auth-service/docs
    node extract-docs.cjs

Edit the `.doc.ts` sources — never edit the `.md` files directly.

---

## 🚂 Deployment

Deployed as a Docker container. See [DEPLOYMENT.md](./DEPLOYMENT.md).

Key points:

- **Root Directory** — leave empty (repo root)
- **Dockerfile Path** — `apps/auth-service/Dockerfile`
- **Start command** — `node dist/main`
- **Health check** — `/api/docs-json`

Required environment variables are documented in `.env.production.example`.

---

## 🔐 Security

This service is part of the monorepo security policy — see
[../../SECURITY.md](../../SECURITY.md).

Current status: **0 known vulnerabilities** (`pnpm audit --prod`).

Security invariants enforced by this service:

- Passwords hashed with bcrypt (12 rounds minimum)
- Access tokens are short-lived (15 min default)
- Refresh tokens rotate on use
- Failed logins trigger progressive lockout
- MFA secrets never logged
- All session tokens revocable
- Device fingerprints tracked and revocable

---

## 📄 License

MIT © Vubon Team
