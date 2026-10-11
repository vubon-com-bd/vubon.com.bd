/**
 * PreferenceModule — user preferences + device registration
 * @module notification-service/modules/preference
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { PreferenceController } from '../../interfaces/controllers/rest/preference.controller.js';
import { DeviceController } from '../../interfaces/controllers/rest/device.controller.js';

import { PreferenceService } from '../../application/services/impl/preference.service.js';
import { DeviceService } from '../../application/services/impl/device.service.js';
import { PREFERENCE_SERVICE } from '../../application/services/interfaces/preference.service.interface.js';
import { DEVICE_SERVICE } from '../../application/services/interfaces/device.service.interface.js';

import { PREFERENCE_COMMAND_HANDLERS } from '../../application/commands/preference/index.js';
import { DEVICE_COMMAND_HANDLERS } from '../../application/commands/device/index.js';
import { PREFERENCE_QUERY_HANDLERS } from '../../application/queries/preference/index.js';
import { DEVICE_QUERY_HANDLERS } from '../../application/queries/device/index.js';

import { UnsubscribeSaga } from '../../application/sagas/unsubscribe.saga.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [PreferenceController, DeviceController],
  providers: [
    PreferenceService,
    DeviceService,
    { provide: PREFERENCE_SERVICE, useExisting: PreferenceService },
    { provide: DEVICE_SERVICE, useExisting: DeviceService },
    ...PREFERENCE_COMMAND_HANDLERS,
    ...DEVICE_COMMAND_HANDLERS,
    ...PREFERENCE_QUERY_HANDLERS,
    ...DEVICE_QUERY_HANDLERS,
    UnsubscribeSaga,
  ],
  exports: [PreferenceService, DeviceService, PREFERENCE_SERVICE, DEVICE_SERVICE],
})
export class PreferenceModule {}
