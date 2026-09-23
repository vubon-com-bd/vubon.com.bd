import { Injectable } from '@nestjs/common';
import { CourierEntity } from '../../domain/entities/courier.entity';
import type { CourierResponseDTO } from '../dtos/responses/courier-response.dto';

@Injectable()
export class CourierMapper {
  toDTO(entity: CourierEntity): CourierResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as CourierResponseDTO;
  }
}
