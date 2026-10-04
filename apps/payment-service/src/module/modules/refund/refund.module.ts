/**
 * RefundModule — refund feature wiring
 * @module payment-service/modules/refund
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RefundController } from '../../interfaces/controllers/rest/refund.controller.js';
import { RefundService } from '../../application/services/impl/refund.service.js';
import { REFUND_SERVICE } from '../../application/services/interfaces/refund.service.interface.js';

import { REFUND_COMMAND_HANDLERS } from '../../application/commands/refund/index.js';
import { REFUND_QUERY_HANDLERS } from '../../application/queries/refund/index.js';

import { RefundLifecycleSaga } from '../../application/sagas/refund-lifecycle.saga.js';

@Module({
  imports: [CqrsModule],
  controllers: [RefundController],
  providers: [
    RefundService,
    { provide: REFUND_SERVICE, useExisting: RefundService },

    ...REFUND_COMMAND_HANDLERS,
    ...REFUND_QUERY_HANDLERS,

    RefundLifecycleSaga,
  ],
  exports: [RefundService, REFUND_SERVICE],
})
export class RefundModule {}
