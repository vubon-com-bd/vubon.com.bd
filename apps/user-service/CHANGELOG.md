# Changelog

All notable changes to `@vubon/user-service`.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Dockerfile for Railway deployment
- railway.toml + nixpacks.toml for deployment config
- docker-entrypoint.sh (Prisma migrate + start)
- GitHub Actions CI workflow
- Production env template
- Full documentation (README, ARCHITECTURE, TESTING, DEPLOYMENT)

---

## [1.0.0] — 2026-09-27

### Added
- **Domain Layer** (104 files)
  - 33 primitive Value Objects + 9 composite VOs
  - 8 aggregate entities
  - 8 repository interfaces
  - 8 event files + 4 event stores
  - 8 domain services
  - 6 specifications
  - 8 error modules

- **Application Layer** (203 files)
  - 34 request DTOs + 10 response DTOs
  - 27 command handlers
  - 17 query handlers
  - 8 application services
  - 3 sagas + 5 saga commands
  - 6 mappers
  - 5 validators
  - 8 error modules

- **Infrastructure Layer** (~70 files)
  - 8 Prisma repositories + PrismaService
  - 4 Redis cache repositories
  - Email/SMS/Push/Storage integrations
  - 5 internal services
  - 6 background workers
  - 5 queue definitions
  - 8 service configs
  - In-memory repository fallback for Termux

- **Interfaces Layer** (~61 files)
  - 9 REST controllers + Swagger
  - 3 guards
  - 2 cache interceptors
  - 3 decorators
  - Request/Response DTOs
  - 5 controller mappers
  - 3 validators

- **Modules Layer** (~40 files)
  - AppModule + CommonModule
  - 9 feature modules
  - Health checks

### Tests
- 190 unit test files
- 1 E2E test file
- 932 tests passing
- 87.82% statement coverage

### Deployment
- Railway-ready
- Prisma migrations on boot
- Health check endpoint
