import { Injectable } from '@nestjs/common';
import { VehicleEntity } from '../../domain/entities/vehicle.entity';
import type { VehicleResponseDTO } from '../dtos/responses/vehicle-response.dto';

@Injectable()
export class VehicleMapper {
  toDTO(entity: VehicleEntity): VehicleResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as VehicleResponseDTO;
  }
}
