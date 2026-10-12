<!-- AUTO-GENERATED from docs/development.doc.ts. Do not edit directly. -->

Development Guide

## Prerequisites

- Node.js ≥ 22
- pnpm ≥ 9
- Termux / Linux / macOS

## Initial Setup

    cd ~/vubon.com.bd
    pnpm install

    # Build shared packages once
    pnpm --filter @vubon/shared-kernel build
    pnpm --filter @vubon/shared-constants build
    pnpm --filter @vubon/shared-types build
    pnpm --filter @vubon/shared-schemas build
    pnpm --filter @vubon/shared-utils build
    pnpm --filter @vubon/shared-config build

    # Generate Prisma client
    cd packages/shared-kernel
    npx prisma generate --schema=prisma/schema.prisma
    cd ../..

## Dev Server

    pnpm --filter @vubon/vendor-service start:dev

Hot reload on file change. Uses `nest start --watch`.

## Type Checking

    pnpm --filter @vubon/vendor-service type-check

Runs `tsc --noEmit`. Should always pass before commit.

## Code Conventions

### Imports

- Always include **`.js` extension** on relative imports (ESM).
- Use **path aliases** for cross-layer: `@domain/...`, `@application/...`, etc.
- Use **shared packages** for external: `@vubon/shared-kernel/...`, `@vubon/shared-constants/...`.

    ✅ import { VendorEntity } from '@domain/entities/vendor.entity.js';
    ✅ import { VendorIdVO }   from '@domain/value-objects/primitives/vendor-id.vo.js';
    ❌ import { VendorEntity } from '../../domain/entities/vendor.entity';

### Files

- One class per file.
- File name in kebab-case with a suffix indicating kind:
  - `*.vo.ts` — value object
  - `*.entity.ts` — entity
  - `*.events.ts` — domain events
  - `*.repository.ts` / `*.repository.interface.ts`
  - `*.service.ts` / `*.service.interface.ts`
  - `*.command.ts` / `*.handler.ts`
  - `*.query.ts` / `*.handler.ts`
  - `*.specification.ts`
  - `*.mapper.ts`
  - `*.controller.ts`
  - `*.module.ts`

### Value Objects

- Extend `BaseVO<T>`, `BaseIdVO`, `BaseNameVO`, `BaseSlugVO`, `BaseStatusVO`, `BaseTypeVO`, `BaseCodeVO`, or `BaseMoneyVO`.
- `private constructor`.
- Static `create(raw)` — validates and normalizes.
- Static `reconstitute(raw)` — trusts input (loaded from DB).

    export class VendorNameVO extends BaseNameVO {
      private constructor(value: string) { super(value); }

      static create(raw: string): VendorNameVO {
        if (typeof raw !== 'string') throw new ValidationError('...', 'name');
        // normalize + validate
        return new VendorNameVO(normalized);
      }

      static reconstitute(raw: string): VendorNameVO {
        return new VendorNameVO(raw);
      }
    }

### Entities

- Extend `BaseEntity<TId>` (supporting) or `AggregateRoot<TId>` (root).
- Immutable public API; state changes via explicit methods.
- Emit domain events via `this.addDomainEvent(...)`.
- `assertInvariants()` in constructor.

### Repositories

- Interface lives in `domain/repositories/*.repository.interface.ts`.
- Export a symbol token: `export const VENDOR_REPOSITORY = Symbol('VENDOR_REPOSITORY');`.
- Impl lives in `infrastructure/persistence/prisma/repositories/*.prisma.repository.ts`.
- Bind via `{ provide: VENDOR_REPOSITORY, useClass: VendorPrismaRepository }` in `PrismaRepositoriesModule`.

### Commands / Queries

- Command class extends `BaseCommand`; declare `readonly type = 'vendor.<action>'`.
- Handler decorated with `@CommandHandler(...)` and implements `ICommandHandler<T, R>`.
- Handlers delegate to an application service — no repository calls directly.

### Controllers

- Extend `BaseController`.
- Annotate with `@ApiTags(...)`, `@ApiBearerAuth(...)`, `@Controller('<path>')`.
- Use `@CurrentUser()` for auth'd user, `@IdempotencyKey()` for idempotency.
- Apply guards: `@UseGuards(JwtAuthGuard, VendorOwnerGuard)`, `@VendorOwner('vendorId')`.
- Never touch repositories — use `CommandBus`/`QueryBus`.

## Adding a New Endpoint

1. Add request/response DTOs under `application/dtos/`.
2. Add VO (if needed) in `domain/value-objects/`.
3. Add entity method or domain service logic.
4. Add repository method (interface + impl).
5. Add command or query + handler.
6. Add service method (`application/services/impl/`).
7. Add HTTP DTO + controller route + mapper.
8. Register the handler in the appropriate feature module.
9. Write tests (unit + e2e).

## Testing Locally

    # All unit tests
    pnpm --filter @vubon/vendor-service test

    # Watch mode
    pnpm --filter @vubon/vendor-service test:watch

    # Coverage
    pnpm --filter @vubon/vendor-service test:cov

    # E2E
    pnpm --filter @vubon/vendor-service test:e2e

## Debugging

- `LOG_LEVEL=debug` enables verbose logging.
- NestJS Swagger docs: `http://localhost:4006/api/v1/docs`.
- Health probe: `curl http://localhost:4006/api/v1/health`.

## Git Workflow

- Feature branches: `feat/vendor-<short-description>`.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`.
- Run `pnpm type-check && pnpm test && pnpm test:e2e` before pushing.
