import { Injectable } from '@nestjs/common';
import { RefundEntity } from '../../domain/entities/refund.entity';
import type { RefundResponseDTO } from '../dtos/responses/refund-response.dto';

@Injectable()
export class RefundMapper {
  toResponse(entity: RefundEntity): RefundResponseDTO {
    return {
      id: entity.id.value,
      status: entity.status.value,
      amount: entity.amount.amount as never,
      currency: entity.currency.value,
      reason: entity.reason ?? undefined,
      createdAt: entity.createdAt,
      processedAt: entity.processedAt?.toISOString(),
    } as unknown as RefundResponseDTO;
  }
}
