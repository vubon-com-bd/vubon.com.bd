<!-- See docs/guides/DEPLOYMENT.md for the full guide. -->

# Notification Service — Deployment

## Quick reference

- Dockerfile:      `apps/notification-service/Dockerfile`
- Start command:   `node apps/notification-service/dist/main.js`
- Health check:    `/api/v1/health/live`
- Port:            4007
- Railway config:  `railway.toml`
- Nixpacks config: `nixpacks.toml`

## Environments

- Development:   `http://localhost:4007`
- Production:    `https://notify.vubon.com.bd`

## Required env vars

Copy `.env.production.example` and inject secrets from your secret manager.
Minimum: DATABASE_URL, REDIS_URL, JWT_SECRET + one provider per enabled channel.

## Deploy steps

    pnpm install --frozen-lockfile
    pnpm --filter @vubon/notification-service build
    pnpm --filter @vubon/shared-kernel prisma:migrate:deploy
    node apps/notification-service/dist/main.js

Full guide: [docs/guides/DEPLOYMENT.md](docs/guides/DEPLOYMENT.md)
