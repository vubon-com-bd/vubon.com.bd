# 🚀 Vubon.com.bd

A production-grade e-commerce platform built with **DDD (Domain-Driven Design)**, **CQRS**, and **Hexagonal Architecture** on top of NestJS, Prisma, and PostgreSQL.

---

## 📦 Repository Structure

This is a **pnpm monorepo** containing multiple microservices and shared packages.

    vubon.com.bd/
    ├── apps/                          # Microservices
    │   ├── auth-service/              # Authentication
    │   └── user-service/              # User identity, profile, KYC
    │
    ├── packages/                      # Shared libraries
    │   ├── shared-kernel/             # DDD base classes
    │   ├── shared-constants/          # Global constants
    │   ├── shared-types/              # TypeScript types
    │   ├── shared-schemas/            # Zod schemas
    │   ├── shared-utils/              # Utilities
    │   ├── shared-config/             # Configuration
    │   └── shared-api/                # HTTP client layer
    │
    ├── pnpm-workspace.yaml
    ├── package.json
    └── README.md

---

## 🏛️ Architecture — 5 Layers

Every microservice follows this layered architecture:

    ┌─────────────────────────────────────────┐
    │  Layer 5: MODULES       (NestJS wiring) │
    ├─────────────────────────────────────────┤
    │  Layer 4: INTERFACES    (HTTP/GraphQL)  │
    ├─────────────────────────────────────────┤
    │  Layer 3: INFRASTRUCTURE (DB, Cache)    │
    ├─────────────────────────────────────────┤
    │  Layer 2: APPLICATION   (CQRS use cases)│
    ├─────────────────────────────────────────┤
    │  Layer 1: DOMAIN        (Business rules)│
    └─────────────────────────────────────────┘

See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

---

## 🧩 Services

### user-service — User Identity & Profile

**Handles:**
- User CRUD + lifecycle (activate, suspend, delete)
- Profile (avatar, bio, visibility)
- Settings & preferences
- Addresses (Bangladesh-specific validation)
- Contacts (email, phone, social)
- KYC (documents, verification)
- Activity tracking
- Public profile

**Tech stack:** NestJS 10, Prisma 5, PostgreSQL, Redis, BullMQ, CQRS, Zod

**Test coverage:** 87.82% statements | 932 tests passing

---

## 🛠️ Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 22.0.0 |
| pnpm | >= 9.0.0 |
| PostgreSQL | >= 14 |
| Redis | >= 7 |

---

## 🚀 Quick Start

### 1. Clone & Install

    git clone https://github.com/vubon-com-bd/vubon.com.bd.git
    cd vubon.com.bd
    pnpm install

### 2. Environment Setup

    cp .env.example .env
    # Edit .env with your credentials

### 3. Database Setup

    cd apps/user-service
    pnpm prisma generate
    pnpm prisma migrate dev
    cd ../..

### 4. Run Development Server

    cd apps/user-service
    pnpm start:dev

Server: http://localhost:4001/api/v1
Swagger: http://localhost:4001/api/v1/docs

---

## 🧪 Testing

    cd apps/user-service
    pnpm test          # unit tests
    pnpm test:cov      # coverage
    pnpm test:e2e      # E2E tests
    pnpm type-check    # TypeScript check

See [TESTING.md](./TESTING.md).

---

## 🚂 Deployment on Railway

The service is deployed via Railway using Docker.

### One-click deploy steps:

1. Push code to GitHub `main` branch.
2. Connect repository to Railway.
3. Add environment variables (see `.env.production.example`).
4. Add PostgreSQL plugin.
5. Add Redis plugin.
6. Railway auto-deploys on push.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full walkthrough.

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 5-layer architecture + design decisions |
| [TESTING.md](./TESTING.md) | Test strategy + coverage |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Railway deployment guide |
| [apps/user-service/README.md](./apps/user-service/README.md) | User service API docs |

---

## 📄 License

MIT © Vubon Team
