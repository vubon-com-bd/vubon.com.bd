# ═══════════════════════════════════════════════════════════════
# Payment Service — Production Dockerfile (multi-stage)
# ═══════════════════════════════════════════════════════════════

FROM node:22-alpine AS base
RUN corepack enable pnpm
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/payment-service/package.json apps/payment-service/
COPY packages ./packages
RUN pnpm install --frozen-lockfile --filter @vubon/payment-service...

FROM deps AS build
COPY . .
RUN pnpm --filter @vubon/payment-service build

FROM node:22-alpine AS runtime
RUN corepack enable pnpm && addgroup -S app && adduser -S app -G app
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build --chown=app:app /app/apps/payment-service/dist ./dist
COPY --from=build --chown=app:app /app/apps/payment-service/package.json ./
COPY --from=build --chown=app:app /app/node_modules ./node_modules

USER app
EXPOSE 4005
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:4005/api/v1/health || exit 1

CMD ["node", "dist/main.js"]
