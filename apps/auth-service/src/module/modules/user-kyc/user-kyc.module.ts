import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserKycController } from '../../interfaces/controllers/rest/user-kyc.controller';
import { UserKycService } from '../../application/services/impl/user-kyc.service';
import { SubmitKycHandler } from '../../application/commands/user/submit-kyc.handler';
import { VerifyKycHandler } from '../../application/commands/user/verify-kyc.handler';
import { RejectKycHandler } from '../../application/commands/user/reject-kyc.handler';
import { GetUserKycStatusHandler } from '../../application/queries/user/get-user-kyc-status.handler';
import { UserKycPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-kyc.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [UserKycController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'UserKycRepository', useExisting: UserKycPrismaRepository },
    { provide: 'UserKycService', useExisting: UserKycService },

    UserKycPrismaRepository,
    UserKycService,
    SubmitKycHandler,
    VerifyKycHandler,
    RejectKycHandler,
    GetUserKycStatusHandler,
  ],
  exports: [UserKycService, UserKycPrismaRepository],
})
export class UserKycModule {}
