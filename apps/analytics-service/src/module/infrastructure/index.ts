// ═══════════════════════════════════════════════════════
// Infrastructure Layer — Barrel Export
// ═══════════════════════════════════════════════════════

export { InfrastructureModule } from './infrastructure.module';

// Config
export * from './config';

// Persistence — Prisma
export { PrismaService } from './persistence/prisma/prisma.service';
export { PrismaModule } from './persistence/prisma/prisma.module';
export * from './persistence/prisma/repositories';

// Persistence — Cache
export * from './persistence/cache/repositories';

// Persistence — OLAP
export * from './persistence/olap';

// External clients (HTTP adapters)
export * from './services/external';

// Internal services (adapters)
export * from './services/internal';

// Queues
export * from './queues';

// Workers
export * from './workers';

// External integrations (storage, email, slack, chart)
export * from './external';
