/**
 * WarehouseService — orchestrates warehouse use cases
 * @module logistics-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { IWarehouseService, WarehouseListOptionsDTO } from '../interfaces/warehouse.service.interface.js';
import { WAREHOUSE_REPOSITORY, type WarehouseRepository } from '../../../domain/repositories/warehouse.repository.interface.js';
import { WarehouseEntity } from '../../../domain/entities/warehouse.entity.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { WarehouseCodeVO } from '../../../domain/value-objects/primitives/warehouse-code.vo.js';
import { WarehouseTypeVO } from '../../../domain/value-objects/primitives/warehouse-type.vo.js';
import { AddressDetailsVO } from '../../../domain/value-objects/composites/address-details.vo.js';
import { CapacityVO } from '../../../domain/value-objects/composites/capacity.vo.js';

import { WarehouseMapper } from '../../mappers/warehouse.mapper.js';
import {
  WarehouseNotFoundApplicationError,
  WarehouseOperationFailedApplicationError,
} from '../../errors/warehouse.errors.js';

import type {
  CreateWarehouseRequestDTO, UpdateWarehouseRequestDTO,
  ActivateWarehouseRequestDTO, DeactivateWarehouseRequestDTO,
  StartMaintenanceRequestDTO, CompleteMaintenanceRequestDTO,
  ReserveCapacityRequestDTO, ReleaseCapacityRequestDTO,
} from '../../dtos/requests/warehouse/warehouse.dto.js';
import type { WarehouseResponseDTO, WarehouseListResponseDTO } from '../../dtos/responses/warehouse/warehouse-response.dto.js';

@Injectable()
export class WarehouseService implements IWarehouseService {
  private readonly logger = new Logger(WarehouseService.name);

  constructor(@Inject(WAREHOUSE_REPOSITORY) private readonly repo: WarehouseRepository) {}

  async create(dto: CreateWarehouseRequestDTO, actorId?: string): Promise<WarehouseResponseDTO> {
    const now = new Date().toISOString();
    const codeVO = WarehouseCodeVO.create(dto.code);
    if (await this.repo.existsByCode(codeVO)) {
      throw new WarehouseOperationFailedApplicationError('create', `warehouse code exists: ${dto.code}`);
    }
    const id = randomUUID();
    let entity: WarehouseEntity;
    try {
      entity = WarehouseEntity.create({
        id,
        now,
        props: {
          code: codeVO,
          name: dto.name,
          type: WarehouseTypeVO.create(dto.type),
          address: AddressDetailsVO.create({
            address: dto.address,
            contactName: dto.contactName,
            contactPhone: dto.contactPhone,
          }),
          contactName: dto.contactName,
          contactPhone: dto.contactPhone as never,
          contactEmail: dto.contactEmail as never,
          capacity: CapacityVO.create({
            capacityM3: dto.capacityM3,
            usedM3: 0,
            capacityKg: dto.capacityKg,
            usedKg: 0,
          }),
          maxSkus: dto.maxSkus ?? 100000,
          zone: dto.zone,
          operatingHoursStart: dto.operatingHoursStart,
          operatingHoursEnd: dto.operatingHoursEnd,
          timezone: dto.timezone ?? 'Asia/Dhaka',
          isDefault: dto.isDefault ?? false,
        },
      });
    } catch (e) {
      throw new WarehouseOperationFailedApplicationError('create', e instanceof Error ? e.message : 'unknown');
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Warehouse ${saved.id} created by ${actorId ?? 'system'}`);
    return WarehouseMapper.toResponse(saved);
  }

  async update(dto: UpdateWarehouseRequestDTO, actorId?: string): Promise<WarehouseResponseDTO> {
    const entity = await this.load(dto.warehouseId);
    entity.updateContact({
      name: dto.contactName,
      phone: dto.contactPhone as never,
      email: dto.contactEmail as never,
    });
    const saved = await this.repo.save(entity);
    this.logger.log(`Warehouse ${saved.id} updated by ${actorId ?? 'system'}`);
    return WarehouseMapper.toResponse(saved);
  }

  async activate(dto: ActivateWarehouseRequestDTO, actorId?: string): Promise<WarehouseResponseDTO> {
    const e = await this.load(dto.warehouseId); e.activate();
    const saved = await this.repo.save(e);
    this.logger.log(`Warehouse ${saved.id} activated by ${actorId ?? 'system'}`);
    return WarehouseMapper.toResponse(saved);
  }

  async deactivate(dto: DeactivateWarehouseRequestDTO, actorId?: string): Promise<WarehouseResponseDTO> {
    const e = await this.load(dto.warehouseId); e.deactivate(dto.reason);
    const saved = await this.repo.save(e);
    this.logger.log(`Warehouse ${saved.id} deactivated by ${actorId ?? 'system'}`);
    return WarehouseMapper.toResponse(saved);
  }

  async startMaintenance(dto: StartMaintenanceRequestDTO, actorId?: string): Promise<WarehouseResponseDTO> {
    const e = await this.load(dto.warehouseId); e.startMaintenance(dto.reason);
    const saved = await this.repo.save(e);
    this.logger.log(`Warehouse ${saved.id} maintenance started by ${actorId ?? 'system'}`);
    return WarehouseMapper.toResponse(saved);
  }

  async completeMaintenance(dto: CompleteMaintenanceRequestDTO, actorId?: string): Promise<WarehouseResponseDTO> {
    const e = await this.load(dto.warehouseId); e.completeMaintenance();
    const saved = await this.repo.save(e);
    this.logger.log(`Warehouse ${saved.id} maintenance completed by ${actorId ?? 'system'}`);
    return WarehouseMapper.toResponse(saved);
  }

  async reserveCapacity(dto: ReserveCapacityRequestDTO, actorId?: string): Promise<WarehouseResponseDTO> {
    const e = await this.load(dto.warehouseId); e.reserveCapacity(dto.volumeM3, dto.weightKg);
    const saved = await this.repo.save(e);
    this.logger.log(`Warehouse ${saved.id} reserved capacity by ${actorId ?? 'system'}`);
    return WarehouseMapper.toResponse(saved);
  }

  async releaseCapacity(dto: ReleaseCapacityRequestDTO, actorId?: string): Promise<WarehouseResponseDTO> {
    const e = await this.load(dto.warehouseId); e.releaseCapacity(dto.volumeM3, dto.weightKg);
    const saved = await this.repo.save(e);
    this.logger.log(`Warehouse ${saved.id} released capacity by ${actorId ?? 'system'}`);
    return WarehouseMapper.toResponse(saved);
  }

  async getById(warehouseId: string): Promise<WarehouseResponseDTO> {
    return WarehouseMapper.toResponse(await this.load(warehouseId));
  }

  async list(options: WarehouseListOptionsDTO): Promise<WarehouseListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return WarehouseMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  async getDefault(): Promise<WarehouseResponseDTO | null> {
    const w = await this.repo.findDefault();
    return w ? WarehouseMapper.toResponse(w) : null;
  }

  private async load(id: string): Promise<WarehouseEntity> {
    const vo = WarehouseIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new WarehouseNotFoundApplicationError(id);
    return e;
  }
}
