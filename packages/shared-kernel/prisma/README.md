# 🗄️ Prisma — Shared Kernel

Central Prisma schema and client for the **vubon.com.bd** monorepo.

Every workspace service uses this single schema so that
`prisma generate` produces **one consistent client** for the whole
repository. This eliminates the multi-schema conflict that occurs when
multiple services maintain their own `schema.prisma`.

---

## 📁 Location

    packages/shared-kernel/
    ├── prisma/
    │   ├── schema.prisma          ← single source of truth
    │   ├── migrations/            ← shared migration history
    │   └── README.md              ← this file
    └── src/
        └── prisma/                ← client + service + module

---

## 🎯 Why One Schema?

In a pnpm monorepo, Prisma generates its client into a single shared
location (`node_modules/.prisma/client`). If two services each ship their
own `schema.prisma`, the last `prisma generate` to run **overwrites** the
client for all other services, causing type mismatch errors.

By centralising the schema here:

- ✅ One client for every service
- ✅ Cross-service relations supported
- ✅ One migration history
- ✅ No conflicting generation
- ✅ New services automatically covered

---

## 📊 Schema Contents

The schema currently covers **identity**, **auth**, **profile**, **KYC**,
and **activity** domains. Additional models (product, order, payment,
logistics, etc.) are added as their services are implemented.

### Model Categories

| Category | Models |
|----------|--------|
| Identity | `User` |
| Profile | `UserProfile` |
| Settings | `UserSettings`, `UserSetting` |
| Preferences | `UserPreferences`, `UserPreference` |
| Address | `UserAddress` |
| Contact | `UserContact` |
| Verification | `UserVerification` |
| KYC | `UserKyc` |
| Activity | `UserActivity` |
| Auth — Session | `AuthSession` |
| Auth — Tokens | `AuthToken` |
| Auth — MFA | `AuthMfa`, `AuthRecoveryCode`, `Auth2Fa` |
| Auth — Lock | `AuthAccountLock` |
| Auth — Login | `AuthLoginAttempt` |
| Auth — Device | `AuthDevice` |
| Auth — Social | `AuthSocial`, `AuthOAuth`, `AuthSso` |
| Auth — Biometric | `AuthBiometric` |
| Auth — RBAC | `AuthPermission`, `AuthRole`, `AuthRolePermission` |
| Auth — Settings | `AuthSettings` |
| Role Links | `UserRole`, `UserPermission` |

---

## 🔧 Common Commands

All commands are run **from `packages/shared-kernel/`**.

### Generate Prisma client

    pnpm prisma:generate

Run this after editing `schema.prisma`. Regenerates the client for the
whole monorepo.

### Format schema

    pnpm prisma:format

### Validate schema

    pnpm prisma:validate

### Create a migration (development)

    pnpm prisma:migrate dev --name add_new_field

This:

1. Diffs the schema against the database.
2. Creates a new migration file under `prisma/migrations/`.
3. Applies the migration to your local database.
4. Regenerates the client.

### Apply pending migrations (production / CI)

    pnpm prisma:migrate:deploy

Runs every migration in `prisma/migrations/` that has not yet been applied
to the target database. This is what Railway runs on service start.

### Open Prisma Studio

    pnpm prisma:studio

---

## 📥 Importing from a Service

Every service imports the client, models, and service from the shared
kernel — never from `@prisma/client` directly.

### PrismaClient

    import { PrismaClient } from '@vubon/shared-kernel/prisma';

### PrismaService (NestJS injectable)

    import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';

### PrismaModule

    import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.module';

### Model types

    import type { User, AuthSession, UserKyc } from '@prisma/client';

    // @prisma/client re-exports every model because the shared schema
    // generated it. Use @prisma/client for model types; use the shared
    // kernel for the service and module.

---

## 🚀 Deployment (Railway)

The Docker entrypoint runs `prisma migrate deploy` before starting the
application. No manual intervention is needed.

Required environment variable:

    DATABASE_URL=postgresql://...

Set it in the Railway dashboard. Prisma reads it automatically.

### Binary Targets

The generator includes targets for local dev and Railway:

    generator client {
      provider      = "prisma-client-js"
      binaryTargets = ["native", "linux-arm64-openssl-3.0.x", "debian-openssl-3.0.x"]
    }

- `native` — developer machines, Termux
- `debian-openssl-3.0.x` — Railway (Debian-based Node image)
- `linux-arm64-openssl-3.0.x` — ARM64 Linux environments

---

## 🛡️ Safety Rules

1. **Never edit an applied migration.**
   Once a migration has been applied to any environment, treat it as
   immutable. Create a new migration instead.

2. **Never run `prisma db push` in production.**
   `db push` skips migration history and can corrupt the schema.

3. **Always review generated SQL before committing.**
   The migration file contains the exact SQL that will run. Read it.

4. **Back up production before destructive migrations.**
   Dropping a column or table should be done in two steps:
   - Step 1: stop using the column.
   - Step 2: drop it in a later release.

5. **Model names are global.**
   Adding a new `model Foo` requires that no other service already
   defines `Foo`. Prefix with domain when needed
   (`AuthSession`, `OrderItem`, `PaymentRefund`).

---

## 🔄 Adding a New Model

1. Edit `packages/shared-kernel/prisma/schema.prisma`.
2. Run `pnpm prisma:format`.
3. Run `pnpm prisma:validate`.
4. Run `pnpm prisma:migrate dev --name <description>`.
5. Regenerate the client for every service:
   - `pnpm prisma:generate`
6. Commit:
   - `schema.prisma`
   - `prisma/migrations/<timestamp>_<name>/`
7. Push — Railway applies the migration on deploy.

No changes are required in individual service `package.json` files.

---

## 🧪 Testing

Repository unit tests use mocked `PrismaService` (see
`test/helpers/prisma-mock.ts` in each service). E2E tests fall back to
in-memory repositories when `USE_IN_MEMORY_REPOS=true` is set, so no real
database is required on CI.

---

## 📄 References

- [SECURITY.md](../../../SECURITY.md)
- Prisma docs — https://www.prisma.io/docs
- Prisma migrations — https://www.prisma.io/docs/concepts/components/prisma-migrate
