# ═══════════════════════════════════════════════════════════════
# Payment Service — Production Dockerfile (Debian, Prisma-safe)
# ═══════════════════════════════════════════════════════════════

# ─── Stage 1: Dependencies ───
FROM node:22-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/payment-service/package.json ./apps/payment-service/
COPY packages/shared-constants/package.json ./packages/shared-constants/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/shared-utils/package.json ./packages/shared-utils/
COPY packages/shared-config/package.json ./packages/shared-config/
COPY packages/shared-schemas/package.json ./packages/shared-schemas/
COPY packages/shared-api/package.json ./packages/shared-api/
COPY packages/shared-kernel/package.json ./packages/shared-kernel/
RUN pnpm install --frozen-lockfile

# ─── Stage 2: Builder ───
FROM node:22-slim AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps ./apps
COPY . .
RUN pnpm --filter @vubon/shared-constants build \
 && pnpm --filter @vubon/shared-types build \
 && pnpm --filter @vubon/shared-utils build \
 && pnpm --filter @vubon/shared-config build \
 && pnpm --filter @vubon/shared-schemas build \
 && pnpm --filter @vubon/shared-api build \
 && pnpm --filter @vubon/shared-kernel build \
 && pnpm --filter @vubon/payment-service build

# ─── Stage 3: Runtime ───
FROM node:22-slim AS runtime
WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends wget tini && \
    rm -rf /var/lib/apt/lists/* && \
    corepack enable

RUN groupadd -r app && useradd -r -g app -d /app -s /sbin/nologin app

COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/packages ./packages
COPY --from=builder --chown=app:app /app/apps/payment-service/package.json ./apps/payment-service/
COPY --from=builder --chown=app:app /app/apps/payment-service/dist ./apps/payment-service/dist

USER app
WORKDIR /app/apps/payment-service

ENV NODE_ENV=production
ENV PORT=3006
ENV PERSISTENCE_DRIVER=prisma
ENV PRISMA_SKIP_ENGINE_BOOTSTRAP=false

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --spider -q http://localhost:3006/api/health || exit 1

EXPOSE 3006

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "dist/main.js"]
