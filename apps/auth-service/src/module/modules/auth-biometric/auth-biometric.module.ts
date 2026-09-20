import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthBiometricController } from '../../interfaces/controllers/rest/auth-biometric.controller';
import { AuthBiometricService } from '../../application/services/impl/auth-biometric.service';
import { EnableBiometricHandler } from '../../application/commands/auth/enable-biometric.handler';
import { DisableBiometricHandler } from '../../application/commands/auth/disable-biometric.handler';
import { VerifyBiometricHandler } from '../../application/commands/auth/verify-biometric.handler';
import { AuthBiometricPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-biometric.prisma.repository';
import { BiometricValidatorService } from '../../infrastructure/services/internal/biometric-validator.service';
import { BiometricGuard } from '../../interfaces/guards/biometric.guard';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthBiometricController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthBiometricRepository', useExisting: AuthBiometricPrismaRepository },
    { provide: 'BiometricValidatorService', useExisting: BiometricValidatorService },
    { provide: 'AuthBiometricService', useExisting: AuthBiometricService },
    { provide: 'BiometricGuard', useExisting: BiometricGuard },

    AuthBiometricPrismaRepository,
    BiometricValidatorService,
    AuthBiometricService,
    EnableBiometricHandler,
    DisableBiometricHandler,
    VerifyBiometricHandler,
    BiometricGuard,
  ],
  exports: [AuthBiometricService, AuthBiometricPrismaRepository, BiometricGuard],
})
export class AuthBiometricModule {}
