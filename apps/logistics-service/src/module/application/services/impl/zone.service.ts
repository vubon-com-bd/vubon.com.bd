import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  ZONE_REPOSITORY,
  type ZoneRepository,
} from '@domain/repositories/zone.repository.interface';
import { ZoneEntity } from '@domain/entities/zone.entity';
import { ZoneIdVO } from '@domain/primitives/zone-id.vo';
import { ZoneNameVO } from '@domain/primitives/zone-name.vo';
import { ZoneTypeVO } from '@domain/primitives/zone-type.vo';
import { ZonePricingTypeVO } from '@domain/primitives/zone-pricing-type.vo';

import { ZoneMapper } from '@application/mappers/zone/zone.mapper';
import { ZoneValidator } from '@application/validators/zone/zone.validator';

import {
  ZONE_SERVICE,
  type IZoneService,
  type ZoneListOptionsDTO,
} from '@application/services/interfaces/zone.service.interface';

import type {
  ZoneResponseDTO,
  ZoneListResponseDTO,
  ZoneStatsResponseDTO,
} from '@application/dtos/responses/zone/index.js';

import type {
  CreateZoneRequestDTO,
  UpdateZoneRequestDTO,
  ZoneActionRequestDTO,
  DeactivateZoneRequestDTO,
  RestrictZoneRequestDTO,
  SuspendZoneRequestDTO,
  ClassifyPostalCodeRequestDTO,
} from '@application/dtos/requests/zone/index.js';

import {
  ZoneNotFoundApplicationError,
  ZoneByCodeNotFoundError,
  CreateZoneError,
  ZoneAlreadyExistsError,
  ZoneOperationError,
} from '@application/errors/zone.errors';

export interface IZoneEventBridge {
  publishFromEntity(entity: ZoneEntity): Promise<void>;
}
export const ZONE_EVENT_BRIDGE = Symbol('ZONE_EVENT_BRIDGE');

@Injectable()
export class ZoneService implements IZoneService {
  private readonly logger = new Logger(ZoneService.name);

  constructor(
    @Inject(ZONE_REPOSITORY)
    private readonly repo: ZoneRepository,
    @Inject(ZONE_EVENT_BRIDGE)
    private readonly eventBridge: IZoneEventBridge,
  ) {}

  async create(dto: CreateZoneRequestDTO, actorId: string): Promise<ZoneResponseDTO> {
    this.logger.log(`create zone code=${dto.code}`);
    try {
      const v = ZoneValidator.validateCreate(dto);
      if (await this.repo.existsByCode(v.code)) throw new ZoneAlreadyExistsError(v.code);
      const now = new Date().toISOString();
      const entity = ZoneEntity.create({
        id: ZoneIdVO.create(randomUUID()),
        now,
        props: {
          code: v.code,
          name: ZoneNameVO.create(v.name),
          type: ZoneTypeVO.create(v.type),
          pricingType: ZonePricingTypeVO.create(v.pricingType),
          parentId: v.parentId,
          postalCodes: v.postalCodes,
          districts: v.districts,
          divisions: v.divisions,
          shippingCost: v.shippingCost,
          freeAbove: v.freeAbove,
          currency: v.currency,
          minDeliveryDays: v.minDeliveryDays,
          maxDeliveryDays: v.maxDeliveryDays,
          codEnabled: v.codEnabled,
          codCharge: v.codCharge,
          codMaxAmount: v.codMaxAmount,
          isRemote: v.isRemote,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return ZoneMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async update(dto: UpdateZoneRequestDTO, actorId: string): Promise<ZoneResponseDTO> {
    const v = ZoneValidator.validateUpdate(dto);
    const entity = await this.loadEntity(v.zoneId);
    if (v.shippingCost !== undefined || v.freeAbove !== undefined || v.codEnabled !== undefined || v.codCharge !== undefined || v.codMaxAmount !== undefined) {
      entity.updatePricing({
        shippingCost: v.shippingCost,
        freeAbove: v.freeAbove,
        codEnabled: v.codEnabled,
        codCharge: v.codCharge,
        codMaxAmount: v.codMaxAmount,
      });
    }
    if (v.postalCodes !== undefined || v.districts !== undefined || v.divisions !== undefined) {
      entity.updateCoverage({
        postalCodes: v.postalCodes,
        districts: v.districts,
        divisions: v.divisions,
      });
    }
    return this.persistAndPublish(entity);
  }

  async activate(dto: ZoneActionRequestDTO, actorId: string): Promise<ZoneResponseDTO> {
    const v = ZoneValidator.validateAction(dto);
    const entity = await this.loadEntity(v.zoneId);
    entity.activate();
    return this.persistAndPublish(entity);
  }
  async deactivate(dto: DeactivateZoneRequestDTO, actorId: string): Promise<ZoneResponseDTO> {
    const v = ZoneValidator.validateDeactivate(dto);
    const entity = await this.loadEntity(v.zoneId);
    entity.deactivate(v.reason);
    return this.persistAndPublish(entity);
  }
  async restrict(dto: RestrictZoneRequestDTO, actorId: string): Promise<ZoneResponseDTO> {
    const v = ZoneValidator.validateRestrict(dto);
    const entity = await this.loadEntity(v.zoneId);
    entity.restrict(v.reason);
    return this.persistAndPublish(entity);
  }
  async suspend(dto: SuspendZoneRequestDTO, actorId: string): Promise<ZoneResponseDTO> {
    const v = ZoneValidator.validateSuspend(dto);
    const entity = await this.loadEntity(v.zoneId);
    entity.suspend(v.reason);
    return this.persistAndPublish(entity);
  }
  async archive(dto: ZoneActionRequestDTO, actorId: string): Promise<ZoneResponseDTO> {
    const v = ZoneValidator.validateAction(dto);
    const entity = await this.loadEntity(v.zoneId);
    entity.archive();
    return this.persistAndPublish(entity);
  }
  async updatePricing(dto: any, actorId: string): Promise<ZoneResponseDTO> {
    const entity = await this.loadEntity(dto.zoneId);
    entity.updatePricing(dto);
    return this.persistAndPublish(entity);
  }
  async updateCoverage(dto: any, actorId: string): Promise<ZoneResponseDTO> {
    const entity = await this.loadEntity(dto.zoneId);
    entity.updateCoverage(dto);
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<ZoneResponseDTO> {
    const entity = await this.loadEntity(id);
    return ZoneMapper.toResponse(entity);
  }
  async getByCode(code: string): Promise<ZoneResponseDTO> {
    const entity = await this.repo.findByCode(code);
    if (!entity) throw new ZoneByCodeNotFoundError(code);
    return ZoneMapper.toResponse(entity);
  }
  async list(options: ZoneListOptionsDTO): Promise<ZoneListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return ZoneMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listActive(): Promise<ZoneListResponseDTO> {
    const items = await this.repo.findActive();
    return ZoneMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByParent(parentId: string): Promise<ZoneListResponseDTO> {
    const items = await this.repo.findByParentId(parentId);
    return ZoneMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async classify(dto: ClassifyPostalCodeRequestDTO): Promise<ZoneResponseDTO | null> {
    let zones: readonly ZoneEntity[] = [];
    if (dto.postalCode) zones = await this.repo.findByPostalCode(dto.postalCode);
    else if (dto.district) zones = await this.repo.findByDistrict(dto.district);
    else if (dto.division) zones = await this.repo.findByDivision(dto.division);
    if (zones.length === 0) return null;
    const active = zones.find((z) => z.isUsable()) ?? zones[0];
    return ZoneMapper.toResponse(active);
  }
  async getStats(): Promise<ZoneStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return ZoneMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<ZoneEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new ZoneNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: ZoneEntity): Promise<ZoneResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return ZoneMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateZoneError(err.message);
      return new ZoneOperationError(op, err.message);
    }
    return new ZoneOperationError(op, String(err));
  }
}
