import { Injectable } from '@nestjs/common';
import type { RefundResponseDTO } from '../../application/dtos/responses/refund-response.dto';
import { RefundResponseDto } from '../dtos/responses/refund.response.dto';

@Injectable()
export class RefundControllerMapper {
  toResponse(app: RefundResponseDTO): RefundResponseDto {
    const refund = (app as unknown as { refund?: Record<string, unknown> }).refund ?? (app as unknown as Record<string, unknown>);
    return {
      id: String(refund['id']),
      paymentId: String(refund['paymentId'] ?? ''),
      status: String(refund['status']),
      amount: Number(refund['amount']),
      currency: String(refund['currency']),
      reason: refund['reason'] ? String(refund['reason']) : undefined,
      processedAt: refund['processedAt'] ? String(refund['processedAt']) : undefined,
      createdAt: String(refund['createdAt']),
    };
  }
}
