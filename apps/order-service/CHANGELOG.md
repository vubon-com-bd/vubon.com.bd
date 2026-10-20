# Changelog — Order Service

All notable changes documented here.
Format: [Keep a Changelog](https://keepachangelog.com/)
Versioning: [SemVer](https://semver.org/)

## [Unreleased]

## [1.0.0] - 2026-10-19

### Added

- Complete DDD 5-layer architecture (610 files)
- Domain layer: 45 VOs, 13 entities, 37 events, 9 services, 6 specs
- Application layer: 31 commands, 21 queries, 11 services, 7 sagas
- Infrastructure layer: Prisma + InMemory repos, 7 queues, 8 workers
- Interfaces layer: 11 REST controllers, 3 GraphQL resolvers
- Modules layer: 14 feature modules + common + health
- Dual persistence mode (DB_MODE=memory|prisma)
- InMemory repositories for Termux dev (12 implementations)
- Full test suite: 1922 unit + 173 e2e (100% pass)
- Coverage: 86.74% statements
- Postman collection: 49 requests, 3 environments
- All generators: e2e, inmemory, postman

### Security

- JWT bearer authentication
- Rate limiting
- Idempotency keys for mutations
- Domain invariants enforced
- Input validation via class-validator + Zod

## Version History

| Version | Date | Highlights |
|---------|------|-----------|
| 1.0.0 | 2026-10-19 | Initial production release |
