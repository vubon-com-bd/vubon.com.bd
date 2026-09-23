import { Injectable } from '@nestjs/common';
import { DispatchEntity } from '../../domain/entities/dispatch.entity';
import type { DispatchResponseDTO } from '../dtos/responses/dispatch-response.dto';

@Injectable()
export class DispatchMapper {
  toDTO(entity: DispatchEntity): DispatchResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as DispatchResponseDTO;
  }
}
