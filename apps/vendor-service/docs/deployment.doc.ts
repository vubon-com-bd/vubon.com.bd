/**
 * Deployment Guide
 *
 * ## Build
 *
 *     cd ~/vubon.com.bd
 *     pnpm --filter @vubon/vendor-service build
 *
 * Output: `apps/vendor-service/dist/`.
 *
 * ## Prerequisites for Deployment
 *
 * 1. All shared packages built (`shared-kernel`, `shared-constants`, `shared-types`, `shared-schemas`, `shared-utils`, `shared-config`).
 * 2. Prisma client generated for the target schema.
 * 3. Environment variables set (see below).
 * 4. Database migrated (see Migrations).
 * 5. Redis instance reachable.
 *
 * ## Environment Variables
 *
 * | Variable | Required | Example |
 * |----------|----------|---------|
 * | `NODE_ENV` | ✅ | `production` |
 * | `PORT` | ✅ | `4006` |
 * | `LOG_LEVEL` | ✅ | `info` |
 * | `DATABASE_URL` | ✅ | `postgresql://user:pass@host:5432/db?schema=public` |
 * | `REDIS_URL` | ✅ | `redis://host:6379` |
 * | `REDIS_DB` | — | `0` |
 * | `JWT_SECRET` | ✅ | min 32 chars |
 * | `JWT_EXPIRES_IN` | — | `1h` |
 * | `STORAGE_BASE_URL` | — | `https://storage.vubon.local` |
 *
 * `.env` files are loaded from (in order):
 * 1. `<monorepo-root>/.env` — shared values
 * 2. `apps/vendor-service/.env` — service-specific overrides
 *
 * ## Migrations
 *
 * Prisma schema is shared across all services:
 *
 *     packages/shared-kernel/prisma/schema.prisma
 *
 * Generate migration (dev only):
 *
 *     cd packages/shared-kernel
 *     npx prisma migrate dev --name <description>
 *
 * Apply to production (no dev schema drift):
 *
 *     cd packages/shared-kernel
 *     npx prisma migrate deploy
 *
 * Regenerate client after schema changes:
 *
 *     cd packages/shared-kernel
 *     npx prisma generate --schema=prisma/schema.prisma
 *
 * ## Start
 *
 * Dev:
 *
 *     pnpm --filter @vubon/vendor-service start:dev
 *
 * Prod (compiled):
 *
 *     pnpm --filter @vubon/vendor-service start:prod
 *
 *     # OR direct
 *     cd apps/vendor-service
 *     node dist/main.js
 *
 * Service listens on `PORT` (default 4006) at path `/api/v1`.
 *
 * ## Health Probes
 *
 * - **Liveness:**  `GET /api/v1/health/live`  → 200 if process is up
 * - **Readiness:** `GET /api/v1/health/ready` → 200 if DB reachable
 * - **Full:**      `GET /api/v1/health`       → 200 with `{status, checks}`
 *
 * Suggested Kubernetes config:
 *
 *     livenessProbe:
 *       httpGet: { path: /api/v1/health/live, port: 4006 }
 *       initialDelaySeconds: 10
 *       periodSeconds: 30
 *     readinessProbe:
 *       httpGet: { path: /api/v1/health/ready, port: 4006 }
 *       initialDelaySeconds: 5
 *       periodSeconds: 10
 *
 * ## Graceful Shutdown
 *
 * `app.enableShutdownHooks()` is called on bootstrap. On `SIGTERM` / `SIGINT`:
 *
 * 1. Stop accepting new requests.
 * 2. Finish in-flight requests.
 * 3. Close Prisma connections.
 * 4. Close Redis connections.
 * 5. Close BullMQ workers.
 *
 * Set container `terminationGracePeriodSeconds` ≥ 30s.
 *
 * ## Dockerfile (reference)
 *
 *     FROM node:22-alpine AS base
 *     WORKDIR /repo
 *
 *     # install pnpm
 *     RUN corepack enable && corepack prepare pnpm@9 --activate
 *
 *     # copy workspace manifests
 *     COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
 *     COPY packages/shared-kernel/package.json packages/shared-kernel/
 *     COPY packages/shared-constants/package.json packages/shared-constants/
 *     COPY packages/shared-types/package.json packages/shared-types/
 *     COPY packages/shared-schemas/package.json packages/shared-schemas/
 *     COPY packages/shared-utils/package.json packages/shared-utils/
 *     COPY packages/shared-config/package.json packages/shared-config/
 *     COPY apps/vendor-service/package.json apps/vendor-service/
 *
 *     RUN pnpm install --frozen-lockfile
 *
 *     COPY . .
 *
 *     RUN pnpm --filter @vubon/shared-kernel build \
 *      && pnpm --filter @vubon/shared-constants build \
 *      && pnpm --filter @vubon/shared-types build \
 *      && pnpm --filter @vubon/shared-schemas build \
 *      && pnpm --filter @vubon/shared-utils build \
 *      && pnpm --filter @vubon/shared-config build \
 *      && cd packages/shared-kernel \
 *      && npx prisma generate --schema=prisma/schema.prisma \
 *      && cd ../.. \
 *      && pnpm --filter @vubon/vendor-service build
 *
 *     EXPOSE 4006
 *     CMD ["node", "apps/vendor-service/dist/main.js"]
 *
 * ## Docker Compose (reference)
 *
 *     version: '3.9'
 *     services:
 *       vendor-service:
 *         build: .
 *         ports: ['4006:4006']
 *         environment:
 *           NODE_ENV: production
 *           PORT: 4006
 *           DATABASE_URL: ${DATABASE_URL}
 *           REDIS_URL: redis://redis:6379
 *           JWT_SECRET: ${JWT_SECRET}
 *         depends_on: [redis]
 *       redis:
 *         image: redis:7-alpine
 *         ports: ['6379:6379']
 *
 * ## CI/CD
 *
 * GitHub Actions workflow (`.github/workflows/vendor-service-ci.yml`):
 *
 * 1. `pnpm install --frozen-lockfile`
 * 2. Build shared packages
 * 3. `pnpm type-check`
 * 4. `pnpm lint`
 * 5. `pnpm test:ci` — unit tests with `test-results.json`
 * 6. `pnpm test:e2e:ci` — e2e with `e2e-results.json`
 * 7. Upload coverage artifact
 * 8. On tag: build Docker image → push to registry → deploy
 *
 * ## Rollback
 *
 * 1. `kubectl rollout undo deploy/vendor-service` (or `docker service update --rollback`)
 * 2. Revert Prisma migration via rollback script in `packages/shared-kernel/prisma/migrations`.
 * 3. Verify health probes.
 *
 * ## Observability
 *
 * - **Logs:** JSON to stdout via shared-kernel `LoggerService`.
 * - **Metrics:** counters/histograms via `MetricsService`.
 * - **Traces:** OpenTelemetry — `TracerService`.
 * - **Correlation ID:** propagated via `CorrelationIdInterceptor`.
 */

export {};
