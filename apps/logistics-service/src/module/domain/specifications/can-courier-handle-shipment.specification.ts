/**
 * CanCourierHandleShipmentSpecification — formalize courier eligibility
 * @module logistics-service/domain/specifications
 *
 * Testable, explainable version of CourierEntity.canHandle().
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { CourierEntity } from '../entities/courier.entity.js';

export interface CourierHandleContext {
  readonly isCOD: boolean;
  readonly isInsured: boolean;
  readonly isInternational: boolean;
  readonly zone?: string;
  readonly currency?: string;
}

export class CanCourierHandleShipmentSpecification extends Specification<{
  courier: CourierEntity;
  ctx: CourierHandleContext;
}> {
  isSatisfiedBy(c: { courier: CourierEntity; ctx: CourierHandleContext }): boolean {
    const { courier, ctx } = c;
    if (!courier.isOperational()) return false;
    if (ctx.zone && !courier.canShipTo(ctx.zone)) return false;
    if (ctx.currency && !courier.supportsCurrency(ctx.currency)) return false;
    if (ctx.isCOD && !courier.supportsCOD) return false;
    if (ctx.isInsured && !courier.supportsInsurance) return false;
    if (ctx.isInternational && !courier.supportsInternational) return false;
    return true;
  }

  explain(c: { courier: CourierEntity; ctx: CourierHandleContext }): string | null {
    if (this.isSatisfiedBy(c)) return null;
    const { courier, ctx } = c;
    if (!courier.isOperational()) return `courier status "${courier.status.value}" not operational`;
    if (ctx.zone && !courier.canShipTo(ctx.zone)) return `courier does not cover zone "${ctx.zone}"`;
    if (ctx.currency && !courier.supportsCurrency(ctx.currency)) return `courier does not support currency "${ctx.currency}"`;
    if (ctx.isCOD && !courier.supportsCOD) return 'courier does not support COD';
    if (ctx.isInsured && !courier.supportsInsurance) return 'courier does not support insurance';
    if (ctx.isInternational && !courier.supportsInternational) return 'courier does not support international';
    return 'courier cannot handle shipment';
  }
}
