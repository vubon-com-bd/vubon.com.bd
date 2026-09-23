import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ZoneServiceInterface } from '../interfaces/zone.service.interface';
import type { ZoneRepository } from '../../../domain/repositories/zone.repository.interface';
import { ZoneEntity } from '../../../domain/entities/zone.entity';
import { ZoneIdVO } from '../../../domain/value-objects/primitives/zone-id.vo';
import { ZoneNameVO } from '../../../domain/value-objects/primitives/zone-name.vo';
import { ZoneStatusVO } from '../../../domain/value-objects/primitives/zone-status.vo';
import { ZoneTypeVO } from '../../../domain/value-objects/primitives/zone-type.vo';
import type { CreateZoneRequestDTO } from '../../dtos/requests/zone/create-zone.dto';
import type { UpdateZoneRequestDTO } from '../../dtos/requests/zone/update-zone.dto';
import type { ZoneResponseDTO } from '../../dtos/responses/zone-response.dto';

@Injectable()
export class ZoneService
  extends BaseService<ZoneEntity, string>
  implements ZoneServiceInterface
{
  readonly name = 'ZoneService';

  constructor(private readonly repo: ZoneRepository) {
    super();
  }

  async create(input: CreateZoneRequestDTO): Promise<ZoneResponseDTO> {
    const entity = ZoneEntity.create({
      code: input.code,
      name: ZoneNameVO.create(input.name),
      type: ZoneTypeVO.create(input.type),
      status: ZoneStatusVO.create('active'),
      divisions: input.divisions,
      districts: input.districts,
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async update(input: UpdateZoneRequestDTO): Promise<ZoneResponseDTO> {
    const entity = await this.repo.findById(ZoneIdVO.create(input.zoneId));
    if (!entity) throw new Error('Zone not found');
    return this.toDTO(entity);
  }

  async findByCode(code: string): Promise<ZoneResponseDTO | null> {
    const entity = await this.repo.findByCode(code);
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: ZoneEntity): ZoneResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as ZoneResponseDTO;
  }
}
