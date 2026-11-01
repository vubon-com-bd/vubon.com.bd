# Changelog — Identity Service

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Full identity & authentication service
- 5-layer clean architecture (Domain, Application, Infrastructure, Interfaces, Modules)
- 24 feature modules (auth + user + public-profile + health)
- 24 REST controllers
- JWT-based authentication (access + refresh tokens)
- Session management (rotation, revocation, multi-device)
- MFA / 2FA (TOTP-based)
- Social login (Google, Facebook, GitHub, Apple)
- SSO (OIDC + SAML)
- Biometric authentication
- Device management
- Account lock (brute-force protection)
- Login attempt audit trail
- Recovery codes for MFA backup
- Password policy + bcrypt hashing
- User profile management
- User contact management
- User address management (multiple addresses)
- User KYC submission
- User preferences
- User settings
- User activity log
- Role-based access control (RBAC)
- Fine-grained permissions
- Public profile API
- Email verification
- Phone verification (OTP)
- Prisma + InMemory repositories (DB_MODE switchable)
- Redis cache (sessions, tokens, rate limiting)
- BullMQ queues (email, SMS, cleanup)
- Background workers
- E2E test auto-generation
- Auto-generated InMemory repositories
- 17 unit test specs
- 21 e2e test specs
- Termux ARM64 compatibility (graceful Prisma degrade)

### Security
- JWT auth guard on protected endpoints
- Owner guard for resource-level auth
- Public guard for open endpoints
- MFA required for sensitive operations
- Account lock after N failed attempts
- Rate limiting on auth endpoints
- Password strength validation
- Session rotation
- CSRF protection
- Helmet security headers

---

## [1.0.0] - 2026-10-14

### Added
- Initial release
- Production-ready identity & authentication microservice
- ~1,200 source files + 78 test files
- Full documentation (README, ARCHITECTURE, API, TESTING, DEVELOPMENT, DEPLOYMENT)

---

[Unreleased]: https://github.com/vubon/identity-service/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/vubon/identity-service/releases/tag/v1.0.0
