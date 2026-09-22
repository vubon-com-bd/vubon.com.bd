import { Injectable } from '@nestjs/common';
import type { DeliveryResponseDTO } from '../../application/dtos/responses/delivery-response.dto';
import type { DeliveryResponseDto } from '../dtos/responses/delivery.response.dto';

@Injectable()
export class DeliveryControllerMapper {
  toResponse(appDto: DeliveryResponseDTO): DeliveryResponseDto {
    return {
      id: appDto.id,
      orderId: appDto.orderId,
      status: appDto.status,
      type: appDto.type,
      methodId: appDto.methodId ?? null,
      scheduledAt: appDto.scheduledAt ?? null,
      attemptedAt: appDto.attemptedAt ?? null,
      deliveredAt: appDto.deliveredAt ?? null,
      createdAt: appDto.createdAt,
      updatedAt: appDto.updatedAt,
    };
  }
}
