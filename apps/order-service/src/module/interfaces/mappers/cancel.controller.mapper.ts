import { Injectable } from '@nestjs/common';
import type { CancelResponseDTO } from '../../application/dtos/responses/cancel-response.dto';
import type { CancelResponseDto } from '../dtos/responses/cancel.response.dto';

@Injectable()
export class CancelControllerMapper {
  toResponse(appDto: CancelResponseDTO): CancelResponseDto {
    return {
      id: appDto.id,
      orderId: appDto.orderId,
      customerId: appDto.customerId,
      reason: appDto.reason,
      status: appDto.status,
      approvedAt: appDto.approvedAt ?? null,
      rejectedAt: appDto.rejectedAt ?? null,
      createdAt: appDto.createdAt,
      updatedAt: appDto.updatedAt,
    };
  }
}
