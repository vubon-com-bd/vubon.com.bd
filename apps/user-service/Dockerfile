# ═══════════════════════════════════════════════════════════════
# user-service — Production Dockerfile
# ═══════════════════════════════════════════════════════════════
# Multi-stage build for pnpm monorepo.
# Build context must be repository root.
#
#   docker build -f apps/user-service/Dockerfile .
#
# ═══════════════════════════════════════════════════════════════

# ─── Stage 1: Builder ─────────────────────────────────────────
FROM node:22-bookworm-slim AS builder

# Build tools for Prisma native engine
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        openssl \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

# ─── 1. Copy workspace manifests ──────────────────────────────
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/user-service/package.json ./apps/user-service/
COPY packages/shared-kernel/package.json ./packages/shared-kernel/
COPY packages/shared-constants/package.json ./packages/shared-constants/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/shared-schemas/package.json ./packages/shared-schemas/
COPY packages/shared-utils/package.json ./packages/shared-utils/
COPY packages/shared-config/package.json ./packages/shared-config/
COPY packages/shared-api/package.json ./packages/shared-api/
COPY packages/shared-auth/package.json ./packages/shared-auth/
COPY packages/shared-hooks/package.json ./packages/shared-hooks/
COPY packages/shared-ui/package.json ./packages/shared-ui/

# ─── 2. Install all deps (with cache) ─────────────────────────
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ─── 3. Copy source ───────────────────────────────────────────
COPY apps/user-service ./apps/user-service
COPY packages/shared-kernel ./packages/shared-kernel
COPY packages/shared-constants ./packages/shared-constants
COPY packages/shared-types ./packages/shared-types
COPY packages/shared-schemas ./packages/shared-schemas
COPY packages/shared-utils ./packages/shared-utils
COPY packages/shared-config ./packages/shared-config
COPY packages/shared-api ./packages/shared-api
COPY packages/shared-auth ./packages/shared-auth

# ─── 4. Build shared packages (dependency order) ─────────────
RUN cd packages/shared-constants && pnpm build || true
RUN cd packages/shared-types     && pnpm build || true
RUN cd packages/shared-schemas   && pnpm build || true
RUN cd packages/shared-utils     && pnpm build || true
RUN cd packages/shared-config    && pnpm build || true
RUN cd packages/shared-kernel    && pnpm build || true
RUN cd packages/shared-api       && pnpm build || true
RUN cd packages/shared-auth      && pnpm build || true

# ─── 5. Generate Prisma client ────────────────────────────────
RUN cd apps/user-service && pnpm prisma generate

# ─── 6. Build user-service ────────────────────────────────────
RUN cd apps/user-service && pnpm build


# ─── Stage 2: Runtime ─────────────────────────────────────────
FROM node:22-bookworm-slim AS runtime

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        openssl \
        ca-certificates \
        curl \
        dumb-init \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=460"

# ─── Copy built workspace from builder ────────────────────────
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/user-service ./apps/user-service

# ─── Copy entrypoint ──────────────────────────────────────────
COPY apps/user-service/scripts/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

WORKDIR /app/apps/user-service

EXPOSE 4001

ENTRYPOINT ["dumb-init", "--", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]
