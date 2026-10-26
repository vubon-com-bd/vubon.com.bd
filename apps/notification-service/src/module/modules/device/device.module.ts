/**
 * DeviceModule
 * @module notification-service/modules/device
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { DeviceController } from '@interfaces/controllers/rest/device.controller.js';
import { DEVICE_COMMAND_HANDLERS } from './commands/index.js';
import { DEVICE_QUERY_HANDLERS } from './queries/index.js';

import { DeviceService } from '@application/services/impl/device.service.js';
import { DEVICE_SERVICE } from '@application/services/interfaces/device.service.interface.js';
import { DeviceTokenService } from '@application/services/impl/device-token.service.js';
import { DEVICE_TOKEN_SERVICE } from '@application/services/interfaces/device-token.service.interface.js';

import { DeviceOwnerGuard } from '@interfaces/guards/device-owner.guard.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [DeviceController],
  providers: [
    DeviceService,
    { provide: DEVICE_SERVICE, useExisting: DeviceService },
    DeviceTokenService,
    { provide: DEVICE_TOKEN_SERVICE, useExisting: DeviceTokenService },
    ...(DEVICE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(DEVICE_QUERY_HANDLERS as readonly unknown[] as never[]),
    DeviceOwnerGuard,
  ],
  exports: [
    DeviceService,
    DEVICE_SERVICE,
    DeviceTokenService,
    DEVICE_TOKEN_SERVICE,
  ],
})
export class DeviceModule {}
