/**
 * CheckoutMapper — Entity → DTO
 * @module order-service/application/mappers
 */
import type { CheckoutEntity } from '../../domain/entities/checkout.entity.js';
import type { CheckoutSessionEntity } from '../../domain/entities/checkout-session.entity.js';
import type {
  CheckoutResponseDTO,
  CheckoutSessionResponseDTO,
  CheckoutAddressResponseDTO,
} from '../dtos/responses/checkout-response.dto.js';
import type {
  CheckoutStatusValue,
  CheckoutStepValue,
} from '@vubon/shared-types/business/checkout';

export class CheckoutMapper {
  static toResponse(entity: CheckoutEntity): CheckoutResponseDTO {
    const mapShipping = (
      line: CheckoutEntity['shippingAddress'],
    ): CheckoutAddressResponseDTO | undefined => {
      if (!line) return undefined;
      const v = line.value;
      return {
        fullName: v.fullName,
        phone: v.phone,
        line1: v.line1,
        line2: v.line2,
        city: v.city,
        state: v.state,
        postalCode: v.postalCode,
        country: v.country,
      };
    };

    const mapBilling = (
      line: CheckoutEntity['billingAddress'],
    ): CheckoutAddressResponseDTO | undefined => {
      if (!line) return undefined;
      const v = line.value;
      return {
        fullName: v.fullName,
        phone: v.phone,
        line1: v.line1,
        line2: v.line2,
        city: v.city,
        state: v.state,
        postalCode: v.postalCode,
        country: v.country,
      };
    };

    const remainingSteps: string[] = [];
    if (!entity.shippingAddress) remainingSteps.push('shipping_address');
    if (!entity.shippingMethodId) remainingSteps.push('shipping_method');
    if (!entity.paymentMethod) remainingSteps.push('payment_method');

    return {
      id: entity.id,
      customerId: entity.customerId.value,
      cartId: entity.cartId,
      status: entity.status.value as CheckoutStatusValue,
      currentStep: entity.currentStep.value as CheckoutStepValue,
      type: entity.type,
      subtotal: entity.subtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.total,
      currency: entity.currency,
      shippingAddress: mapShipping(entity.shippingAddress),
      billingAddress: mapBilling(entity.billingAddress),
      shippingMethodId: entity.shippingMethodId,
      paymentMethod: entity.paymentMethod,
      orderId: entity.orderId,
      expiresAt: entity.expiresAt,
      isReadyToConfirm: entity.isReadyToConfirm(),
      remainingSteps,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSessionResponse(session: CheckoutSessionEntity): CheckoutSessionResponseDTO {
    return {
      id: session.id,
      checkoutId: session.checkoutId.value,
      customerId: session.customerId.value,
      token: session.token,
      expiresAt: session.expiresAt,
      isExpired: session.isExpired(),
      remainingMs: session.remainingMs,
    };
  }
}
