import { Injectable } from '@nestjs/common';
import { WarehouseEntity } from '../../domain/entities/warehouse.entity';
import type { WarehouseResponseDTO } from '../dtos/responses/warehouse-response.dto';

@Injectable()
export class WarehouseMapper {
  toDTO(entity: WarehouseEntity): WarehouseResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as WarehouseResponseDTO;
  }
}
