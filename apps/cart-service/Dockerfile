# ═══════════════════════════════════════════════════════════════
# Cart Service — Production Dockerfile (Debian-based, Prisma-safe)
# ═══════════════════════════════════════════════════════════════
# Why Debian instead of Alpine?
#   Prisma Client native engine is compiled for glibc.
#   Alpine uses musl libc → binary incompatibility.
#   Debian slim is glibc → works perfectly.
# ═══════════════════════════════════════════════════════════════

# ─── Stage 1: Dependencies ───
FROM node:22-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/cart-service/package.json ./apps/cart-service/
COPY packages/shared-kernel/package.json ./packages/shared-kernel/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/shared-constants/package.json ./packages/shared-constants/
COPY packages/shared-utils/package.json ./packages/shared-utils/
COPY packages/shared-config/package.json ./packages/shared-config/
COPY packages/shared-schemas/package.json ./packages/shared-schemas/
COPY packages/shared-api/package.json ./packages/shared-api/
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
 && pnpm --filter @vubon/cart-service build

# ─── Stage 3: Runtime ───
FROM node:22-slim AS runtime
WORKDIR /app

# Install wget + tini (Debian packages)
RUN apt-get update && \
    apt-get install -y --no-install-recommends wget tini && \
    rm -rf /var/lib/apt/lists/* && \
    corepack enable

# Non-root user
RUN groupadd -r app && useradd -r -g app -d /app -s /sbin/nologin app

# Copy artifacts
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/packages ./packages
COPY --from=builder --chown=app:app /app/apps/cart-service/package.json ./apps/cart-service/
COPY --from=builder --chown=app:app /app/apps/cart-service/dist ./apps/cart-service/dist
COPY --from=builder --chown=app:app /app/apps/cart-service/prisma ./apps/cart-service/prisma

USER app
WORKDIR /app/apps/cart-service

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --spider -q http://localhost:3003/health || exit 1

EXPOSE 3003

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "dist/main.js"]
