import { Injectable } from '@nestjs/common';
import type { ReturnResponseDTO } from '../../application/dtos/responses/return-response.dto';
import type { ReturnResponseDto } from '../dtos/responses/return.response.dto';

@Injectable()
export class ReturnControllerMapper {
  toResponse(appDto: ReturnResponseDTO): ReturnResponseDto {
    return {
      id: appDto.id,
      orderId: appDto.orderId,
      customerId: appDto.customerId,
      reason: appDto.reason,
      status: appDto.status,
      approvedAt: appDto.approvedAt ?? null,
      rejectedAt: appDto.rejectedAt ?? null,
      completedAt: appDto.completedAt ?? null,
      createdAt: appDto.createdAt,
      updatedAt: appDto.updatedAt,
    };
  }
}
