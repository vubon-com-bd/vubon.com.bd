/**
 * CheckoutPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { CheckoutEntity } from '../../../../domain/entities/checkout.entity.js';
import { CheckoutVO } from '../../../../domain/value-objects/composites/checkout.vo.js';
import { CheckoutIdVO } from '../../../../domain/value-objects/primitives/checkout-id.vo.js';
import { CheckoutStatusVO } from '../../../../domain/value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../../../../domain/value-objects/primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';
import { toIso } from './order.prisma.mapper.js';

export interface PrismaCheckoutRow {
  id: string;
  customerId: string;
  cartId: string | null;
  status: string;
  step: string;
  type: string;
  subtotal: unknown;
  discountAmount: unknown;
  taxAmount: unknown;
  shippingAmount: unknown;
  total: unknown;
  currency: string;
  shippingAddressId: string | null;
  billingAddressId: string | null;
  shippingMethodId: string | null;
  paymentMethod: string | null;
  orderId: string | null;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class CheckoutPrismaMapper {
  static toDomain(raw: PrismaCheckoutRow): CheckoutEntity {
    const vo = CheckoutVO.create({
      id: CheckoutIdVO.reconstitute(raw.id),
      customerId: CustomerIdVO.reconstitute(raw.customerId),
      status: CheckoutStatusVO.reconstitute(raw.status),
      currentStep: CheckoutStepVO.reconstitute(raw.step),
      expiresAt: new Date(raw.expiresAt).toISOString(),
    });
    return CheckoutEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: 0,
      props: { vo },
    });
  }

  static toPersistence(entity: CheckoutEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      customerId: vo.customerId.value,
      status: vo.status.value,
      step: vo.currentStep.value,
      type: 'registered',
      subtotal: 0,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 0,
      currency: 'BDT',
      expiresAt: new Date(vo.expiresAt),
      updatedAt: new Date(entity.updatedAt),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static _unusedToIso = toIso;
}
