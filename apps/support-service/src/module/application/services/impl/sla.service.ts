import { Injectable } from '@nestjs/common';
import type { SlaServiceInterface } from '../interfaces/sla.service.interface';
import type { SlaRepository } from '../../../domain/repositories/sla.repository.interface';
import { SlaEntity } from '../../../domain/entities/sla.entity';
import { SlaIdVO } from '../../../domain/value-objects/primitives/sla-id.vo';
import { SlaTypeVO } from '../../../domain/value-objects/primitives/sla-type.vo';
import { SlaTargetVO } from '../../../domain/value-objects/primitives/sla-target.vo';
import { SlaStatusVO } from '../../../domain/value-objects/primitives/sla-status.vo';
import type { CreateSlaRequestDTO } from '../../dtos/requests/sla';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';

@Injectable()
export class SlaService implements SlaServiceInterface {
  constructor(private readonly slaRepo: SlaRepository) {}

  async create(input: CreateSlaRequestDTO): Promise<SlaResponseDTO> {
    const entity = SlaEntity.create({
      name: input.name,
      type: SlaTypeVO.create(input.type),
      target: SlaTargetVO.create(input.target),
      status: SlaStatusVO.create('met'),
      priority: input.priority,
      businessHoursOnly: input.businessHoursOnly ?? false,
    });
    const saved = await this.slaRepo.save(entity);
    return this.toDTO(saved);
  }

  async findById(id: SlaIdVO): Promise<SlaEntity | null> {
    return this.slaRepo.findById(id);
  }

  private toDTO(entity: SlaEntity): SlaResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name,
      type: entity.type.value,
      target: entity.target.value,
      priority: entity.priority,
      status: entity.status.value,
      businessHoursOnly: entity.businessHoursOnly,
    };
  }
}
