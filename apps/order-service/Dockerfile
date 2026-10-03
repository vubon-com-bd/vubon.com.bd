# ═══════════════════════════════════════════════════════════════
# Order Service — Production Dockerfile (multi-stage)
# ═══════════════════════════════════════════════════════════════

FROM node:22-alpine AS base
RUN corepack enable pnpm
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/order-service/package.json apps/order-service/
COPY packages ./packages
RUN pnpm install --frozen-lockfile --filter @vubon/order-service...

FROM deps AS build
COPY . .
RUN pnpm --filter @vubon/order-service build

FROM node:22-alpine AS runtime
RUN corepack enable pnpm && addgroup -S app && adduser -S app -G app
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build --chown=app:app /app/apps/order-service/dist ./dist
COPY --from=build --chown=app:app /app/apps/order-service/package.json ./
COPY --from=build --chown=app:app /app/node_modules ./node_modules

USER app
EXPOSE 4004
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:4004/api/v1/health || exit 1

CMD ["node", "dist/main.js"]
