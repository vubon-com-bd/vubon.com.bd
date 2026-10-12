/**
 * ShippingMethodService — orchestrates shipping method + cost calculation
 * @module logistics-service/application/services/impl
 *
 * Uses domain:
 *  - ShippingMethodEntity (rate rules, status machine)
 *  - ShippingCostCalculatorService (breakdown with remote/COD/free-shipping)
 *  - ZoneRepository (to look up zone for calc)
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { IShippingMethodService, ShippingMethodListOptionsDTO } from '../interfaces/shipping-method.service.interface.js';
import {
  SHIPPING_METHOD_REPOSITORY, type ShippingMethodRepository,
} from '../../../domain/repositories/shipping-method.repository.interface.js';
import { ZONE_REPOSITORY, type ZoneRepository } from '../../../domain/repositories/zone.repository.interface.js';

import { ShippingMethodEntity } from '../../../domain/entities/shipping-method.entity.js';
import { ShippingMethodIdVO } from '../../../domain/value-objects/primitives/shipping-method-id.vo.js';
import { ShippingMethodValueVO } from '../../../domain/value-objects/primitives/shipping-method-value.vo.js';
import { ShippingRateTypeVO } from '../../../domain/value-objects/primitives/shipping-rate-type.vo.js';
import { ShippingCostVO } from '../../../domain/value-objects/primitives/shipping-cost.vo.js';
import { WeightKgVO } from '../../../domain/value-objects/primitives/weight-kg.vo.js';
import { ZoneIdVO } from '../../../domain/value-objects/primitives/zone-id.vo.js';
import { ShipmentDimensionsVO } from '../../../domain/value-objects/composites/shipment-dimensions.vo.js';

import { ShippingCostCalculatorService } from '../../../domain/services/shipping-cost-calculator.service.js';
import { ShippingMethodMapper } from '../../mappers/shipping-method.mapper.js';
import {
  ShippingMethodNotFoundApplicationError,
  ShippingMethodOperationFailedApplicationError,
} from '../../errors/shipping-method.errors.js';

import type {
  CreateShippingMethodRequestDTO, UpdateShippingMethodRequestDTO,
  ActivateShippingMethodRequestDTO, DeactivateShippingMethodRequestDTO,
  SuspendShippingMethodRequestDTO, CalculateShippingRequestDTO,
} from '../../dtos/requests/shipping-method/shipping-method.dto.js';
import type {
  ShippingMethodResponseDTO, CalculateShippingResponseDTO, ShippingMethodListResponseDTO,
} from '../../dtos/responses/shipping-method/shipping-method-response.dto.js';

@Injectable()
export class ShippingMethodService implements IShippingMethodService {
  private readonly logger = new Logger(ShippingMethodService.name);

  constructor(
    @Inject(SHIPPING_METHOD_REPOSITORY) private readonly repo: ShippingMethodRepository,
    @Inject(ZONE_REPOSITORY) private readonly zoneRepo: ZoneRepository,
  ) {}

  async create(dto: CreateShippingMethodRequestDTO, actorId?: string): Promise<ShippingMethodResponseDTO> {
    const now = new Date().toISOString();
    const codeVO = ShippingMethodValueVO.create(dto.code);
    if (await this.repo.existsByCode(codeVO)) {
      throw new ShippingMethodOperationFailedApplicationError('create', `method code exists: ${dto.code}`);
    }
    const id = randomUUID();
    let entity: ShippingMethodEntity;
    try {
      entity = ShippingMethodEntity.create({
        id, now,
        props: {
          name: dto.name,
          code: codeVO,
          displayName: dto.displayName,
          rateType: ShippingRateTypeVO.create(dto.rateType),
          baseCost: ShippingCostVO.create(dto.baseCost, dto.currency),
          freeAbove: dto.freeAbove !== undefined ? ShippingCostVO.create(dto.freeAbove, dto.currency) : undefined,
          minDeliveryDays: dto.minDeliveryDays,
          maxDeliveryDays: dto.maxDeliveryDays,
          maxWeightKg: dto.maxWeightKg !== undefined ? WeightKgVO.create(dto.maxWeightKg) : undefined,
          maxDimensionsCm: dto.maxDimensionsCm,
          codEnabled: dto.codEnabled,
          trackingEnabled: dto.trackingEnabled,
          coverageZones: dto.coverageZones ?? [],
          couriers: dto.couriers ?? [],
          isDefault: dto.isDefault ?? false,
        },
      });
    } catch (e) {
      throw new ShippingMethodOperationFailedApplicationError('create', e instanceof Error ? e.message : 'unknown');
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`ShippingMethod ${saved.id} created by ${actorId ?? 'system'}`);
    return ShippingMethodMapper.toResponse(saved);
  }

  async update(dto: UpdateShippingMethodRequestDTO, actorId?: string): Promise<ShippingMethodResponseDTO> {
    const entity = await this.load(dto.methodId);
    if (dto.baseCost !== undefined && dto.currency) {
      entity.updateBaseCost(ShippingCostVO.create(dto.baseCost, dto.currency));
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`ShippingMethod ${saved.id} updated by ${actorId ?? 'system'}`);
    return ShippingMethodMapper.toResponse(saved);
  }

  async activate(dto: ActivateShippingMethodRequestDTO, actorId?: string): Promise<ShippingMethodResponseDTO> {
    const entity = await this.load(dto.methodId);
    entity.activate();
    const saved = await this.repo.save(entity);
    this.logger.log(`ShippingMethod ${saved.id} activated by ${actorId ?? 'system'}`);
    return ShippingMethodMapper.toResponse(saved);
  }

  async deactivate(dto: DeactivateShippingMethodRequestDTO, actorId?: string): Promise<ShippingMethodResponseDTO> {
    const entity = await this.load(dto.methodId);
    entity.deactivate(dto.reason);
    const saved = await this.repo.save(entity);
    this.logger.log(`ShippingMethod ${saved.id} deactivated by ${actorId ?? 'system'}`);
    return ShippingMethodMapper.toResponse(saved);
  }

  async suspend(dto: SuspendShippingMethodRequestDTO, actorId?: string): Promise<ShippingMethodResponseDTO> {
    const entity = await this.load(dto.methodId);
    entity.suspend(dto.reason);
    const saved = await this.repo.save(entity);
    this.logger.warn(`ShippingMethod ${saved.id} suspended by ${actorId ?? 'system'}: ${dto.reason}`);
    return ShippingMethodMapper.toResponse(saved);
  }

  async calculateShipping(dto: CalculateShippingRequestDTO): Promise<CalculateShippingResponseDTO> {
    const method = await this.load(dto.methodId);
    if (!method.isSelectable()) {
      throw new ShippingMethodOperationFailedApplicationError(
        'calculateShipping',
        `method not selectable (status: ${method.status.value})`,
        dto.methodId,
      );
    }
    // Use entity baseCost currency for zone lookup (approximation: match by currency)
    const zone = await this.zoneRepo.findForAddress({});
    if (!zone) {
      throw new ShippingMethodOperationFailedApplicationError(
        'calculateShipping', 'no zone matched', dto.methodId,
      );
    }
    const dimensions = ShipmentDimensionsVO.create({
      actualWeightKg: dto.weightKg,
    });
    const breakdown = ShippingCostCalculatorService.calculate({
      method,
      zone,
      dimensions,
      orderValue: dto.orderValue,
      isCOD: false,
      currency: method.baseCost.currency,
    });
    return {
      baseCost: breakdown.baseCost,
      weightSurcharge: breakdown.weightSurcharge,
      zoneMultiplier: breakdown.zoneMultiplier,
      remoteSurcharge: breakdown.remoteSurcharge,
      codCharge: breakdown.codCharge,
      discount: breakdown.discount,
      total: breakdown.total.amount,
      currency: breakdown.currency,
      isFreeShipping: breakdown.isFreeShipping,
    };
  }

  async getById(methodId: string): Promise<ShippingMethodResponseDTO> {
    return ShippingMethodMapper.toResponse(await this.load(methodId));
  }

  async list(options: ShippingMethodListOptionsDTO): Promise<ShippingMethodListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return ShippingMethodMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  async getDefault(): Promise<ShippingMethodResponseDTO | null> {
    const m = await this.repo.findDefault();
    return m ? ShippingMethodMapper.toResponse(m) : null;
  }

  private async load(id: string): Promise<ShippingMethodEntity> {
    const vo = ShippingMethodIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new ShippingMethodNotFoundApplicationError(id);
    return entity;
  }
}
