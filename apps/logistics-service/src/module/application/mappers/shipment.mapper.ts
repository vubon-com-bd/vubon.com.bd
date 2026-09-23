import { Injectable } from '@nestjs/common';
import { ShipmentEntity } from '../../domain/entities/shipment.entity';
import type { ShipmentResponseDTO } from '../dtos/responses/shipment-response.dto';

@Injectable()
export class ShipmentMapper {
  toDTO(entity: ShipmentEntity): ShipmentResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as ShipmentResponseDTO;
  }
}
