# Identity Service — vubon.com.bd

Enterprise identity & authentication microservice with full DDD + CQRS + multi-persistence support.

## 📋 Overview

| Item | Value |
|------|-------|
| Package | `@vubon/identity-service` |
| Port | `3001` |
| Framework | NestJS 12 |
| Architecture | Clean Architecture (5 layers) |
| Database | PostgreSQL (`vubon_identity`) + InMemory fallback |
| Tests | 38 (17 unit + 21 e2e) |
| Feature Modules | 24 |

## 🚀 Quick Start

### Prerequisites
- Node.js >= 22
- pnpm >= 9
- PostgreSQL (optional for Termux — InMemory mode available)

### Install
\`\`\`bash
pnpm install
\`\`\`

### Setup Environment
\`\`\`bash
cp .env.example .env
# Edit .env with your DB credentials
\`\`\`

### Database Setup (Manual — Termux-safe)
\`\`\`bash
# Create DB
createdb -h localhost -U $(whoami) vubon_identity

# Apply tables
psql -h localhost -U $(whoami) -d vubon_identity \\
  -f ~/.db-manual-migrations/identity-service/20261012_create_all_tables.sql
\`\`\`

### Run
\`\`\`bash
# Development
pnpm start:dev

# Production
pnpm build
pnpm start:prod
\`\`\`

Server: **http://localhost:3001**
Swagger: **http://localhost:3001/api/docs**

## 🏗️ Architecture

### 5 Layers (Clean Architecture)
\`\`\`
┌────────────────────────────────────────────┐
│  Interfaces   (REST + GraphQL + Guards)   │
├────────────────────────────────────────────┤
│  Application  (CQRS + Sagas + DTOs)       │
├────────────────────────────────────────────┤
│  Domain       (Entities + VOs + Services) │
├────────────────────────────────────────────┤
│  Infrastructure (Prisma + InMemory + Q)   │
├────────────────────────────────────────────┤
│  Modules      (NestJS feature modules)    │
└────────────────────────────────────────────┘
\`\`\`

See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

## 🎯 Key Features

### Authentication
- **JWT** — Access + Refresh tokens
- **Session management** — Rotation, revocation, multi-device
- **MFA / 2FA** — TOTP-based
- **OAuth / Social login** — Google, Facebook, GitHub, Apple
- **SSO** — OIDC + SAML
- **Biometric** — Device-based authentication
- **Account lock** — Brute-force protection
- **Login attempts** — Audit trail
- **Recovery codes** — MFA backup
- **Password policy** — Validation + hashing (bcrypt)

### User Management
- **User profiles** — Basic info, avatar
- **Contact** — Email, phone, verified
- **Address** — Multiple addresses with type
- **KYC** — Document verification
- **Preferences** — Language, timezone, notifications
- **Settings** — Account settings
- **Activity** — Login history, actions
- **Roles** — RBAC
- **Permissions** — Fine-grained

### Verification
- **Email verification** — Token-based
- **Phone verification** — OTP-based
- **KYC submission** — Document upload

### Domain Layer
- **Value Objects** — UserId, Email, Phone, Password, SessionId, Token...
- **Entities** — UserEntity, AuthEntity, SessionEntity, MfaEntity...
- **Domain Services** — Password hashing, OTP generation, session rotation
- **Specifications** — CanLogin, CanVerify, CanUpdateProfile...
- **Events** — UserCreated, LoginSucceeded, SessionRevoked...

### Application Layer
- **CQRS** — Commands + Queries + Handlers
- **Sagas** — Auth lifecycle, session expiry, verification flow
- **DTOs** — Request + Response (multi-shape)
- **Validators** — Zod-based

### Infrastructure Layer
- **Prisma repositories** — 27 Prisma-based
- **InMemory repositories** — 27 InMemory-based (Termux fallback)
- **Cache** — Redis-backed (sessions, tokens, rate limiting)
- **Queues** — BullMQ (email, SMS, cleanup)
- **Workers** — Background jobs
- **External** — SendGrid, SSLWireless

### Interfaces Layer
- **24 REST controllers** — Auth, User, MFA, Session, etc.
- **Guards** — JwtAuthGuard, PublicGuard, OwnerGuard
- **Interceptors** — Logging, Timeout, Cache
- **Decorators** — @CurrentUser, @Public, @Owner, @Roles

## 🎯 Database Mode

Toggle via `DB_MODE` env var:
\`\`\`env
# Real database (PostgreSQL)
DB_MODE=prisma

# InMemory (Termux / dev / testing)
DB_MODE=memory
\`\`\`

## 🧪 Testing

### Unit Tests
\`\`\`bash
pnpm test:unit          # Run once
pnpm test:unit:watch    # Watch mode
pnpm test:unit:cov      # With coverage
\`\`\`

- **17 spec files**

### E2E Tests
\`\`\`bash
pnpm test:e2e           # Run once
pnpm generate:e2e       # Auto-generate from endpoints
\`\`\`

- **21 spec files**

### All Tests
\`\`\`bash
pnpm test:all           # Unit + E2E
\`\`\`

## 📊 Endpoints Overview

| Group | Controllers |
|-------|-------------|
| **Auth** | auth, auth-session, auth-token, auth-mfa, auth-2fa, auth-social, auth-sso, auth-biometric, auth-device, auth-login-attempt, auth-account-lock, auth-recovery-code, auth-role, auth-permission, auth-settings |
| **User** | user, user-profile, user-settings, user-preferences, user-address, user-contact, user-kyc, user-activity |
| **Public** | public-profile |
| **Health** | health |

Full API: **http://localhost:3001/api/docs**

## 📁 Project Structure
\`\`\`
identity-service/
├── src/
│   ├── main.ts
│   └── module/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       ├── interfaces/
│       └── modules/
├── test/
│   ├── unit/
│       ├── e2e/
│   └── helpers/
├── scripts/
│   └── generate-e2e-tests.mjs
└── prisma/
    └── schema.prisma
\`\`\`

## 🔐 Security

- **JWT auth** — via `JwtAuthGuard`
- **MFA** — TOTP-based (optional)
- **Session rotation** — Periodic token refresh
- **Rate limiting** — Login attempts throttled
- **Account lock** — After N failed attempts
- **Password hashing** — bcrypt (rounds configurable)
- **SQL injection prevention** — Prisma parameterized queries
- **XSS/CSRF** — Helmet + CSRF middleware

## 📝 License

Private — vubon.com.bd

## 🤝 Contributing

See [ARCHITECTURE.md](./ARCHITECTURE.md) for layer rules and patterns.
