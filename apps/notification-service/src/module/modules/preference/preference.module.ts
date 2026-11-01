/**
 * PreferenceModule
 * @module notification-service/modules/preference
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { PreferenceController } from '@interfaces/controllers/rest/preference.controller.js';
import { PREFERENCE_COMMAND_HANDLERS } from './commands/index.js';
import { PREFERENCE_QUERY_HANDLERS } from './queries/index.js';

// ─── Services ───────────────────────────────
import { PreferenceService } from '@application/services/impl/preference.service.js';
import { PREFERENCE_SERVICE } from '@application/services/interfaces/preference.service.interface.js';
import { PreferenceMatrixService } from '@application/services/impl/preference-matrix.service.js';
import { PREFERENCE_MATRIX_SERVICE } from '@application/services/interfaces/preference-matrix.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [PreferenceController],
  providers: [
    PreferenceService,
    { provide: PREFERENCE_SERVICE, useExisting: PreferenceService },
    PreferenceMatrixService,
    { provide: PREFERENCE_MATRIX_SERVICE, useExisting: PreferenceMatrixService },
    ...(PREFERENCE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(PREFERENCE_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [
    PreferenceService,
    PREFERENCE_SERVICE,
    PreferenceMatrixService,
    PREFERENCE_MATRIX_SERVICE,
  ],
})
export class PreferenceModule {}
