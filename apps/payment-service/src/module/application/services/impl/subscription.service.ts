/**
 * SubscriptionService
 * @module payment-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type {
  ISubscriptionService,
  SubscriptionListOptionsDTO,
} from '@application/services/interfaces/subscription.service.interface.js';
import {
  SUBSCRIPTION_REPOSITORY,
  type SubscriptionRepository,
} from '@domain/repositories/subscription.repository.interface.js';
import { SubscriptionEntity } from '@domain/entities/subscription.entity.js';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { SubscriptionLifecycleService } from '@domain/services/subscription-lifecycle.service.js';

import type {
  CreateSubscriptionRequestDTO,
  UpgradeSubscriptionRequestDTO,
  DowngradeSubscriptionRequestDTO,
  PauseSubscriptionRequestDTO,
  CancelSubscriptionRequestDTO,
} from '@application/dtos/requests/subscription/index.js';
import type {
  SubscriptionResponseDTO,
  SubscriptionListResponseDTO,
  SubscriptionStatsResponseDTO,
} from '@application/dtos/responses/subscription-response.dto.js';

@Injectable()
export class SubscriptionService implements ISubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly repo: SubscriptionRepository,
  ) {}

  async create(
    dto: CreateSubscriptionRequestDTO,
    userId: string,
  ): Promise<SubscriptionResponseDTO> {
    const now = new Date();
    const nowIso = now.toISOString();
    const id = randomUUID();
    const frequency = RecurringFrequencyVO.create(dto.interval, dto.intervalCount);
    const periodEnd = new Date(now.getTime());
    if (frequency.interval === 'monthly') periodEnd.setMonth(periodEnd.getMonth() + 1);
    else if (frequency.interval === 'yearly') periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    else periodEnd.setDate(periodEnd.getDate() + frequency.toDays());

    const entity = SubscriptionEntity.create({
      id: SubscriptionIdVO.create(id),
      now: nowIso,
      props: {
        userId: UserIdVO.create(userId),
        plan: SubscriptionPlanVO.create(dto.plan),
        frequency,
        price: PaymentAmountVO.create(dto.price, dto.currency),
        startedAt: nowIso,
        currentPeriodStart: nowIso,
        currentPeriodEnd: periodEnd.toISOString(),
      },
    });
    const saved = await this.repo.save(entity);
    this.logger.log(`Subscription ${saved.id} created for ${userId}`);
    return this.toResponse(saved);
  }

  async upgrade(
    dto: UpgradeSubscriptionRequestDTO,
    userId: string,
  ): Promise<SubscriptionResponseDTO> {
    const entity = await this.load(dto.subscriptionId);
    (entity as unknown as { _plan: SubscriptionPlanVO })._plan = SubscriptionPlanVO.create(dto.newPlan);
    const saved = await this.repo.save(entity);
    this.logger.log(`Subscription ${saved.id} upgraded to ${dto.newPlan} by ${userId}`);
    return this.toResponse(saved);
  }

  async downgrade(
    dto: DowngradeSubscriptionRequestDTO,
    userId: string,
  ): Promise<SubscriptionResponseDTO> {
    const entity = await this.load(dto.subscriptionId);
    (entity as unknown as { _plan: SubscriptionPlanVO })._plan = SubscriptionPlanVO.create(dto.newPlan);
    const saved = await this.repo.save(entity);
    this.logger.log(`Subscription ${saved.id} downgraded to ${dto.newPlan} by ${userId}`);
    return this.toResponse(saved);
  }

  async pause(
    dto: PauseSubscriptionRequestDTO,
    userId: string,
  ): Promise<SubscriptionResponseDTO> {
    const entity = await this.load(dto.subscriptionId);
    entity.pause();
    const saved = await this.repo.save(entity);
    this.logger.log(`Subscription ${saved.id} paused by ${userId}`);
    return this.toResponse(saved);
  }

  async cancel(
    dto: CancelSubscriptionRequestDTO,
    userId: string,
  ): Promise<SubscriptionResponseDTO> {
    const entity = await this.load(dto.subscriptionId);
    entity.cancel(dto.cancelAtPeriodEnd);
    const saved = await this.repo.save(entity);
    this.logger.log(`Subscription ${saved.id} cancelled by ${userId}`);
    return this.toResponse(saved);
  }

  async getById(id: string): Promise<SubscriptionResponseDTO> {
    return this.toResponse(await this.load(id));
  }

  async listByUser(userId: string): Promise<readonly SubscriptionResponseDTO[]> {
    const entities = await this.repo.findByUser(userId);
    return entities.map((e) => this.toResponse(e));
  }

  async list(options: SubscriptionListOptionsDTO): Promise<SubscriptionListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return {
      items: result.items.map((e) => ({
        id: e.id,
        status: e.status.value,
        plan: e.plan.value,
        price: e.price.amount,
        currency: e.price.currency,
        currentPeriodEnd: e.currentPeriodEnd,
      })),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async getStats(userId?: string): Promise<SubscriptionStatsResponseDTO> {
    const stats = await this.repo.getStats(userId);
    return {
      total: stats.total,
      active: stats.active,
      trialing: stats.trialing,
      cancelled: stats.cancelled,
      totalMrr: stats.totalMrr,
      currency: stats.currency,
      byPlan: stats.byPlan,
    };
  }

  private async load(id: string): Promise<SubscriptionEntity> {
    const vo = SubscriptionIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new Error(`Subscription "${id}" not found`);
    return entity;
  }

  private toResponse(e: SubscriptionEntity): SubscriptionResponseDTO {
    void SubscriptionLifecycleService; // referenced for future use
    return {
      id: e.id,
      userId: e.userId.value,
      status: e.status.value,
      plan: e.plan.value,
      interval: e.frequency.interval,
      intervalCount: e.frequency.intervalCount,
      price: e.price.amount,
      currency: e.price.currency,
      startedAt: e.startedAt,
      currentPeriodStart: e.currentPeriodStart,
      currentPeriodEnd: e.currentPeriodEnd,
      trialEndsAt: e.trialEndsAt,
      cancelledAt: e.cancelledAt,
      cancelAtPeriodEnd: e.cancelAtPeriodEnd,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
}
