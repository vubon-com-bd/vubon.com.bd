import { Injectable } from '@nestjs/common';
import { LeadEntity } from '../../domain/entities/lead.entity';
import type { LeadResponseDTO } from '../dtos/responses/lead-response.dto';

@Injectable()
export class LeadMapper {
  toDTO(entity: LeadEntity): LeadResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      email: entity.email.value,
      status: entity.status.value,
      source: entity.source.value,
      score: entity.score.value,
      quality: 'warm',
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as LeadResponseDTO;
  }
}
