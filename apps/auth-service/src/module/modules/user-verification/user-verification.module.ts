import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserVerificationController } from '../../interfaces/controllers/rest/user-verification.controller.js';
import { UserVerificationService } from '../../application/services/impl/user-verification.service.js';
import { UserVerificationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user-verification.prisma.repository.js';
import { VerifiedGuard } from '../../interfaces/guards/verified.guard.js';
import {
  USER_VERIFICATION_REPO,
  USER_VERIFICATION_SERVICE,
} from '../../application/services/tokens.js';

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
