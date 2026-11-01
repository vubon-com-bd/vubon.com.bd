import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  INVENTORY_LOCATION_REPOSITORY,
  type InventoryLocationRepository,
} from '@domain/repositories/inventory-location.repository.interface';
import { InventoryLocationEntity } from '@domain/entities/inventory-location.entity';
import { InventoryLocationIdVO } from '@domain/primitives/inventory-location-id.vo';
import { InventoryLocationCodeVO } from '@domain/primitives/inventory-location-code.vo';
import { InventoryLocationNameVO } from '@domain/primitives/inventory-location-name.vo';

import { InventoryLocationMapper } from '@application/mappers/inventory-location/inventory-location.mapper';
import { InventoryLocationValidator } from '@application/validators/inventory-location/inventory-location.validator';

import {
  INVENTORY_LOCATION_SERVICE,
  type IInventoryLocationService,
  type InventoryLocationListOptionsDTO,
} from '@application/services/interfaces/inventory-location.service.interface';

import type {
  InventoryLocationResponseDTO,
  InventoryLocationListResponseDTO,
  InventoryLocationStatsResponseDTO,
} from '@application/dtos/responses/inventory-location/index.js';

import type {
  CreateInventoryLocationRequestDTO,
  UpdateInventoryLocationRequestDTO,
  InventoryLocationActionRequestDTO,
  DeactivateInventoryLocationRequestDTO,
  QuarantineInventoryLocationRequestDTO,
  ArchiveInventoryLocationRequestDTO,
  AddInventoryStockRequestDTO,
  RemoveInventoryStockRequestDTO,
} from '@application/dtos/requests/inventory-location/index.js';

import {
  InventoryLocationNotFoundApplicationError,
  InventoryLocationByCodeNotFoundError,
  CreateInventoryLocationError,
  InventoryLocationAlreadyExistsError,
  InventoryLocationOperationError,
} from '@application/errors/inventory-location.errors';

export interface IInventoryLocationEventBridge {
  publishFromEntity(entity: InventoryLocationEntity): Promise<void>;
}
export const INVENTORY_LOCATION_EVENT_BRIDGE = Symbol('INVENTORY_LOCATION_EVENT_BRIDGE');

@Injectable()
export class InventoryLocationService implements IInventoryLocationService {
  private readonly logger = new Logger(InventoryLocationService.name);

  constructor(
    @Inject(INVENTORY_LOCATION_REPOSITORY)
    private readonly repo: InventoryLocationRepository,
    @Inject(INVENTORY_LOCATION_EVENT_BRIDGE)
    private readonly eventBridge: IInventoryLocationEventBridge,
  ) {}

  async create(dto: CreateInventoryLocationRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO> {
    this.logger.log(`create inventory location code=${dto.code}`);
    try {
      const v = InventoryLocationValidator.validateCreate(dto);
      if (await this.repo.existsByCode(v.code)) throw new InventoryLocationAlreadyExistsError(v.code);
      const now = new Date().toISOString();
      const entity = InventoryLocationEntity.create({
        id: InventoryLocationIdVO.create(randomUUID()),
        now,
        props: {
          warehouseId: v.warehouseId,
          code: InventoryLocationCodeVO.create(v.code),
          name: InventoryLocationNameVO.create(v.name),
          zone: v.zone,
          aisle: v.aisle,
          rack: v.rack,
          shelf: v.shelf,
          bin: v.bin,
          barcode: v.barcode,
          maxCapacityKg: v.maxCapacityKg,
          maxCapacityM3: v.maxCapacityM3,
          currentKg: 0,
          currentM3: 0,
          isPickable: v.isPickable ?? false,
          priority: v.priority ?? 0,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return InventoryLocationMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async update(dto: UpdateInventoryLocationRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO> {
    const v = InventoryLocationValidator.validateUpdate(dto);
    const entity = await this.loadEntity(v.inventoryLocationId);
    if (v.maxCapacityKg !== undefined || v.maxCapacityM3 !== undefined) {
      entity.updateCapacity(v.maxCapacityKg, v.maxCapacityM3);
    }
    if (v.isPickable !== undefined || v.priority !== undefined) {
      entity.updateFlags({ isPickable: v.isPickable, priority: v.priority });
    }
    return this.persistAndPublish(entity);
  }
  async activate(dto: InventoryLocationActionRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO> {
    const v = InventoryLocationValidator.validateAction(dto);
    const entity = await this.loadEntity(v.inventoryLocationId);
    entity.activate();
    return this.persistAndPublish(entity);
  }
  async deactivate(dto: DeactivateInventoryLocationRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO> {
    const v = InventoryLocationValidator.validateDeactivate(dto);
    const entity = await this.loadEntity(v.inventoryLocationId);
    entity.deactivate(v.reason);
    return this.persistAndPublish(entity);
  }
  async quarantine(dto: QuarantineInventoryLocationRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO> {
    const v = InventoryLocationValidator.validateQuarantine(dto);
    const entity = await this.loadEntity(v.inventoryLocationId);
    entity.quarantine(v.reason);
    return this.persistAndPublish(entity);
  }
  async unquarantine(dto: InventoryLocationActionRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO> {
    const v = InventoryLocationValidator.validateAction(dto);
    const entity = await this.loadEntity(v.inventoryLocationId);
    entity.unquarantine();
    return this.persistAndPublish(entity);
  }
  async archive(dto: ArchiveInventoryLocationRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO> {
    const v = InventoryLocationValidator.validateArchive(dto);
    const entity = await this.loadEntity(v.inventoryLocationId);
    entity.archive(v.reason);
    return this.persistAndPublish(entity);
  }
  async addStock(dto: AddInventoryStockRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO> {
    const v = InventoryLocationValidator.validateAddStock(dto);
    const entity = await this.loadEntity(v.inventoryLocationId);
    entity.addStock(v.weightKg, v.volumeM3);
    return this.persistAndPublish(entity);
  }
  async removeStock(dto: RemoveInventoryStockRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO> {
    const v = InventoryLocationValidator.validateRemoveStock(dto);
    const entity = await this.loadEntity(v.inventoryLocationId);
    entity.removeStock(v.weightKg, v.volumeM3);
    return this.persistAndPublish(entity);
  }
  async updateCapacity(dto: any, actorId: string): Promise<InventoryLocationResponseDTO> {
    const entity = await this.loadEntity(dto.inventoryLocationId);
    entity.updateCapacity(dto.maxCapacityKg, dto.maxCapacityM3);
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<InventoryLocationResponseDTO> {
    const entity = await this.loadEntity(id);
    return InventoryLocationMapper.toResponse(entity);
  }
  async getByCode(code: string): Promise<InventoryLocationResponseDTO> {
    const entity = await this.repo.findByCode(code);
    if (!entity) throw new InventoryLocationByCodeNotFoundError(code);
    return InventoryLocationMapper.toResponse(entity);
  }
  async getByBarcode(barcode: string): Promise<InventoryLocationResponseDTO> {
    const entity = await this.repo.findByBarcode(barcode);
    if (!entity) throw new InventoryLocationNotFoundApplicationError(`barcode:${barcode}`);
    return InventoryLocationMapper.toResponse(entity);
  }
  async list(options: InventoryLocationListOptionsDTO): Promise<InventoryLocationListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return InventoryLocationMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listByWarehouse(warehouseId: string): Promise<InventoryLocationListResponseDTO> {
    const items = await this.repo.findByWarehouseId(warehouseId);
    return InventoryLocationMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByZone(warehouseId: string, zone: string): Promise<InventoryLocationListResponseDTO> {
    const items = await this.repo.findByZone(warehouseId, zone);
    return InventoryLocationMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listPickable(warehouseId: string): Promise<InventoryLocationListResponseDTO> {
    const items = await this.repo.findPickable(warehouseId);
    return InventoryLocationMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getStats(warehouseId?: string): Promise<InventoryLocationStatsResponseDTO> {
    const stats = await this.repo.getStats(warehouseId);
    return InventoryLocationMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<InventoryLocationEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new InventoryLocationNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: InventoryLocationEntity): Promise<InventoryLocationResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return InventoryLocationMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateInventoryLocationError(err.message);
      return new InventoryLocationOperationError(op, err.message);
    }
    return new InventoryLocationOperationError(op, String(err));
  }
}
