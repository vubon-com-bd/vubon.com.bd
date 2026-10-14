import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorReturnPolicyController } from '../../interfaces/controllers/rest/vendor-return-policy.controller.js';

import { VENDOR_RETURN_POLICY_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_RETURN_POLICY_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_RETURN_POLICY_EVENT_HANDLERS } from './events/index.js';

import { VendorReturnPolicyService } from '../../application/services/impl/vendor-return-policy.service.js';
import { VENDOR_RETURN_POLICY_SERVICE } from '../../application/services/interfaces/vendor-return-policy.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorReturnPolicyController],
  providers: [
    VendorReturnPolicyService,
    { provide: VENDOR_RETURN_POLICY_SERVICE, useExisting: VendorReturnPolicyService },
    ...(VENDOR_RETURN_POLICY_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_RETURN_POLICY_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_RETURN_POLICY_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorReturnPolicyService, VENDOR_RETURN_POLICY_SERVICE],
})
export class VendorReturnPolicyModule {}
