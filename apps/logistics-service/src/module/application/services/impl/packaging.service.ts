import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  PACKAGING_REPOSITORY,
  type PackagingRepository,
} from '@domain/repositories/packaging.repository.interface';
import { PackagingEntity } from '@domain/entities/packaging.entity';
import { PackagingIdVO } from '@domain/primitives/packaging-id.vo';
import { PackagingTypeVO } from '@domain/primitives/packaging-type.vo';
import { PackagingMaterialVO } from '@domain/primitives/packaging-material.vo';
import { PackagingSizeVO } from '@domain/primitives/packaging-size.vo';

import { PackagingMapper } from '@application/mappers/packaging/packaging.mapper';
import { PackagingValidator } from '@application/validators/packaging/packaging.validator';

import {
  PACKAGING_SERVICE,
  type IPackagingService,
  type PackagingListOptionsDTO,
} from '@application/services/interfaces/packaging.service.interface';

import type {
  PackagingResponseDTO,
  PackagingListResponseDTO,
  PackagingStatsResponseDTO,
} from '@application/dtos/responses/packaging/index.js';

import type {
  CreatePackagingRequestDTO,
  UpdatePackagingRequestDTO,
  PackagingActionRequestDTO,
  DeactivatePackagingRequestDTO,
  DiscontinuePackagingRequestDTO,
  AddStockRequestDTO,
  ConsumeStockRequestDTO,
  UpdateSizeRequestDTO,
} from '@application/dtos/requests/packaging/index.js';

import {
  PackagingNotFoundApplicationError,
  PackagingByCodeNotFoundError,
  CreatePackagingError,
  PackagingAlreadyExistsError,
  PackagingOperationError,
} from '@application/errors/packaging.errors';

export interface IPackagingEventBridge {
  publishFromEntity(entity: PackagingEntity): Promise<void>;
}
export const PACKAGING_EVENT_BRIDGE = Symbol('PACKAGING_EVENT_BRIDGE');

@Injectable()
export class PackagingService implements IPackagingService {
  private readonly logger = new Logger(PackagingService.name);

  constructor(
    @Inject(PACKAGING_REPOSITORY)
    private readonly repo: PackagingRepository,
    @Inject(PACKAGING_EVENT_BRIDGE)
    private readonly eventBridge: IPackagingEventBridge,
  ) {}

  async create(dto: CreatePackagingRequestDTO, actorId: string): Promise<PackagingResponseDTO> {
    this.logger.log(`create packaging code=${dto.code}`);
    try {
      const v = PackagingValidator.validateCreate(dto);
      if (await this.repo.existsByCode(v.code)) throw new PackagingAlreadyExistsError(v.code);
      const now = new Date().toISOString();
      const size = PackagingSizeVO.create({
        lengthCm: v.lengthCm,
        widthCm: v.widthCm,
        heightCm: v.heightCm,
        maxWeightKg: v.maxWeightKg,
      });
      const entity = PackagingEntity.create({
        id: PackagingIdVO.create(randomUUID()),
        now,
        props: {
          name: v.name,
          code: v.code,
          type: PackagingTypeVO.create(v.type),
          material: PackagingMaterialVO.create(v.material),
          size,
          cost: v.cost,
          currency: v.currency,
          imageUrl: v.imageUrl,
          isFragile: v.isFragile,
          isTemperatureControlled: v.isTemperatureControlled,
          isRecyclable: v.isRecyclable,
          stock: v.stock,
          isDefault: v.isDefault ?? false,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return PackagingMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async update(dto: UpdatePackagingRequestDTO, actorId: string): Promise<PackagingResponseDTO> {
    const v = PackagingValidator.validateUpdate(dto);
    const entity = await this.loadEntity(v.packagingId);
    return this.persistAndPublish(entity);
  }
  async activate(dto: PackagingActionRequestDTO, actorId: string): Promise<PackagingResponseDTO> {
    const v = PackagingValidator.validateAction(dto);
    const entity = await this.loadEntity(v.packagingId);
    entity.activate();
    return this.persistAndPublish(entity);
  }
  async deactivate(dto: DeactivatePackagingRequestDTO, actorId: string): Promise<PackagingResponseDTO> {
    const v = PackagingValidator.validateDeactivate(dto);
    const entity = await this.loadEntity(v.packagingId);
    entity.deactivate(v.reason);
    return this.persistAndPublish(entity);
  }
  async discontinue(dto: DiscontinuePackagingRequestDTO, actorId: string): Promise<PackagingResponseDTO> {
    const v = PackagingValidator.validateDiscontinue(dto);
    const entity = await this.loadEntity(v.packagingId);
    entity.discontinue(v.reason);
    return this.persistAndPublish(entity);
  }
  async addStock(dto: AddStockRequestDTO, actorId: string): Promise<PackagingResponseDTO> {
    const v = PackagingValidator.validateAddStock(dto);
    const entity = await this.loadEntity(v.packagingId);
    entity.addStock(v.quantity);
    return this.persistAndPublish(entity);
  }
  async consumeStock(dto: ConsumeStockRequestDTO, actorId: string): Promise<PackagingResponseDTO> {
    const v = PackagingValidator.validateConsumeStock(dto);
    const entity = await this.loadEntity(v.packagingId);
    entity.consumeStock(v.quantity);
    return this.persistAndPublish(entity);
  }
  async updateSize(dto: UpdateSizeRequestDTO, actorId: string): Promise<PackagingResponseDTO> {
    const v = PackagingValidator.validateUpdateSize(dto);
    const entity = await this.loadEntity(v.packagingId);
    const size = PackagingSizeVO.create({
      lengthCm: v.lengthCm,
      widthCm: v.widthCm,
      heightCm: v.heightCm,
      maxWeightKg: v.maxWeightKg,
    });
    entity.updateSize(size);
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<PackagingResponseDTO> {
    const entity = await this.loadEntity(id);
    return PackagingMapper.toResponse(entity);
  }
  async getByCode(code: string): Promise<PackagingResponseDTO> {
    const entity = await this.repo.findByCode(code);
    if (!entity) throw new PackagingByCodeNotFoundError(code);
    return PackagingMapper.toResponse(entity);
  }
  async list(options: PackagingListOptionsDTO): Promise<PackagingListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return PackagingMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listUsable(): Promise<PackagingListResponseDTO> {
    const items = await this.repo.findUsable();
    return PackagingMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listOutOfStock(): Promise<PackagingListResponseDTO> {
    const items = await this.repo.findOutOfStock();
    return PackagingMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getDefault(): Promise<PackagingResponseDTO | null> {
    const entity = await this.repo.findDefault();
    return entity ? PackagingMapper.toResponse(entity) : null;
  }
  async getStats(): Promise<PackagingStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return PackagingMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<PackagingEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new PackagingNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: PackagingEntity): Promise<PackagingResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return PackagingMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreatePackagingError(err.message);
      return new PackagingOperationError(op, err.message);
    }
    return new PackagingOperationError(op, String(err));
  }
}
