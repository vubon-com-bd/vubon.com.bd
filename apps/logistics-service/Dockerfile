# ═══════════════════════════════════════════════════════════════
# Product Service — Dockerfile
# Multi-stage build for minimal production image
# ═══════════════════════════════════════════════════════════════

# ─── Stage 1: Dependencies ───
FROM node:22-alpine AS deps

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/product-service/package.json ./apps/product-service/
COPY packages/shared-kernel/package.json ./packages/shared-kernel/
COPY packages/shared-constants/package.json ./packages/shared-constants/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/shared-schemas/package.json ./packages/shared-schemas/
COPY packages/shared-config/package.json ./packages/shared-config/
COPY packages/shared-utils/package.json ./packages/shared-utils/

RUN pnpm install --frozen-lockfile

# ─── Stage 2: Builder ───
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/product-service/node_modules ./apps/product-service/node_modules 2>/dev/null || true

COPY . .

# Build shared-kernel first
RUN pnpm --filter @vubon/shared-kernel build

# Build product-service
RUN pnpm --filter @vubon/product-service build

# ─── Stage 3: Runtime ───
FROM node:22-alpine AS runtime

WORKDIR /app

RUN apk add --no-cache wget && \
    corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy production deps + built artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/product-service/package.json ./apps/product-service/
COPY --from=builder /app/apps/product-service/dist ./apps/product-service/dist
COPY --from=builder /app/apps/product-service/prisma ./apps/product-service/prisma

WORKDIR /app/apps/product-service

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3002/health || exit 1

EXPOSE 3002

CMD ["node", "dist/main.js"]
