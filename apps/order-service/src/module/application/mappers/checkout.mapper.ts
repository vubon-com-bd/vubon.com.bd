/**
 * Checkout Mappers
 * @module order-service/application/mappers
 */
import type { CheckoutEntity } from '../../domain/entities/checkout.entity.js';
import type { CheckoutSessionEntity } from '../../domain/entities/checkout-session.entity.js';
import type {
  CheckoutResponseDTO,
  CheckoutPublicResponseDTO,
  CheckoutSessionResponseDTO,
} from '../dtos/responses/checkout-response.dto.js';

export class CheckoutMapper {
  static toResponse(entity: CheckoutEntity): CheckoutResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      customerId: vo.customerId.value,
      status: vo.status.value,
      currentStep: vo.currentStep.value,
      expiresAt: vo.expiresAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: CheckoutEntity): CheckoutPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      status: vo.status.value,
      currentStep: vo.currentStep.value,
      expiresAt: vo.expiresAt,
    };
  }
}

export class CheckoutSessionMapper {
  static toResponse(entity: CheckoutSessionEntity): CheckoutSessionResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      checkoutId: vo.checkoutId.value,
      status: vo.status.value,
      currentStep: vo.currentStep.value,
      shippingAddressId: vo.shippingAddressId?.value,
      deliveryMethodId: vo.deliveryMethodId?.value,
      paymentMethod: vo.paymentMethod,
      startedAt: vo.startedAt,
      lastActivityAt: vo.lastActivityAt,
    };
  }
}
