// ═══════════════════════════════════════════════════════
// Infrastructure Layer — Barrel Export
// ═══════════════════════════════════════════════════════

// Module
export { InfrastructureModule } from './infrastructure.module';

// Prisma
export * from './persistence/prisma';

// Cache repositories
export * from './persistence/cache/repositories';

// Providers
export * from './providers';

// Template engine
export * from './template-engine';

// Internal services
export * from './services/internal';

// External services
export * from './services/external';

// Queues
export * from './queues';

// Workers
export * from './workers';

// External integrations
export * from './external';

// Config
export * from './config';
