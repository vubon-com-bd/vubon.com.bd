import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthBiometricController } from '../../interfaces/controllers/rest/auth-biometric.controller.js';
import { AuthBiometricService } from '../../application/services/impl/auth-biometric.service.js';
import { EnableBiometricHandler } from '../../application/commands/auth/enable-biometric.handler.js';
import { DisableBiometricHandler } from '../../application/commands/auth/disable-biometric.handler.js';
import { VerifyBiometricHandler } from '../../application/commands/auth/verify-biometric.handler.js';
import { AuthBiometricPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-biometric.prisma.repository.js';
import { BiometricGuard } from '../../interfaces/guards/biometric.guard.js';
import {
  AUTH_BIOMETRIC_REPO,
  AUTH_BIOMETRIC_SERVICE,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: AUTH_BIOMETRIC_REPO, useExisting: AuthBiometricPrismaRepository },
  { provide: AUTH_BIOMETRIC_SERVICE, useExisting: AuthBiometricService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthBiometricController],
  providers: [
    AuthBiometricService,
    AuthBiometricPrismaRepository,
    BiometricGuard,
    EnableBiometricHandler,
    DisableBiometricHandler,
    VerifyBiometricHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthBiometricService,
    AuthBiometricPrismaRepository,
    BiometricGuard,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthBiometricModule {}
