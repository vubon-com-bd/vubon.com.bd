# Development Guide — Vendor Service

## Prerequisites
Node >= 22, pnpm >= 9.15.9, PostgreSQL 15+, Redis 6+

## Setup
cd ~/vubon.com.bd
pnpm install
pnpm --filter @vubon/shared-kernel build
cd apps/vendor-service
cp .env.example .env

## Database
pg_ctl -D $PREFIX/var/lib/postgresql start
createdb -h localhost -U $(whoami) vubon_vendors

## Redis
redis-server --daemonize yes
redis-cli ping

## Run
pnpm start:dev          Dev
pnpm build              Build
node dist/main.js       Production

## Testing
pnpm test:unit
pnpm test:e2e:custom

## Code Style
- Strict TypeScript
- No any, use unknown
- Logger instead of console.log
- .js extensions on imports
- JSDoc @module tag on every file

## Troubleshooting
Port in use: lsof -i :3004 && kill <pid>
Prisma fails: PRISMA_SKIP_ENGINE_BOOTSTRAP=true in .env
