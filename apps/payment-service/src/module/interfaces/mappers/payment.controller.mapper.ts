import { Injectable } from '@nestjs/common';
import type { PaymentResponseDTO } from '../../application/dtos/responses/payment-response.dto';
import {
  PaymentResponseDto,
  PaymentPublicResponseDto,
} from '../dtos/responses/payment.response.dto';

@Injectable()
export class PaymentControllerMapper {
  toResponse(app: PaymentResponseDTO): PaymentResponseDto {
    const payment = (app as unknown as { payment: Record<string, unknown> }).payment;
    return {
      id: String(payment['id']),
      orderId: String(payment['orderId']),
      userId: String(payment['userId'] ?? ''),
      type: String(payment['type'] ?? ''),
      status: String(payment['status']),
      method: String(payment['method']),
      gateway: payment['gateway'] ? String(payment['gateway']) : undefined,
      amount: Number(payment['amount']),
      currency: String(payment['currency']),
      capturedAt: payment['capturedAt'] ? String(payment['capturedAt']) : undefined,
      failureReason: payment['failureReason'] ? String(payment['failureReason']) : undefined,
      createdAt: String(payment['createdAt']),
      updatedAt: String(payment['updatedAt'] ?? payment['createdAt']),
    };
  }

  toPublic(app: PaymentResponseDTO): PaymentPublicResponseDto {
    const full = this.toResponse(app);
    return {
      id: full.id,
      orderId: full.orderId,
      status: full.status,
      method: full.method,
      gateway: full.gateway,
      amount: full.amount,
      currency: full.currency,
      capturedAt: full.capturedAt,
      createdAt: full.createdAt,
    };
  }
}
