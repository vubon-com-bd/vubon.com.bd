import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import type { PaymentResponseDTO } from '../dtos/responses/payment-response.dto';

@Injectable()
export class PaymentMapper {
  toResponse(entity: PaymentEntity): PaymentResponseDTO {
    return {
      success: true,
      payment: {
        id: entity.id.value,
        orderId: entity.orderId.value,
        status: entity.status.value,
        method: entity.type.value,
        gateway: entity.gateway?.value,
        amount: entity.amount.amount as never,
        currency: entity.currency.value,
        createdAt: entity.createdAt,
        capturedAt: entity.capturedAt?.toISOString(),
      },
    } as unknown as PaymentResponseDTO;
  }
}
