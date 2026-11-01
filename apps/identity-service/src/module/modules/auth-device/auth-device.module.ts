/**
 * AuthDeviceModule
 * @module identity-service/modules/auth-device
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthDeviceController } from '../../interfaces/controllers/rest/auth-device.controller.js';
import { DEVICE_QUERY_HANDLERS } from './queries/index.js';

import { AuthDeviceService } from '../../application/services/impl/auth-device.service.js';
import { AUTH_DEVICE_SERVICE } from '../../application/services/interfaces/auth-device.service.interface.js';
import { DeviceTrustService } from '../../domain/services/device-trust.service.js';

const SERVICES = [
  AuthDeviceService,
  { provide: AUTH_DEVICE_SERVICE, useExisting: AuthDeviceService },
  DeviceTrustService,
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthDeviceController],
  providers: [
    ...SERVICES,
    ...(DEVICE_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: SERVICES,
})
export class AuthDeviceModule {}
