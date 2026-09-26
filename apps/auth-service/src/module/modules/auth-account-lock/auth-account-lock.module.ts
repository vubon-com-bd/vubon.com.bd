import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthAccountLockController } from '../../interfaces/controllers/rest/auth-account-lock.controller';
import { AuthAccountLockService } from '../../application/services/impl/auth-account-lock.service';
import { LockAccountHandler } from '../../application/commands/auth/lock-account.handler';
import { UnlockAccountHandler } from '../../application/commands/auth/unlock-account.handler';
import { GetAuthAccountLockStatusHandler } from '../../application/queries/auth/get-auth-account-lock-status.handler';
import { AuthAccountLockPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-account-lock.prisma.repository';
import { AuthAccountLockCacheRepository } from '../../infrastructure/persistence/cache/repositories/auth-account-lock.cache.repository';
import {
  AUTH_ACCOUNT_LOCK_REPO,
  AUTH_ACCOUNT_LOCK_SERVICE,
} from '../../application/services/tokens';

const TOKEN_BINDINGS = [
  { provide: AUTH_ACCOUNT_LOCK_REPO, useExisting: AuthAccountLockPrismaRepository },
  { provide: AUTH_ACCOUNT_LOCK_SERVICE, useExisting: AuthAccountLockService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthAccountLockController],
  providers: [
    AuthAccountLockService,
    AuthAccountLockPrismaRepository,
    AuthAccountLockCacheRepository,
    LockAccountHandler,
    UnlockAccountHandler,
    GetAuthAccountLockStatusHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthAccountLockService,
    AuthAccountLockPrismaRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthAccountLockModule {}
