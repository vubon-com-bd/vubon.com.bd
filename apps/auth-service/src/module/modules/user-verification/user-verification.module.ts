import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserVerificationController } from '../../interfaces/controllers/rest/user-verification.controller';
import { UserVerificationService } from '../../application/services/impl/user-verification.service';
import { UserVerificationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-verification.prisma.repository';
import { VerifiedGuard } from '../../interfaces/guards/verified.guard';
import {
  USER_VERIFICATION_REPO,
  USER_VERIFICATION_SERVICE,
} from '../../application/services/tokens';

const TOKEN_BINDINGS = [
  { provide: USER_VERIFICATION_REPO, useExisting: UserVerificationPrismaRepository },
  { provide: USER_VERIFICATION_SERVICE, useExisting: UserVerificationService },
];

@Module({
  imports: [CqrsModule],
  controllers: [UserVerificationController],
  providers: [
    UserVerificationService,
    UserVerificationPrismaRepository,
    VerifiedGuard,
    ...TOKEN_BINDINGS,
  ],
  exports: [UserVerificationService, UserVerificationPrismaRepository, VerifiedGuard, ...TOKEN_BINDINGS.map((b) => b.provide)],
})
export class UserVerificationModule {}
