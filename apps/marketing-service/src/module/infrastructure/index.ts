// ═══════════════════════════════════════════════════════
// Infrastructure Layer — Barrel Export
// ═══════════════════════════════════════════════════════

// Module
export { InfrastructureModule } from './infrastructure.module';

// Config
export * from './config';

// Persistence — Prisma
export * from './persistence/prisma/repositories';
export { PrismaService } from './persistence/prisma/prisma.service';
export { PrismaModule } from './persistence/prisma/prisma.module';

// Persistence — Cache
export * from './persistence/cache/repositories';

// Services — Internal
export * from './services/internal';

// Services — External
export * from './services/external';

// Marketing Providers
export * from './marketing-providers';

// Queues
export * from './queues';

// Workers
export * from './workers';

// Email Templates
export * from './external/email/templates';
