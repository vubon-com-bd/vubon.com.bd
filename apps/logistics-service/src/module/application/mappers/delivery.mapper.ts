import { Injectable } from '@nestjs/common';
import { DeliveryEntity } from '../../domain/entities/delivery.entity';
import type { DeliveryResponseDTO } from '../dtos/responses/delivery-response.dto';

@Injectable()
export class DeliveryMapper {
  toDTO(entity: DeliveryEntity): DeliveryResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as DeliveryResponseDTO;
  }
}
