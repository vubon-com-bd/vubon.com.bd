/**
 * RefundModule — feature wiring for refunds
 * @module payment-service/modules/refund
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// ─── Controller ─────────────────────────────
import { RefundController } from '@interfaces/controllers/rest/refund.controller';

// ─── Handler arrays ─────────────────────────
import { REFUND_COMMAND_HANDLERS } from './commands/index.js';
import { REFUND_QUERY_HANDLERS } from './queries/index.js';
import { REFUND_SAGAS } from './sagas/index.js';

// ─── Service + interface token ──────────────
import { RefundService } from '@application/services/impl/refund.service';
import { REFUND_SERVICE } from '@application/services/interfaces/refund.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [RefundController],
  providers: [
    RefundService,
    { provide: REFUND_SERVICE, useExisting: RefundService },
    ...(REFUND_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(REFUND_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(REFUND_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [RefundService, REFUND_SERVICE],
})
export class RefundModule {}
