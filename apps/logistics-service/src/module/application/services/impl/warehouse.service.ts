import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { WarehouseServiceInterface } from '../interfaces/warehouse.service.interface';
import type { WarehouseRepository } from '../../../domain/repositories/warehouse.repository.interface';
import { WarehouseEntity } from '../../../domain/entities/warehouse.entity';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo';
import { WarehouseCodeVO } from '../../../domain/value-objects/primitives/warehouse-code.vo';
import { WarehouseNameVO } from '../../../domain/value-objects/primitives/warehouse-name.vo';
import { WarehouseStatusVO } from '../../../domain/value-objects/primitives/warehouse-status.vo';
import { LocationIdVO } from '../../../domain/value-objects/primitives/location-id.vo';
import { LocationCodeVO } from '../../../domain/value-objects/primitives/location-code.vo';
import type { CreateWarehouseRequestDTO } from '../../dtos/requests/warehouse/create-warehouse.dto';
import type { UpdateWarehouseRequestDTO } from '../../dtos/requests/warehouse/update-warehouse.dto';
import type { AddLocationRequestDTO } from '../../dtos/requests/warehouse/add-location.dto';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse-response.dto';

@Injectable()
export class WarehouseService
  extends BaseService<WarehouseEntity, string>
  implements WarehouseServiceInterface
{
  readonly name = 'WarehouseService';

  constructor(private readonly repo: WarehouseRepository) {
    super();
  }

  async create(input: CreateWarehouseRequestDTO): Promise<WarehouseResponseDTO> {
    const entity = WarehouseEntity.create({
      code: WarehouseCodeVO.create(input.code),
      name: WarehouseNameVO.create(input.name),
      status: WarehouseStatusVO.create('active'),
      division: input.division ?? null,
      district: input.district ?? null,
      address: input.address ?? null,
      capacity: input.capacity ?? null,
      locations: [],
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async update(input: UpdateWarehouseRequestDTO): Promise<WarehouseResponseDTO> {
    const entity = await this.repo.findById(WarehouseIdVO.create(input.warehouseId));
    if (!entity) throw new Error('Warehouse not found');
    return this.toDTO(entity);
  }

  async addLocation(input: AddLocationRequestDTO): Promise<WarehouseResponseDTO> {
    const entity = await this.repo.findById(WarehouseIdVO.create(input.warehouseId));
    if (!entity) throw new Error('Warehouse not found');
    const updated = entity.addLocation(
      LocationIdVO.create(crypto.randomUUID()),
      LocationCodeVO.create(input.code),
    );
    const saved = await this.repo.save(updated);
    return this.toDTO(saved);
  }

  async listActive(): Promise<readonly WarehouseResponseDTO[]> {
    const entities = await this.repo.findActive();
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: WarehouseEntity): WarehouseResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as WarehouseResponseDTO;
  }
}
