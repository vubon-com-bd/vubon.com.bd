# ═══════════════════════════════════════════════════════════════
#  Vendor Service — Multi-stage Dockerfile
# ═══════════════════════════════════════════════════════════════

# ─── Stage 1: Dependencies ───
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/vendor-service/package.json ./apps/vendor-service/
COPY packages/shared-constants/package.json ./packages/shared-constants/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/shared-utils/package.json ./packages/shared-utils/
COPY packages/shared-schemas/package.json ./packages/shared-schemas/
COPY packages/shared-config/package.json ./packages/shared-config/
COPY packages/shared-kernel/package.json ./packages/shared-kernel/
COPY packages/shared-api/package.json ./packages/shared-api/
RUN pnpm install --frozen-lockfile

# ─── Stage 2: Builder ───
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/vendor-service/node_modules ./apps/vendor-service/node_modules 2>/dev/null || true
COPY . .
RUN pnpm --filter @vubon/shared-constants build
RUN pnpm --filter @vubon/shared-types build
RUN pnpm --filter @vubon/shared-utils build
RUN pnpm --filter @vubon/shared-schemas build
RUN pnpm --filter @vubon/shared-config build
RUN pnpm --filter @vubon/shared-kernel build
RUN pnpm --filter @vubon/shared-api build
RUN pnpm --filter @vubon/vendor-service build

# ─── Stage 3: Runtime ───
FROM node:22-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache wget && corepack enable && corepack prepare pnpm@9.15.9 --activate
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/vendor-service/package.json ./apps/vendor-service/
COPY --from=builder /app/apps/vendor-service/dist ./apps/vendor-service/dist
COPY --from=builder /app/apps/vendor-service/prisma ./apps/vendor-service/prisma
WORKDIR /app/apps/vendor-service
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --spider http://localhost:3004/health || exit 1
EXPOSE 3004
CMD ["node", "dist/main.js"]
