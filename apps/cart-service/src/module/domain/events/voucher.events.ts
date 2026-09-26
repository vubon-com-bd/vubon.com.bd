import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'CartVoucher';

export class VoucherAppliedEvent extends BaseDomainEvent<'cart.voucher.applied', { cartId: string; code: string; value: number }> {
  constructor(cartId: string, code: string, value: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.voucher.applied', aggregateId: cartId, aggregateType: AGG, payload: { cartId, code, value }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class VoucherRemovedEvent extends BaseDomainEvent<'cart.voucher.removed', { cartId: string; code: string }> {
  constructor(cartId: string, code: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.voucher.removed', aggregateId: cartId, aggregateType: AGG, payload: { cartId, code }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}
