import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthAccountLockController } from '../../interfaces/controllers/rest/auth-account-lock.controller';
import { AuthAccountLockService } from '../../application/services/impl/auth-account-lock.service';
import { LockAccountHandler } from '../../application/commands/auth/lock-account.handler';
import { UnlockAccountHandler } from '../../application/commands/auth/unlock-account.handler';
import { GetAuthAccountLockStatusHandler } from '../../application/queries/auth/get-auth-account-lock-status.handler';
import { AuthAccountLockPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-account-lock.prisma.repository';
import { AuthAccountLockCacheRepository } from '../../infrastructure/persistence/cache/repositories/auth-account-lock.cache.repository';
import { AccountLockValidatorService } from '../../infrastructure/services/internal/account-lock-validator.service';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthAccountLockController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthAccountLockRepository', useExisting: AuthAccountLockPrismaRepository },
    { provide: 'AuthAccountLockCacheRepository', useExisting: AuthAccountLockCacheRepository },
    { provide: 'AccountLockValidatorService', useExisting: AccountLockValidatorService },
    { provide: 'AuthAccountLockService', useExisting: AuthAccountLockService },

    AuthAccountLockPrismaRepository,
    AuthAccountLockCacheRepository,
    AccountLockValidatorService,
    AuthAccountLockService,
    LockAccountHandler,
    UnlockAccountHandler,
    GetAuthAccountLockStatusHandler,
  ],
  exports: [AuthAccountLockService, AuthAccountLockPrismaRepository],
})
export class AuthAccountLockModule {}
