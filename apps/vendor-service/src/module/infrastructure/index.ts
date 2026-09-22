/**
 * Infrastructure Layer — Barrel Export
 */

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

// Services — External
export * from './services/external';

// Services — Internal
export * from './services/internal';

// Queues
export * from './queues';

// Workers
export * from './workers';

// Bank providers (explicit — avoid duplicate BankTransferInput/Result)
export {
  BkashProvider,
  NagadProvider,
  RocketProvider,
  BankTransferProvider,
} from './external/bank/providers';

// Email templates
export * from './external/email/templates';
