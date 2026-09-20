import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserVerificationController } from '../../interfaces/controllers/rest/user-verification.controller';
import { UserVerificationService } from '../../application/services/impl/user-verification.service';
import { VerifiedGuard } from '../../interfaces/guards/verified.guard';
import { UserVerificationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-verification.prisma.repository';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [UserVerificationController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'UserVerificationRepository', useExisting: UserVerificationPrismaRepository },
    { provide: 'UserVerificationService', useExisting: UserVerificationService },

    UserVerificationPrismaRepository,
    UserVerificationService,
    VerifiedGuard,
  ],
  exports: [UserVerificationService, UserVerificationPrismaRepository, VerifiedGuard],
})
export class UserVerificationModule {}
