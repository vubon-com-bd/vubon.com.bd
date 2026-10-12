/**
 * CanRefundReturnSpecification
 * @module logistics-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { RETURN_SHIPMENT } from '@vubon/shared-constants/logistics';
import type { ReturnShipmentEntity } from '../entities/return-shipment.entity.js';

export interface RefundContext {
  readonly at?: Date;
  readonly requiresInspection?: boolean;
}

export class CanRefundReturnSpecification extends Specification<{
  returnShipment: ReturnShipmentEntity;
  ctx?: RefundContext;
}> {
  isSatisfiedBy(c: { returnShipment: ReturnShipmentEntity; ctx?: RefundContext }): boolean {
    const { returnShipment, ctx } = c;
    if (returnShipment.hasRefund) return false;
    if (returnShipment.isLost()) return false;
    if (returnShipment.isCancelled()) return false;
    if (returnShipment.isRejected()) return false;
    const requiresInspection = ctx?.requiresInspection ?? true;
    if (requiresInspection && !returnShipment.isInspected() && !returnShipment.isCompleted()) return false;
    // Return must be within the refund window
    const at = ctx?.at ?? new Date();
    if (!this.isWithinRefundWindow(returnShipment, at)) return false;
    return true;
  }

  explain(c: { returnShipment: ReturnShipmentEntity; ctx?: RefundContext }): string | null {
    if (this.isSatisfiedBy(c)) return null;
    const { returnShipment, ctx } = c;
    if (returnShipment.hasRefund) return 'refund already issued';
    if (returnShipment.isLost()) return 'return shipment is lost';
    if (returnShipment.isCancelled()) return 'return was cancelled';
    if (returnShipment.isRejected()) return 'return was rejected';
    const requiresInspection = ctx?.requiresInspection ?? true;
    if (requiresInspection && !returnShipment.isInspected()) return 'return has not been inspected';
    return 'cannot issue refund';
  }

  private isWithinRefundWindow(returnShipment: ReturnShipmentEntity, at: Date): boolean {
    if (!returnShipment.pickedUpAt) return false;
    const picked = new Date(returnShipment.pickedUpAt).getTime();
    const windowMs = RETURN_SHIPMENT.REFUND_PROCESSING_DAYS * 24 * 60 * 60 * 1000;
    return at.getTime() <= picked + windowMs;
  }
}
