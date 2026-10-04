# Changelog

All notable changes to `@vubon/auth-service`.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Dockerfile for Railway deployment
- railway.toml + nixpacks.toml
- docker-entrypoint.sh (migrate + start)
- Top-level documentation (README, ARCHITECTURE, API, DEPLOYMENT, DEVELOPMENT, TESTING)
- `.env.production.example` template
- `.dockerignore` for build optimization
- `.nvmrc`, `.editorconfig`

### Changed
- Documentation is now extracted from `docs/*.doc.ts` via `extract-docs.cjs`

---

## [1.0.0] — 2026-09-27

### Added

#### Domain Layer
- Auth aggregate with session, MFA, device, verification invariants
- 27 Prisma models for identity and auth
- Domain events: `UserRegisteredEvent`, `UserLoggedInEvent`, `MfaEnabledEvent`, `SessionRevokedEvent`, `AccountLockedEvent`

#### Application Layer
- CQRS: commands, queries, handlers
- Sagas: user verification, MFA enrollment, session cleanup
- Validators (Zod), DTOs, mappers

#### Infrastructure Layer
- Prisma repositories (18 repositories)
- Redis cache for sessions and tokens
- BullMQ workers (email, SMS, cleanup)
- External: email, SMS, push, storage

#### Interfaces Layer
- 70 REST endpoints under `/api/v1`
- Swagger documentation at `/api/docs`
- Guards: JWT, role, permission, MFA-verified
- Interceptors: audit, correlation-id
- Filters: domain, validation, HTTP

#### Modules Layer
- AppModule + CommonModule
- Feature modules: auth, session, mfa, device, oauth, sso, rbac, verification
- Health checks

### Security
- bcrypt password hashing (12 rounds)
- JWT access tokens (15 min) + refresh tokens (7 days)
- Progressive account lockout
- Login attempt tracking (IP + email)
- Device fingerprint + trust
- MFA (TOTP) + recovery codes
- Rate limiting per endpoint
- CSRF + HSTS headers

### Tests
- 2,293 tests
- 309 test suites
- Unit + integration + E2E coverage

### Changed
- NestJS upgraded 10 → 12
- Prisma centralized to `@vubon/shared-kernel/prisma`

### Fixed
- CVE-2026-35515 (NestJS SSE injection) via framework upgrade
- 11 HIGH-severity CVEs across dependency tree via `pnpm.overrides`
