import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  WAREHOUSE_REPOSITORY,
  type WarehouseRepository,
} from '@domain/repositories/warehouse.repository.interface';
import { WarehouseEntity } from '@domain/entities/warehouse.entity';
import { WarehouseIdVO } from '@domain/primitives/warehouse-id.vo';
import { WarehouseCodeVO } from '@domain/primitives/warehouse-code.vo';
import { WarehouseNameVO } from '@domain/primitives/warehouse-name.vo';

import { WarehouseMapper } from '@application/mappers/warehouse/warehouse.mapper';
import { WarehouseValidator } from '@application/validators/warehouse/warehouse.validator';

import {
  WAREHOUSE_SERVICE,
  type IWarehouseService,
  type WarehouseListOptionsDTO,
} from '@application/services/interfaces/warehouse.service.interface';

import type {
  WarehouseResponseDTO,
  WarehouseListResponseDTO,
  WarehouseStatsResponseDTO,
} from '@application/dtos/responses/warehouse/index.js';

import type {
  CreateWarehouseRequestDTO,
  UpdateWarehouseRequestDTO,
  ActivateWarehouseRequestDTO,
  DeactivateWarehouseRequestDTO,
  StartMaintenanceRequestDTO,
  EndMaintenanceRequestDTO,
  CloseWarehouseRequestDTO,
  ArchiveWarehouseRequestDTO,
  UpdateCapacityRequestDTO,
} from '@application/dtos/requests/warehouse/index.js';

import {
  WarehouseNotFoundApplicationError,
  WarehouseByCodeNotFoundError,
  CreateWarehouseError,
  WarehouseAlreadyExistsError,
  WarehouseOperationError,
} from '@application/errors/warehouse.errors';

export interface IWarehouseEventBridge {
  publishFromEntity(entity: WarehouseEntity): Promise<void>;
}
export const WAREHOUSE_EVENT_BRIDGE = Symbol('WAREHOUSE_EVENT_BRIDGE');

@Injectable()
export class WarehouseService implements IWarehouseService {
  private readonly logger = new Logger(WarehouseService.name);

  constructor(
    @Inject(WAREHOUSE_REPOSITORY)
    private readonly repo: WarehouseRepository,
    @Inject(WAREHOUSE_EVENT_BRIDGE)
    private readonly eventBridge: IWarehouseEventBridge,
  ) {}

  async create(dto: CreateWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO> {
    this.logger.log(`create warehouse code=${dto.code}`);
    try {
      const v = WarehouseValidator.validateCreate(dto);
      if (await this.repo.existsByCode(v.code)) throw new WarehouseAlreadyExistsError(v.code);

      const now = new Date().toISOString();
      const entity = WarehouseEntity.create({
        id: WarehouseIdVO.create(randomUUID()),
        now,
        props: {
          code: WarehouseCodeVO.create(v.code),
          name: WarehouseNameVO.create(v.name),
          type: v.type,
          address: v.address,
          contactName: v.contactName,
          contactPhone: v.contactPhone,
          contactEmail: v.contactEmail,
          managerId: v.managerId,
          capacityM3: v.capacityM3,
          capacityKg: v.capacityKg,
          maxSkus: v.maxSkus,
          zone: v.zone,
          operatingHoursStart: v.operatingHoursStart,
          operatingHoursEnd: v.operatingHoursEnd,
          timezone: v.timezone,
          isDefault: v.isDefault ?? false,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return WarehouseMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async update(dto: UpdateWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO> {
    const v = WarehouseValidator.validateUpdate(dto);
    const entity = await this.loadEntity(v.warehouseId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WarehouseMapper.toResponse(saved);
  }

  async activate(dto: ActivateWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO> {
    const v = WarehouseValidator.validateActivate(dto);
    const entity = await this.loadEntity(v.warehouseId);
    entity.activate();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WarehouseMapper.toResponse(saved);
  }

  async deactivate(dto: DeactivateWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO> {
    const v = WarehouseValidator.validateDeactivate(dto);
    const entity = await this.loadEntity(v.warehouseId);
    entity.deactivate(v.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WarehouseMapper.toResponse(saved);
  }

  async startMaintenance(dto: StartMaintenanceRequestDTO, actorId: string): Promise<WarehouseResponseDTO> {
    const v = WarehouseValidator.validateStartMaintenance(dto);
    const entity = await this.loadEntity(v.warehouseId);
    entity.startMaintenance(v.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WarehouseMapper.toResponse(saved);
  }

  async endMaintenance(dto: EndMaintenanceRequestDTO, actorId: string): Promise<WarehouseResponseDTO> {
    const v = WarehouseValidator.validateEndMaintenance(dto);
    const entity = await this.loadEntity(v.warehouseId);
    entity.endMaintenance();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WarehouseMapper.toResponse(saved);
  }

  async close(dto: CloseWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO> {
    const v = WarehouseValidator.validateClose(dto);
    const entity = await this.loadEntity(v.warehouseId);
    entity.close(v.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WarehouseMapper.toResponse(saved);
  }

  async archive(dto: ArchiveWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO> {
    const v = WarehouseValidator.validateArchive(dto);
    const entity = await this.loadEntity(v.warehouseId);
    entity.archive(v.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WarehouseMapper.toResponse(saved);
  }

  async updateCapacity(dto: UpdateCapacityRequestDTO, actorId: string): Promise<WarehouseResponseDTO> {
    const v = WarehouseValidator.validateCapacity(dto);
    const entity = await this.loadEntity(v.warehouseId);
    entity.updateCapacity(v.capacityM3, v.capacityKg);
    if (v.usedCapacityM3 !== undefined || v.usedCapacityKg !== undefined) {
      entity.updateUsage(v.usedCapacityM3, v.usedCapacityKg);
    }
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WarehouseMapper.toResponse(saved);
  }

  async getById(id: string): Promise<WarehouseResponseDTO> {
    const entity = await this.loadEntity(id);
    return WarehouseMapper.toResponse(entity);
  }
  async getByCode(code: string): Promise<WarehouseResponseDTO> {
    const entity = await this.repo.findByCode(code);
    if (!entity) throw new WarehouseByCodeNotFoundError(code);
    return WarehouseMapper.toResponse(entity);
  }
  async list(options: WarehouseListOptionsDTO): Promise<WarehouseListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return WarehouseMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listOperational(): Promise<WarehouseListResponseDTO> {
    const items = await this.repo.findOperational();
    return WarehouseMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByZone(zone: string): Promise<WarehouseListResponseDTO> {
    const items = await this.repo.findByZone(zone);
    return WarehouseMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getDefault(): Promise<WarehouseResponseDTO | null> {
    const entity = await this.repo.findDefault();
    return entity ? WarehouseMapper.toResponse(entity) : null;
  }
  async getStats(): Promise<WarehouseStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return WarehouseMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<WarehouseEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new WarehouseNotFoundApplicationError(id);
    return entity;
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateWarehouseError(err.message);
      return new WarehouseOperationError(op, err.message);
    }
    return new WarehouseOperationError(op, String(err));
  }
}
