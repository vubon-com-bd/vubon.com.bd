# ============================================================
# Multi-stage build for production
# ============================================================

# ----------------------------------------
# Builder stage
# ----------------------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Build arguments
ARG NODE_ENV=production
ARG DATABASE_URL
ARG JWT_SECRET

# Set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV NODE_OPTIONS="--max-old-space-size=512"

# Copy package files (with lock file for deterministic builds)
COPY package*.json package-lock.json ./

# Install dependencies (clean install)
RUN npm ci --only=production && \
npm cache clean --force

# Copy Prisma schema (after deps to leverage cache)
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN npm run build

# ----------------------------------------
# Production stage
# ----------------------------------------
FROM node:20-alpine AS runner

# Build arguments
ARG PORT=3000
ARG NODE_ENV=production

# Set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV NODE_OPTIONS="--max-old-space-size=512"

# Create non-root user (alpine uses node user by default)
RUN addgroup --system --gid 1001 nodejs && \
adduser --system --uid 1001 nodejs

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/package-lock.json ./
COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE ${PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
CMD node -e "require('http').get('http://localhost:${PORT}/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "dist/main"]
