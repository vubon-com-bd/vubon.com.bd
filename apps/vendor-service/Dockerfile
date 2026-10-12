FROM node:22-alpine AS base
RUN corepack enable pnpm
WORKDIR /app

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/vendor-service/package.json apps/vendor-service/
COPY packages ./packages
RUN pnpm install --frozen-lockfile --filter @vubon/vendor-service...

FROM deps AS build
COPY . .
RUN pnpm --filter @vubon/vendor-service build

FROM node:22-alpine AS runtime
RUN corepack enable pnpm && addgroup -S app && adduser -S app -G app
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build --chown=app:app /app/apps/vendor-service/dist ./dist
COPY --from=build --chown=app:app /app/apps/vendor-service/package.json ./
COPY --from=build --chown=app:app /app/node_modules ./node_modules

USER app
EXPOSE 4006
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:4006/api/v1/health || exit 1

CMD ["node", "dist/main.js"]
