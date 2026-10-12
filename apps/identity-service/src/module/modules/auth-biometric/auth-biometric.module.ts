/**
 * AuthBiometricModule
 * @module identity-service/modules/auth-biometric
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthBiometricController } from '../../interfaces/controllers/rest/auth-biometric.controller.js';
import { BIOMETRIC_COMMAND_HANDLERS } from './commands/index.js';

import { AuthBiometricService } from '../../application/services/impl/auth-biometric.service.js';
import { AUTH_BIOMETRIC_SERVICE } from '../../application/services/interfaces/auth-biometric.service.interface.js';

const SERVICES = [
  AuthBiometricService,
  { provide: AUTH_BIOMETRIC_SERVICE, useExisting: AuthBiometricService },
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthBiometricController],
  providers: [
    ...SERVICES,
    ...(BIOMETRIC_COMMAND_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class AuthBiometricModule {}
