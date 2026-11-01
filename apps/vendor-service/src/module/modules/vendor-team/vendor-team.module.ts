import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorTeamController } from '../../interfaces/controllers/rest/vendor-team.controller.js';

import { VENDOR_TEAM_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_TEAM_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_TEAM_EVENT_HANDLERS } from './events/index.js';

import { VendorTeamService } from '../../application/services/impl/vendor-team.service.js';
import { VENDOR_TEAM_SERVICE } from '../../application/services/interfaces/vendor-team.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorTeamController],
  providers: [
    VendorTeamService,
    { provide: VENDOR_TEAM_SERVICE, useExisting: VendorTeamService },
    ...(VENDOR_TEAM_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_TEAM_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_TEAM_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorTeamService, VENDOR_TEAM_SERVICE],
})
export class VendorTeamModule {}
