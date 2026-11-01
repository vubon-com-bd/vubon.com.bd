import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  SHIPPING_METHOD_REPOSITORY,
  type ShippingMethodRepository,
} from '@domain/repositories/shipping-method.repository.interface';
import { ShippingMethodEntity } from '@domain/entities/shipping-method.entity';
import { ShippingMethodIdVO } from '@domain/primitives/shipping-method-id.vo';
import { ShippingMethodTypeVO } from '@domain/primitives/shipping-method-type.vo';
import { ShippingRateTypeVO } from '@domain/primitives/shipping-rate-type.vo';

import { ShippingMethodMapper } from '@application/mappers/shipping-method/shipping-method.mapper';
import { ShippingMethodValidator } from '@application/validators/shipping-method/shipping-method.validator';

import {
  SHIPPING_METHOD_SERVICE,
  type IShippingMethodService,
  type ShippingMethodListOptionsDTO,
} from '@application/services/interfaces/shipping-method.service.interface';

import type {
  ShippingMethodResponseDTO,
  ShippingMethodListResponseDTO,
  ShippingMethodStatsResponseDTO,
} from '@application/dtos/responses/shipping-method/index.js';

import type {
  CreateShippingMethodRequestDTO,
  UpdateShippingMethodRequestDTO,
  ShippingMethodActionRequestDTO,
  DeactivateShippingMethodRequestDTO,
  SuspendShippingMethodRequestDTO,
} from '@application/dtos/requests/shipping-method/index.js';

import {
  ShippingMethodNotFoundApplicationError,
  ShippingMethodByCodeNotFoundError,
  CreateShippingMethodError,
  ShippingMethodAlreadyExistsError,
  ShippingMethodOperationError,
} from '@application/errors/shipping-method.errors';

export interface IShippingMethodEventBridge {
  publishFromEntity(entity: ShippingMethodEntity): Promise<void>;
}
export const SHIPPING_METHOD_EVENT_BRIDGE = Symbol('SHIPPING_METHOD_EVENT_BRIDGE');

@Injectable()
export class ShippingMethodService implements IShippingMethodService {
  private readonly logger = new Logger(ShippingMethodService.name);

  constructor(
    @Inject(SHIPPING_METHOD_REPOSITORY)
    private readonly repo: ShippingMethodRepository,
    @Inject(SHIPPING_METHOD_EVENT_BRIDGE)
    private readonly eventBridge: IShippingMethodEventBridge,
  ) {}

  async create(dto: CreateShippingMethodRequestDTO, actorId: string): Promise<ShippingMethodResponseDTO> {
    this.logger.log(`create shipping method code=${dto.code}`);
    try {
      const v = ShippingMethodValidator.validateCreate(dto);
      if (await this.repo.existsByCode(v.code)) throw new ShippingMethodAlreadyExistsError(v.code);
      const now = new Date().toISOString();
      const entity = ShippingMethodEntity.create({
        id: ShippingMethodIdVO.create(randomUUID()),
        now,
        props: {
          name: v.name,
          code: v.code,
          displayName: v.displayName,
          type: ShippingMethodTypeVO.create(v.type),
          rateType: ShippingRateTypeVO.create(v.rateType),
          baseCost: v.baseCost,
          freeAbove: v.freeAbove,
          currency: v.currency,
          minDeliveryDays: v.minDeliveryDays,
          maxDeliveryDays: v.maxDeliveryDays,
          maxWeightKg: v.maxWeightKg,
          maxDimensionsCm: v.maxDimensionsCm,
          codEnabled: v.codEnabled,
          trackingEnabled: v.trackingEnabled,
          coverageZones: v.coverageZones,
          couriers: v.couriers,
          isDefault: v.isDefault ?? false,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return ShippingMethodMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async update(dto: UpdateShippingMethodRequestDTO, actorId: string): Promise<ShippingMethodResponseDTO> {
    const v = ShippingMethodValidator.validateUpdate(dto);
    const entity = await this.loadEntity(v.methodId);
    if (v.baseCost !== undefined || v.freeAbove !== undefined || v.maxWeightKg !== undefined || v.maxDimensionsCm !== undefined) {
      entity.updateRate({
        baseCost: v.baseCost,
        freeAbove: v.freeAbove,
        maxWeightKg: v.maxWeightKg,
        maxDimensionsCm: v.maxDimensionsCm,
      });
    }
    return this.persistAndPublish(entity);
  }
  async activate(dto: ShippingMethodActionRequestDTO, actorId: string): Promise<ShippingMethodResponseDTO> {
    const v = ShippingMethodValidator.validateAction(dto);
    const entity = await this.loadEntity(v.methodId);
    entity.activate();
    return this.persistAndPublish(entity);
  }
  async deactivate(dto: DeactivateShippingMethodRequestDTO, actorId: string): Promise<ShippingMethodResponseDTO> {
    const v = ShippingMethodValidator.validateDeactivate(dto);
    const entity = await this.loadEntity(v.methodId);
    entity.deactivate(v.reason);
    return this.persistAndPublish(entity);
  }
  async suspend(dto: SuspendShippingMethodRequestDTO, actorId: string): Promise<ShippingMethodResponseDTO> {
    const v = ShippingMethodValidator.validateSuspend(dto);
    const entity = await this.loadEntity(v.methodId);
    entity.suspend(v.reason);
    return this.persistAndPublish(entity);
  }
  async updateRate(dto: any, actorId: string): Promise<ShippingMethodResponseDTO> {
    const entity = await this.loadEntity(dto.methodId);
    entity.updateRate(dto);
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<ShippingMethodResponseDTO> {
    const entity = await this.loadEntity(id);
    return ShippingMethodMapper.toResponse(entity);
  }
  async getByCode(code: string): Promise<ShippingMethodResponseDTO> {
    const entity = await this.repo.findByCode(code);
    if (!entity) throw new ShippingMethodByCodeNotFoundError(code);
    return ShippingMethodMapper.toResponse(entity);
  }
  async list(options: ShippingMethodListOptionsDTO): Promise<ShippingMethodListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return ShippingMethodMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listUsable(): Promise<ShippingMethodListResponseDTO> {
    const items = await this.repo.findUsable();
    return ShippingMethodMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByZone(zone: string): Promise<ShippingMethodListResponseDTO> {
    const items = await this.repo.findByZone(zone);
    return ShippingMethodMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getDefault(): Promise<ShippingMethodResponseDTO | null> {
    const entity = await this.repo.findDefault();
    return entity ? ShippingMethodMapper.toResponse(entity) : null;
  }
  async getStats(): Promise<ShippingMethodStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return ShippingMethodMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<ShippingMethodEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new ShippingMethodNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: ShippingMethodEntity): Promise<ShippingMethodResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return ShippingMethodMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateShippingMethodError(err.message);
      return new ShippingMethodOperationError(op, err.message);
    }
    return new ShippingMethodOperationError(op, String(err));
  }
}
