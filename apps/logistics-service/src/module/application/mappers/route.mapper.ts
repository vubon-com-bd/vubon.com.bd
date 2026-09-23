import { Injectable } from '@nestjs/common';
import { RouteEntity } from '../../domain/entities/route.entity';
import type { RouteResponseDTO } from '../dtos/responses/route-response.dto';

@Injectable()
export class RouteMapper {
  toDTO(entity: RouteEntity): RouteResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as RouteResponseDTO;
  }
}
