import { Injectable } from '@nestjs/common';
import { DriverEntity } from '../../domain/entities/driver.entity';
import type { DriverResponseDTO } from '../dtos/responses/driver-response.dto';

@Injectable()
export class DriverMapper {
  toDTO(entity: DriverEntity): DriverResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as DriverResponseDTO;
  }
}
