/**
 * VendorSubscriptionService — subscription lifecycle
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_SUBSCRIPTION_REPOSITORY,
  type VendorSubscriptionRepository,
  type VendorSubscriptionListFilter,
} from '../../../domain/repositories/vendor-subscription.repository.interface.js';
import { VendorSubscriptionEntity } from '../../../domain/entities/vendor-subscription.entity.js';
import { VendorSubscriptionVO } from '../../../domain/value-objects/composites/vendor-subscription.vo.js';
import { SubscriptionIdVO } from '../../../domain/value-objects/primitives/subscription-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { SubscriptionPlanVO } from '../../../domain/value-objects/primitives/subscription-plan.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { SubscriptionMapper } from '../../mappers/subscription.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import {
  SubscriptionAlreadyActiveApplicationError,
  SubscriptionDowngradeNotAllowedApplicationError,
} from '../../errors/subscription.errors.js';
import type {
  CreateSubscriptionRequestDTO,
  UpgradeSubscriptionRequestDTO,
  DowngradeSubscriptionRequestDTO,
  CancelSubscriptionRequestDTO,
} from '../../dtos/requests/subscription/index.js';
import type {
  SubscriptionResponseDTO,
  SubscriptionPublicResponseDTO,
  SubscriptionSummaryResponseDTO,
  SubscriptionStatsResponseDTO,
  SubscriptionPlanListResponseDTO,
} from '../../dtos/responses/subscription-response.dto.js';
import type {
  IVendorSubscriptionService,
  SubscriptionListOptionsDTO,
} from '../interfaces/vendor-subscription.service.interface.js';

// ─── Plan price mapping (simplified) ──────
const PLAN_PRICES: Record<string, { monthly: number; yearly: number }> = {
  free: { monthly: 0, yearly: 0 },
  basic: { monthly: 990, yearly: 9900 },
  standard: { monthly: 2990, yearly: 29900 },
  premium: { monthly: 9990, yearly: 99900 },
  enterprise: { monthly: 29990, yearly: 299900 },
};

@Injectable()
export class VendorSubscriptionService implements IVendorSubscriptionService {
  private readonly logger = new Logger(VendorSubscriptionService.name);

  constructor(
    @Inject(VENDOR_SUBSCRIPTION_REPOSITORY)
    private readonly repo: VendorSubscriptionRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async create(dto: CreateSubscriptionRequestDTO, _actorId: string): Promise<SubscriptionResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    // ─── Duplicate active check ───
    const active = await this.repo.findActiveByVendor(VendorIdVO.create(dto.vendorId));
    if (active) {
      throw new SubscriptionAlreadyActiveApplicationError(dto.vendorId);
    }

    const planVO = SubscriptionPlanVO.create(dto.plan);
    const price = this.getPlanPrice(dto.plan, dto.cycle);
    const periodEnd = this.computePeriodEnd(now, dto.cycle);
    const trialEndsAt = dto.startTrial
      ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      : undefined;

    const vo = VendorSubscriptionVO.create({
      id: SubscriptionIdVO.create(id),
      vendorId: VendorIdVO.create(dto.vendorId),
      plan: planVO,
      status: dto.startTrial ? 'trial' : 'active',
      cycle: dto.cycle,
      priceAmount: price,
      currency: 'BDT',
      startedAt: now,
      trialEndsAt,
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
      autoRenew: true,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorSubscriptionEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Subscription ${saved.id} created for vendor ${dto.vendorId} (plan=${dto.plan})`);
    return SubscriptionMapper.toResponse(saved as never);
  }

  async upgrade(dto: UpgradeSubscriptionRequestDTO, _actorId: string): Promise<SubscriptionResponseDTO> {
    const entity = await this.load(dto.subscriptionId);
    const targetPlan = SubscriptionPlanVO.create(dto.plan);
    const newPrice = this.getPlanPrice(dto.plan, entity.cycle);
    entity.upgradeToPlan(targetPlan, newPrice);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Subscription ${saved.id} upgraded to ${dto.plan}`);
    return SubscriptionMapper.toResponse(saved as never);
  }

  async downgrade(dto: DowngradeSubscriptionRequestDTO, _actorId: string): Promise<SubscriptionResponseDTO> {
    const entity = await this.load(dto.subscriptionId);
    const targetPlan = SubscriptionPlanVO.create(dto.plan);
    if (!entity.canDowngradeTo(targetPlan)) {
      throw new SubscriptionDowngradeNotAllowedApplicationError(
        entity.vendorId.value,
        entity.plan.value,
        dto.plan,
      );
    }
    const newPrice = this.getPlanPrice(dto.plan, entity.cycle);
    entity.downgradeToPlan(targetPlan, newPrice);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Subscription ${saved.id} downgraded to ${dto.plan}`);
    return SubscriptionMapper.toResponse(saved as never);
  }

  async cancel(dto: CancelSubscriptionRequestDTO, _actorId: string): Promise<SubscriptionResponseDTO> {
    const entity = await this.load(dto.subscriptionId);
    entity.cancel('system', dto.reason, dto.cancelAtPeriodEnd ?? true);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Subscription ${saved.id} cancelled`);
    return SubscriptionMapper.toResponse(saved as never);
  }

  async resume(subscriptionId: string, _actorId: string): Promise<SubscriptionResponseDTO> {
    const entity = await this.load(subscriptionId);
    entity.resume();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return SubscriptionMapper.toResponse(saved as never);
  }

  async renew(subscriptionId: string, _actorId: string): Promise<SubscriptionResponseDTO> {
    const entity = await this.load(subscriptionId);
    const now = new Date().toISOString();
    const newPeriodEnd = this.computePeriodEnd(now, entity.cycle);
    entity.renew(newPeriodEnd, entity.priceAmount);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return SubscriptionMapper.toResponse(saved as never);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<SubscriptionResponseDTO> {
    const entity = await this.load(id);
    return SubscriptionMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<SubscriptionPublicResponseDTO> {
    const entity = await this.load(id);
    return SubscriptionMapper.toPublicResponse(entity);
  }

  async getActive(vendorId: string): Promise<SubscriptionResponseDTO | null> {
    const entity = await this.repo.findActiveByVendor(VendorIdVO.create(vendorId));
    return entity ? SubscriptionMapper.toResponse(entity as never) : null;
  }

  async listByVendor(vendorId: string, _options?: SubscriptionListOptionsDTO): Promise<readonly SubscriptionSummaryResponseDTO[]> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return entities.map((e) => SubscriptionMapper.toSummary(e as never));
  }

  async listPlans(): Promise<SubscriptionPlanListResponseDTO> {
    const plans = ['free', 'basic', 'standard', 'premium', 'enterprise'].map((plan) => ({
      plan,
      displayName: plan.charAt(0).toUpperCase() + plan.slice(1),
      priceMonthly: PLAN_PRICES[plan]?.monthly ?? 0,
      priceYearly: PLAN_PRICES[plan]?.yearly ?? 0,
      currency: 'BDT',
      features: [],
      maxProducts: null as number | null,
      maxTeamMembers: 5,
    }));
    return { plans };
  }

  async getStats(vendorId?: string): Promise<SubscriptionStatsResponseDTO> {
    const stats = await this.repo.getStats(vendorId);
    return {
      total: stats.total,
      active: stats.active,
      trial: stats.trial,
      pastDue: stats.pastDue,
      cancelled: stats.cancelled,
      expired: stats.expired,
      byPlan: stats.byPlan,
      monthlyRevenue: stats.monthlyRevenue,
    };
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<VendorSubscriptionEntity> {
    const vo = SubscriptionIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return entity;
  }

  private getPlanPrice(plan: string, cycle: string): number {
    const prices = PLAN_PRICES[plan];
    if (!prices) return 0;
    if (cycle === 'yearly' || cycle === 'lifetime') return prices.yearly;
    if (cycle === 'monthly') return prices.monthly;
    if (cycle === 'quarterly') return prices.monthly * 3;
    if (cycle === 'half_yearly') return prices.monthly * 6;
    return prices.monthly;
  }

  private computePeriodEnd(fromISO: string, cycle: string): string {
    const d = new Date(fromISO);
    if (cycle === 'monthly') d.setMonth(d.getMonth() + 1);
    else if (cycle === 'quarterly') d.setMonth(d.getMonth() + 3);
    else if (cycle === 'half_yearly') d.setMonth(d.getMonth() + 6);
    else if (cycle === 'yearly') d.setFullYear(d.getFullYear() + 1);
    else if (cycle === 'lifetime') d.setFullYear(d.getFullYear() + 100);
    return d.toISOString();
  }
}
