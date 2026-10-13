/**
 * ProductPricingRuleService — orchestrates pricing-rule use cases
 * @module product-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  PRICING_RULE_REPOSITORY,
  type ProductPricingRuleRepository,
} from '../../../domain/repositories/product-pricing-rule.repository.interface.js';
import { ProductPricingRuleEntity } from '../../../domain/entities/product-pricing-rule.entity.js';
import { ProductPricingRuleVO } from '../../../domain/value-objects/composites/product-pricing-rule.vo.js';
import { PricingRuleIdVO } from '../../../domain/value-objects/primitives/pricing-rule-id.vo.js';
import { PricingRuleTypeVO } from '../../../domain/value-objects/primitives/pricing-rule-type.vo.js';
import { PricingRuleValueVO } from '../../../domain/value-objects/primitives/pricing-rule-value.vo.js';

import type {
  IProductPricingRuleService,
  PricingRuleResponseDTO,
  PricingRuleListResponseDTO,
} from '../interfaces/product-pricing-rule.service.interface.js';
import {
  PricingRuleCreateError,
} from '../../errors/pricing.errors.js';
import type {
  CreatePricingRuleRequestDTO,
  UpdatePricingRuleRequestDTO,
  DeletePricingRuleRequestDTO,
} from '../../dtos/requests/pricing/index.js';

@Injectable()
export class ProductPricingRuleApplicationService implements IProductPricingRuleService {
  private readonly logger = new Logger(ProductPricingRuleApplicationService.name);

  constructor(
    @Inject(PRICING_RULE_REPOSITORY)
    private readonly repo: ProductPricingRuleRepository,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async create(dto: CreatePricingRuleRequestDTO): Promise<PricingRuleResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    try {
      const vo = ProductPricingRuleVO.create({
        id: PricingRuleIdVO.create(id),
        name: dto.name,
        type: PricingRuleTypeVO.create(dto.type),
        ruleValue: PricingRuleValueVO.create({
          amount: dto.priceAdjustment,
          isPercent: dto.isPercent,
        }),
        conditions: dto.conditions,
        isActive: dto.isActive ?? true,
        priority: dto.priority ?? 0,
      });

      const entity = ProductPricingRuleEntity.create({ id, vo, now });
      const saved = await this.repo.save(entity);
      this.logger.log(`Pricing rule "${saved.name}" (${saved.id}) created`);
      return this.toRuleDTO(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PricingRuleCreateError(msg);
    }
  }

  async update(dto: UpdatePricingRuleRequestDTO): Promise<PricingRuleResponseDTO> {
    const entity = await this.load(dto.ruleId);
    const current = entity.vo.value;

    const nextVo = ProductPricingRuleVO.create({
      ...current,
      name: dto.name ?? current.name,
      conditions: dto.conditions ?? current.conditions,
      ruleValue:
        dto.priceAdjustment !== undefined
          ? PricingRuleValueVO.create({
              amount: dto.priceAdjustment,
              isPercent: dto.isPercent ?? current.ruleValue.isPercent,
            })
          : current.ruleValue,
      isActive: dto.isActive ?? current.isActive,
      priority: dto.priority ?? current.priority,
    });

    const updated = ProductPricingRuleEntity.reconstitute({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: new Date().toISOString(),
      vo: nextVo,
    });

    const saved = await this.repo.save(updated);
    this.logger.log(`Pricing rule "${saved.name}" (${saved.id}) updated`);
    return this.toRuleDTO(saved);
  }

  async delete(
    dto: DeletePricingRuleRequestDTO,
  ): Promise<{ readonly success: true; readonly ruleId: string }> {
    const entity = await this.load(dto.ruleId);
    await this.repo.softDelete(entity.id, dto.actorId);
    this.logger.log(`Pricing rule ${entity.id} deleted`);
    return { success: true, ruleId: entity.id };
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<PricingRuleResponseDTO> {
    const entity = await this.load(id);
    return this.toRuleDTO(entity);
  }

  async listActive(): Promise<readonly PricingRuleResponseDTO[]> {
    const entities = await this.repo.findActiveByPriority();
    return entities.map((e) => this.toRuleDTO(e));
  }

  async list(page = 1, limit = 20): Promise<PricingRuleListResponseDTO> {
    const result = await this.repo.findPaginated({ page, limit });
    return {
      items: result.items.map((e) => this.toRuleDTO(e)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: Math.ceil(result.total / result.limit),
    };
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<ProductPricingRuleEntity> {
    const vo = PricingRuleIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      throw new PricingRuleCreateError(`rule "${id}" not found`);
    }
    return entity;
  }

  private toRuleDTO(entity: ProductPricingRuleEntity): PricingRuleResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name,
      type: vo.type.value,
      conditions: vo.conditions,
      priceAdjustment: vo.ruleValue.amount,
      isPercent: vo.ruleValue.isPercent,
      priority: vo.priority,
      isActive: vo.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
