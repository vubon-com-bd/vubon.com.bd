# ═══════════════════════════════════════════════════════════════
# Identity Service — Dockerfile
# Multi-stage build for minimal production image
# ═══════════════════════════════════════════════════════════════

# ─── Stage 1: Dependencies ───
FROM node:22-alpine AS deps

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/identity-service/package.json ./apps/identity-service/
COPY packages/shared-kernel/package.json ./packages/shared-kernel/
COPY packages/shared-constants/package.json ./packages/shared-constants/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/shared-schemas/package.json ./packages/shared-schemas/
COPY packages/shared-config/package.json ./packages/shared-config/
COPY packages/shared-utils/package.json ./packages/shared-utils/
COPY packages/shared-auth/package.json ./packages/shared-auth/

RUN pnpm install --frozen-lockfile

# ─── Stage 2: Builder ───
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

COPY --from=deps /app/node_modules ./node_modules

COPY . .

# Build shared-kernel first (dependency)
RUN pnpm --filter @vubon/shared-kernel build

# Build identity-service
RUN pnpm --filter @vubon/identity-service build

# ─── Stage 3: Runtime ───
FROM node:22-alpine AS runtime

WORKDIR /app

RUN apk add --no-cache wget && \
    corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy production deps + built artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/identity-service/package.json ./apps/identity-service/
COPY --from=builder /app/apps/identity-service/dist ./apps/identity-service/dist
COPY --from=builder /app/apps/identity-service/prisma ./apps/identity-service/prisma

WORKDIR /app/apps/identity-service

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

EXPOSE 3001

CMD ["node", "dist/main.js"]
