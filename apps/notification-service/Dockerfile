# ═══════════════════════════════════════════════════════════════
# Notification Service — Production Dockerfile (multi-stage)
# ═══════════════════════════════════════════════════════════════

FROM node:22-alpine AS base
RUN corepack enable pnpm
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/notification-service/package.json apps/notification-service/
COPY packages ./packages
RUN pnpm install --frozen-lockfile --filter @vubon/notification-service...

FROM deps AS build
COPY . .
RUN pnpm --filter @vubon/notification-service build

FROM node:22-alpine AS runtime
RUN corepack enable pnpm && addgroup -S app && adduser -S app -G app
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build --chown=app:app /app/apps/notification-service/dist ./dist
COPY --from=build --chown=app:app /app/apps/notification-service/package.json ./
COPY --from=build --chown=app:app /app/node_modules ./node_modules

USER app
EXPOSE 4007

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:4007/api/v1/health/live || exit 1

CMD ["node", "dist/main.js"]
