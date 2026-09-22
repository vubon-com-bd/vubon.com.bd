import { CheckoutEntity } from '../../domain/entities/checkout.entity';
import type { CheckoutResponseDTO } from '../dtos/responses/checkout-response.dto';

export class CheckoutMapper {
  static toResponse(checkout: CheckoutEntity): CheckoutResponseDTO {
    return {
      id: checkout.id.value,
      customerId: checkout.customerId.value,
      status: checkout.status.value,
      step: checkout.step.value,
      addressId: checkout.addressId,
      shippingId: checkout.shippingId,
      paymentId: checkout.paymentId,
      expiresAt: checkout.expiresAt?.toISOString() ?? null,
      createdAt: checkout.createdAt,
      updatedAt: checkout.updatedAt,
    };
  }
}
