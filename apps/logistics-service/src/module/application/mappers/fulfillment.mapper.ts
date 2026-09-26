import { Injectable } from '@nestjs/common';
import { FulfillmentEntity } from '../../domain/entities/fulfillment.entity';
import type { FulfillmentResponseDTO } from '../dtos/responses/fulfillment-response.dto';

@Injectable()
export class FulfillmentMapper {
  toDTO(entity: FulfillmentEntity): FulfillmentResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as FulfillmentResponseDTO;
  }
}
