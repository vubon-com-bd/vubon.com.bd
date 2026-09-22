import { Injectable } from '@nestjs/common';
import type { CheckoutResponseDTO } from '../../application/dtos/responses/checkout-response.dto';
import type { CheckoutResponseDto } from '../dtos/responses/checkout.response.dto';

@Injectable()
export class CheckoutControllerMapper {
  toResponse(appDto: CheckoutResponseDTO): CheckoutResponseDto {
    return {
      id: appDto.id,
      customerId: appDto.customerId,
      status: appDto.status,
      step: appDto.step,
      addressId: appDto.addressId ?? null,
      shippingId: appDto.shippingId ?? null,
      paymentId: appDto.paymentId ?? null,
      expiresAt: appDto.expiresAt ?? null,
      createdAt: appDto.createdAt,
      updatedAt: appDto.updatedAt,
    };
  }
}
