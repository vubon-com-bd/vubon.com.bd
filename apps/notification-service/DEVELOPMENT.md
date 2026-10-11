<!-- See docs/guides/LOCAL-DEVELOPMENT.md for the full guide. -->

# Notification Service — Development

## Prerequisites

- Node 22+
- pnpm 9+
- PostgreSQL 15+
- Redis 6+

## Setup

    cd ~/vubon.com.bd
    pnpm install

    # Build shared packages
    pnpm --filter @vubon/shared-kernel build
    pnpm --filter @vubon/shared-config build
    pnpm --filter @vubon/shared-constants build
    pnpm --filter @vubon/shared-types build

    # Generate Prisma client
    cd packages/shared-kernel && pnpm prisma:generate && cd ../..

    # Configure env
    cp apps/notification-service/.env.example apps/notification-service/.env.local
    # Edit .env.local

    # Start
    cd apps/notification-service
    pnpm start:dev

Service on http://localhost:4007. Swagger at /api/v1/docs.

Full guide: [docs/guides/LOCAL-DEVELOPMENT.md](docs/guides/LOCAL-DEVELOPMENT.md)
