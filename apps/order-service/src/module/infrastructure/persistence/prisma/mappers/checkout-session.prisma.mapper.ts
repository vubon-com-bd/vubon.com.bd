/**
 * CheckoutSessionPrismaMapper
 * @module order-service/infrastructure/persistence/prisma/mappers
 */
import { CheckoutSessionEntity } from '../../../../domain/entities/checkout-session.entity.js';
import { CheckoutSessionVO } from '../../../../domain/value-objects/composites/checkout-session.vo.js';
import { CheckoutIdVO } from '../../../../domain/value-objects/primitives/checkout-id.vo.js';
import { CheckoutStatusVO } from '../../../../domain/value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../../../../domain/value-objects/primitives/checkout-step.vo.js';
import { ShippingAddressIdVO } from '../../../../domain/value-objects/primitives/shipping-address-id.vo.js';
import { DeliveryMethodIdVO } from '../../../../domain/value-objects/primitives/delivery-method-id.vo.js';

export interface PrismaCheckoutSessionRow {
  id: string;
  checkoutId: string;
  customerId: string;
  token: string;
  stepData: unknown;
  ipAddress: string | null;
  userAgent: string | null;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class CheckoutSessionPrismaMapper {
  static toDomain(raw: PrismaCheckoutSessionRow): CheckoutSessionEntity {
    const stepData = (raw.stepData ?? {}) as Record<string, unknown>;
    const shippingAddressIdRaw = stepData['shippingAddressId'] as string | undefined;
    const deliveryMethodIdRaw = stepData['deliveryMethodId'] as string | undefined;
    const paymentMethodRaw = stepData['paymentMethod'] as string | undefined;
    const statusRaw = (stepData['status'] as string | undefined) ?? 'started';
    const stepRaw = (stepData['currentStep'] as string | undefined) ?? 'cart';

    const vo = CheckoutSessionVO.create({
      checkoutId: CheckoutIdVO.reconstitute(raw.checkoutId),
      status: CheckoutStatusVO.reconstitute(statusRaw),
      currentStep: CheckoutStepVO.reconstitute(stepRaw),
      shippingAddressId: shippingAddressIdRaw
        ? ShippingAddressIdVO.reconstitute(shippingAddressIdRaw)
        : undefined,
      deliveryMethodId: deliveryMethodIdRaw
        ? DeliveryMethodIdVO.reconstitute(deliveryMethodIdRaw)
        : undefined,
      paymentMethod: paymentMethodRaw,
      startedAt: new Date(raw.createdAt).toISOString(),
      lastActivityAt: new Date(raw.updatedAt).toISOString(),
    });
    return CheckoutSessionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: null,
      vo,
    });
  }

  static toPersistence(entity: CheckoutSessionEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      checkoutId: vo.checkoutId.value,
      customerId: vo.checkoutId.value,
      token: `token_${entity.id}`,
      stepData: {
        status: vo.status.value,
        currentStep: vo.currentStep.value,
        shippingAddressId: vo.shippingAddressId?.value,
        deliveryMethodId: vo.deliveryMethodId?.value,
        paymentMethod: vo.paymentMethod,
      },
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
