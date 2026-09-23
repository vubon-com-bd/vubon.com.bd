import { Injectable } from '@nestjs/common';
import { TrackingEntity } from '../../domain/entities/tracking.entity';
import type { TrackingResponseDTO } from '../dtos/responses/tracking-response.dto';

@Injectable()
export class TrackingMapper {
  toDTO(entity: TrackingEntity): TrackingResponseDTO {
    return {
      id: entity.id.value,
      trackingNumber: entity.number.value,
      shipmentId: entity.shipmentId.value,
      status: entity.status.value,
    } as unknown as TrackingResponseDTO;
  }
}
