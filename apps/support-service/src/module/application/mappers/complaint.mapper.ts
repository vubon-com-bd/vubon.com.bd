import { Injectable } from '@nestjs/common';
import { ComplaintEntity } from '../../domain/entities/complaint.entity';
import type { ComplaintResponseDTO } from '../dtos/responses/complaint-response.dto';

@Injectable()
export class ComplaintMapper {
  toDTO(entity: ComplaintEntity): ComplaintResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      severity: entity.severity.value,
      status: entity.status.value,
      content: entity.content,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
