import { Injectable } from '@nestjs/common';
import type { OrderResponseDTO } from '../../application/dtos/responses/order-response.dto';
import type { OrderResponseDto } from '../dtos/responses/order.response.dto';

@Injectable()
export class OrderControllerMapper {
  toResponse(appDto: OrderResponseDTO): OrderResponseDto {
    return {
      id: appDto.id,
      orderNumber: appDto.orderNumber,
      customerId: appDto.customerId,
      vendorId: appDto.vendorId ?? null,
      status: appDto.status,
      channel: appDto.channel,
      source: appDto.source,
      subtotal: appDto.subtotal,
      discount: appDto.discount,
      tax: appDto.tax,
      shipping: appDto.shipping,
      total: appDto.total,
      currency: appDto.currency,
      note: appDto.note ?? null,
      paymentId: appDto.paymentId ?? null,
      createdAt: appDto.createdAt,
      updatedAt: appDto.updatedAt,
    };
  }
}
