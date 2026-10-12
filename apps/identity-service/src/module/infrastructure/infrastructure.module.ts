/**
 * InfrastructureModule — aggregates every infrastructure sub-module
 * @module identity-service/infrastructure
 *
 * Conditional: DB_MODE=memory → MemoryRepositoriesModule
 *              DB_MODE=prisma (default) → PrismaRepositoriesModule
 */
import { Global, Module } from '@nestjs/common';

// ─── Kernel externals ──────────────────────
import { EmailModule } from '@vubon/shared-kernel/infrastructure/external/email';
import { SmsModule } from '@vubon/shared-kernel/infrastructure/external/sms';
import { PushModule } from '@vubon/shared-kernel/infrastructure/external/push';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { HashService } from '@vubon/shared-kernel/infrastructure/security';
import { JwtService } from '@vubon/shared-kernel/infrastructure/security';

// ─── Persistence ───────────────────────────
import { AuthPrismaModule } from './persistence/prisma/prisma.module.js';
import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { MemoryRepositoriesModule } from './persistence/memory/memory-repositories.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';

// ─── External ──────────────────────────────
import { AuthEmailModule } from './external/email/email.module.js';
import { AuthSmsModule } from './external/sms/sms.module.js';

// ─── Queues + Workers ──────────────────────
import { QueuesWorkersModule } from './queues-workers.module.js';

// ─── Internal services ─────────────────────
import {
  PasswordHasherService,
  PasswordValidatorService,
  TokenGeneratorService,
  MfaValidatorService,
  OtpGeneratorService,
  RecoveryCodeGeneratorService,
  DeviceFingerprintService,
  IdempotencyService,
  RateLimiterService,
  ProfileCompletionCalculatorService,
  AvatarProcessorService,
  KycDocumentValidatorService,
  UserTierEvaluatorService,
  ActivityRecorderService,
} from './services/internal/index.js';

const INTERNAL_SERVICES = [
  PasswordHasherService,
  PasswordValidatorService,
  TokenGeneratorService,
  MfaValidatorService,
  OtpGeneratorService,
  RecoveryCodeGeneratorService,
  DeviceFingerprintService,
  IdempotencyService,
  RateLimiterService,
  ProfileCompletionCalculatorService,
  AvatarProcessorService,
  KycDocumentValidatorService,
  UserTierEvaluatorService,
  ActivityRecorderService,
];

// ─── Conditional Repository Module ─────────
const DB_MODE = process.env['DB_MODE'] ?? 'prisma';
const RepositoryModule =
  DB_MODE === 'memory' ? MemoryRepositoriesModule : PrismaRepositoriesModule;

@Global()
@Module({
  imports: [
    // Kernel
    EmailModule,
    SmsModule,
    PushModule,
    QueueModule,
    RedisModule,

    // Persistence
    AuthPrismaModule,
    RepositoryModule,
    RedisRepositoriesModule,

    // External
    AuthEmailModule,
    AuthSmsModule,

    // Queues + Workers
    QueuesWorkersModule,
  ],
  providers: [
    HashService,
    JwtService,
    ...INTERNAL_SERVICES,
  ],
  exports: [
    // Kernel
    EmailModule,
    SmsModule,
    PushModule,
    QueueModule,
    RedisModule,
    HashService,
    JwtService,

    // Persistence
    AuthPrismaModule,
    RepositoryModule,
    RedisRepositoriesModule,

    // External
    AuthEmailModule,
    AuthSmsModule,

    // Queues + Workers
    QueuesWorkersModule,

    // Internal services
    ...INTERNAL_SERVICES,
  ],
})
export class InfrastructureModule {}
