/**
 * VendorSubscriptionService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_SUBSCRIPTION_REPOSITORY,
  type VendorSubscriptionRepository,
} from '../../../domain/repositories/vendor-subscription.repository.interface.js';
import { VendorSubscriptionEntity } from '../../../domain/entities/vendor-subscription.entity.js';
import { SubscriptionPlanVO } from '../../../domain/value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionCycleVO } from '../../../domain/value-objects/primitives/subscription-cycle.vo.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../interfaces/vendor-subscription.service.interface.js';
import type { CreateSubscriptionRequestDto } from '../../dtos/requests/create-subscription.dto.js';
import type { ChangeSubscriptionPlanRequestDto } from '../../dtos/requests/change-subscription-plan.dto.js';
import type { CancelSubscriptionRequestDto } from '../../dtos/requests/cancel-subscription.dto.js';
import type { RenewSubscriptionRequestDto } from '../../dtos/requests/renew-subscription.dto.js';
import type {
  VendorSubscriptionResponseDto,
  VendorSubscriptionPublicDto,
} from '../../dtos/responses/vendor-subscription-response.dto.js';
import {
  SubscriptionNotFoundError,
  SubscriptionAlreadyExistsError,
} from '../../errors/subscription.errors.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';

@Injectable()
export class VendorSubscriptionService implements IVendorSubscriptionService {
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_REPOSITORY)
    private readonly repo: VendorSubscriptionRepository,
  ) {}

  async create(dto: CreateSubscriptionRequestDto, _actorId?: string): Promise<VendorSubscriptionResponseDto> {
    const existing = await this.repo.findByVendorId(dto.vendorId);
    if (existing && existing.isUsable()) {
      throw new SubscriptionAlreadyExistsError(dto.vendorId);
    }

    const now = new Date().toISOString();
    const entity = VendorSubscriptionEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId: dto.vendorId,
      plan: SubscriptionPlanVO.create(dto.plan),
      cycle: SubscriptionCycleVO.create(dto.cycle),
      price: dto.price,
      currency: dto.currency,
      trialDays: dto.trialDays,
      now,
    });

    if (dto.features) {
      for (const f of dto.features) entity.addFeature(f, now);
    }

    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async changePlan(dto: ChangeSubscriptionPlanRequestDto, _actorId?: string): Promise<VendorSubscriptionResponseDto> {
    const entity = await this.requireSubscription(dto.vendorId);
    entity.changePlan(
      SubscriptionPlanVO.create(dto.newPlan),
      dto.newPrice,
      dto.immediate,
      new Date().toISOString(),
    );
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async renew(dto: RenewSubscriptionRequestDto, _actorId?: string): Promise<VendorSubscriptionResponseDto> {
    const entity = await this.requireSubscription(dto.vendorId);
    entity.renew(new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async cancel(dto: CancelSubscriptionRequestDto, _actorId?: string): Promise<VendorSubscriptionResponseDto> {
    const entity = await this.requireSubscription(dto.vendorId);
    entity.cancel(dto.immediate, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async resume(vendorId: string, _actorId?: string): Promise<VendorSubscriptionResponseDto> {
    const entity = await this.requireSubscription(vendorId);
    entity.resume(new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async markPastDue(vendorId: string, _actorId?: string): Promise<VendorSubscriptionResponseDto> {
    const entity = await this.requireSubscription(vendorId);
    entity.markPastDue(new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async expire(vendorId: string, _actorId?: string): Promise<VendorSubscriptionResponseDto> {
    const entity = await this.requireSubscription(vendorId);
    entity.expire(new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async getByVendorId(vendorId: string): Promise<VendorSubscriptionResponseDto> {
    const entity = await this.requireSubscription(vendorId);
    return this.toResponse(entity);
  }

  async getPublic(vendorId: string): Promise<VendorSubscriptionPublicDto> {
    const entity = await this.requireSubscription(vendorId);
    return this.toPublic(entity);
  }

  private async requireSubscription(vendorId: string): Promise<VendorSubscriptionEntity> {
    const entity = await this.repo.findByVendorId(vendorId);
    if (!entity) throw new SubscriptionNotFoundError(vendorId);
    return entity;
  }

  private toResponse(entity: VendorSubscriptionEntity): VendorSubscriptionResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      plan: entity.plan.value as VendorSubscriptionResponseDto['plan'],
      status: entity.status.value as VendorSubscriptionResponseDto['status'],
      cycle: entity.cycle.value as VendorSubscriptionResponseDto['cycle'],
      price: entity.price,
      currency: entity.currency,
      startedAt: entity.startedAt,
      currentPeriodStart: entity.currentPeriodStart,
      currentPeriodEnd: entity.currentPeriodEnd,
      cancelAtPeriodEnd: entity.cancelAtPeriodEnd,
      autoRenew: entity.autoRenew,
      features: [],
      daysUntilRenewal: entity.daysUntilRenewal(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toPublic(entity: VendorSubscriptionEntity): VendorSubscriptionPublicDto {
    return {
      vendorId: entity.vendorId,
      plan: entity.plan.value as VendorSubscriptionPublicDto['plan'],
      status: entity.status.value as VendorSubscriptionPublicDto['status'],
      cycle: entity.cycle.value as VendorSubscriptionPublicDto['cycle'],
      price: entity.price,
      currency: entity.currency,
      currentPeriodEnd: entity.currentPeriodEnd,
    };
  }
}
