# 👤 user-service

User Identity, Profile, KYC, and Activity Microservice for **Vubon.com.bd**.

Part of the `@vubon/user-service` workspace package.

---

## 🎯 Responsibilities

| Domain | Owns |
|--------|------|
| **Identity** | User record, lifecycle (active/suspended/deleted) |
| **Profile** | Avatar, bio, visibility, completion |
| **Settings** | Theme, language, timezone, currency, 2FA |
| **Preferences** | Newsletter, promotions, notifications |
| **Address** | Bangladesh-specific address validation |
| **Contact** | Email, phone, whatsapp, telegram, social |
| **KYC** | Documents, submission, verification |
| **Activity** | Login, logout, and user events |
| **Public Profile** | Anonymous-access profile view |

**Does NOT own:** credentials, password hash, sessions, tokens, MFA secrets (owned by `auth-service`).

---

## 🏛️ 5-Layer Architecture

    ┌─────────────────────────────────────────┐
    │ Layer 5: MODULES       (NestJS wiring)  │
    ├─────────────────────────────────────────┤
    │ Layer 4: INTERFACES    (HTTP + Swagger) │
    ├─────────────────────────────────────────┤
    │ Layer 3: INFRASTRUCTURE (Prisma, Redis) │
    ├─────────────────────────────────────────┤
    │ Layer 2: APPLICATION   (CQRS handlers)  │
    ├─────────────────────────────────────────┤
    │ Layer 1: DOMAIN        (Business rules) │
    └─────────────────────────────────────────┘

---

## 📁 Folder Structure

    apps/user-service/
    ├── prisma/                        # Prisma schema + migrations
    │   └── schema.prisma
    ├── src/
    │   ├── main.ts                    # Bootstrap entrypoint
    │   └── module/
    │       ├── domain/                # Layer 1 — pure business logic
    │       ├── application/           # Layer 2 — CQRS use cases
    │       ├── infrastructure/        # Layer 3 — adapters
    │       ├── interfaces/            # Layer 4 — HTTP transport
    │       └── modules/               # Layer 5 — NestJS wiring
    ├── test/
    │   ├── unit/                      # 190 unit test files
    │   ├── e2e/                       # 1 E2E test
    │   └── helpers/                   # Mock helpers
    ├── Dockerfile
    ├── .dockerignore
    ├── railway.toml
    ├── package.json
    └── README.md

---

## 🚀 Local Setup

### 1. Install dependencies (from monorepo root)

    cd ~/vubon.com.bd
    pnpm install

### 2. Configure environment

    cp apps/user-service/.env.example apps/user-service/.env
    # Edit apps/user-service/.env

### 3. Generate Prisma client

    cd apps/user-service
    pnpm prisma generate

### 4. Run migrations

    pnpm prisma migrate dev

### 5. Start server

    pnpm start:dev

Server runs at: **http://localhost:4001/api/v1**
Swagger UI: **http://localhost:4001/api/v1/docs**

---

## 🔌 REST Endpoints

Base path: `/api/v1`

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/users` | List users (paginated) |
| `GET` | `/users/:id` | Get user by ID |
| `GET` | `/users/me` | Get current user |
| `GET` | `/users/search/:term` | Search users |
| `POST` | `/users` | Create user |
| `PUT` | `/users/:id` | Update user |
| `DELETE` | `/users/:id` | Delete user |
| `POST` | `/users/:id/activate` | Activate |
| `POST` | `/users/:id/suspend` | Suspend |
| `GET` | `/users/:userId/profile` | Get profile |
| `PUT` | `/users/:userId/profile` | Update profile |
| `PUT` | `/users/:userId/profile/avatar` | Update avatar |
| `PUT` | `/users/:userId/profile/bio` | Update bio |
| `PUT` | `/users/:userId/profile/visibility` | Update visibility |
| `GET` | `/users/:userId/settings` | Get settings |
| `PUT` | `/users/:userId/settings` | Update settings |
| `POST` | `/users/:userId/settings/reset` | Reset settings |
| `GET` | `/users/:userId/preferences` | Get preferences |
| `PUT` | `/users/:userId/preferences` | Update preferences |
| `POST` | `/users/:userId/preferences/reset` | Reset preferences |
| `GET` | `/users/:userId/addresses` | List addresses |
| `GET` | `/users/:userId/addresses/:addressId` | Get address |
| `POST` | `/users/:userId/addresses` | Add address |
| `PUT` | `/users/:userId/addresses/:addressId` | Update address |
| `DELETE` | `/users/:userId/addresses/:addressId` | Delete address |
| `POST` | `/users/:userId/addresses/:addressId/default` | Set default |
| `GET` | `/users/:userId/contacts` | List contacts |
| `GET` | `/users/:userId/contacts/:contactId` | Get contact |
| `POST` | `/users/:userId/contacts` | Add contact |
| `PUT` | `/users/:userId/contacts/:contactId` | Update contact |
| `DELETE` | `/users/:userId/contacts/:contactId` | Delete contact |
| `POST` | `/users/:userId/contacts/:contactId/verify` | Verify contact |
| `GET` | `/users/:userId/kyc/status` | Get KYC status |
| `GET` | `/users/:userId/kyc/documents` | List KYC documents |
| `POST` | `/users/:userId/kyc/submit` | Submit KYC |
| `POST` | `/users/:userId/kyc/:kycId/verify` | Verify KYC (admin) |
| `POST` | `/users/:userId/kyc/:kycId/reject` | Reject KYC (admin) |
| `GET` | `/users/:userId/activities` | List activities |
| `GET` | `/users/:userId/activities/stats` | User activity stats |
| `GET` | `/public/users/:id` | Public user info |
| `GET` | `/public/users/:id/profile` | Public profile |

Full OpenAPI spec: `http://localhost:4001/api/v1/docs-json`

---

## 🧪 Testing

    pnpm test           # all unit tests (925)
    pnpm test:cov       # coverage report
    pnpm test:e2e       # E2E tests (7)
    pnpm type-check     # TypeScript check

Current status:
- **190** unit test files
- **932** total tests passing
- **87.82%** statement coverage

---

## 🚂 Railway Deployment

Deployed as a **Docker container** on Railway. See [DEPLOYMENT.md](./DEPLOYMENT.md).

Key settings:
- **Root:** repository root (monorepo)
- **Dockerfile:** `apps/user-service/Dockerfile`
- **Start command:** `node dist/main.js`
- **Health check:** `/api/v1/docs-json`

Required environment variables — see `.env.production.example`.

---

## 📄 License

MIT © Vubon Team
