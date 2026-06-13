# ============================================================
# Multi-stage Docker build for vubon auth-service (Monorepo)
# Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
# ============================================================

# ----------------------------------------
# Stage 1: Builder - Build shared packages & application
# ----------------------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Build arguments (security: don't pass secrets in build time)
ARG NODE_ENV=production
ARG BUILDKIT_INLINE_CACHE=1

# Set environment variables for build
ENV NODE_ENV=${NODE_ENV}
ENV NODE_OPTIONS="--max-old-space-size=512"

# Install build dependencies (for native modules like argon2, bcrypt)
RUN apk add --no-cache python3 make g++

# ============================================================
# 1. Copy package files from all packages (layer caching)
# ============================================================

# Root package files (workspace root)
COPY package*.json ./
COPY package-lock.json ./

# Auth service package
COPY apps/auth-service/package*.json ./apps/auth-service/

# Shared packages (all five)
COPY packages/shared-constants/package*.json ./packages/shared-constants/
COPY packages/shared-types/package*.json ./packages/shared-types/
COPY packages/shared-schemas/package*.json ./packages/shared-schemas/
COPY packages/shared-utils/package*.json ./packages/shared-utils/
COPY packages/shared-config/package*.json ./packages/shared-config/

# ============================================================
# 2. Install dependencies (clean install with workspace support)
# ============================================================
RUN npm ci --workspaces --include-workspace-root --omit=dev

# ============================================================
# 3. Copy source code for shared packages (required for build)
# ============================================================
COPY packages/shared-constants ./packages/shared-constants
COPY packages/shared-types ./packages/shared-types
COPY packages/shared-schemas ./packages/shared-schemas
COPY packages/shared-utils ./packages/shared-utils
COPY packages/shared-config ./packages/shared-config

# ============================================================
# 4. Build shared packages (generate dist files)
# ============================================================
RUN cd packages/shared-constants && npm run build
RUN cd packages/shared-types && npm run build
RUN cd packages/shared-schemas && npm run build
RUN cd packages/shared-utils && npm run build
RUN cd packages/shared-config && npm run build

# ============================================================
# 5. Copy auth service source and Prisma schema
# ============================================================
COPY apps/auth-service ./apps/auth-service

# Generate Prisma client
RUN cd apps/auth-service && npx prisma generate

# ============================================================
# 6. Build auth service application
# ============================================================
RUN cd apps/auth-service && npm run build

# ----------------------------------------
# Stage 2: Production runner
# ----------------------------------------
FROM node:20-alpine AS runner

# Build arguments
ARG PORT=3000
ARG NODE_ENV=production

# Set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV NODE_OPTIONS="--max-old-space-size=512"

# Install dumb-init for proper signal handling (PID 1)
RUN apk add --no-cache dumb-init

# Create non-root user (alpine uses node user by default)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Set working directory
WORKDIR /app

# ============================================================
# 7. Copy built artifacts from builder stage
# ============================================================

# Copy built shared packages (dist folder)
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-constants/dist ./node_modules/@vubon/shared-constants/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-types/dist ./node_modules/@vubon/shared-types/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-schemas/dist ./node_modules/@vubon/shared-schemas/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-utils/dist ./node_modules/@vubon/shared-utils/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-config/dist ./node_modules/@vubon/shared-config/dist

# Copy shared package.json files (for proper module resolution)
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-constants/package.json ./node_modules/@vubon/shared-constants/
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-types/package.json ./node_modules/@vubon/shared-types/
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-schemas/package.json ./node_modules/@vubon/shared-schemas/
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-utils/package.json ./node_modules/@vubon/shared-utils/
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared-config/package.json ./node_modules/@vubon/shared-config/

# Copy main node_modules (excluding dev dependencies)
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy auth service build output
COPY --from=builder --chown=nodejs:nodejs /app/apps/auth-service/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/apps/auth-service/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/apps/auth-service/prisma ./prisma

# Copy additional assets (templates, etc. if any)
COPY --from=builder --chown=nodejs:nodejs /app/apps/auth-service/templates ./templates 2>/dev/null || true

# ============================================================
# 8. Cleanup unnecessary files (reduce image size)
# ============================================================
RUN rm -rf ./node_modules/.cache ./prisma/*.db ./dist/**/*.map 2>/dev/null || true

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE ${PORT}

# ============================================================
# 9. Health check (with proper timeout and start period)
# ============================================================
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "const http = require('http'); const options = { host: 'localhost', port: ${PORT}, path: '/health', timeout: 3000 }; const req = http.get(options, (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }); req.on('error', () => { process.exit(1); });"

# ============================================================
# 10. Start application with dumb-init (proper signal handling)
# ============================================================
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]
