/**
 * DeliveryService — delivery attempt tracking + retry coordination
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { NOTIFICATION_LIMIT } from '@vubon/shared-constants/platform/notification';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../../domain/repositories/notification.repository.interface.js';
import { NotificationEntity } from '../../../domain/entities/notification.entity.js';

import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo.js';
import { DeliveryFailureReasonVO } from '../../../domain/value-objects/primitives/delivery-failure-reason.vo.js';

import { NotificationRetryPolicyService } from '../../../domain/services/notification-retry-policy.service.js';

import { DeliveryMapper } from '../../mappers/delivery.mapper.js';
import { NotificationNotFoundApplicationError } from '../../errors/notification.errors.js';
import { DeliveryRetryNotAllowedError } from '../../errors/webhook.errors.js';

import type {
  IDeliveryService,
  DeliveryListOptionsDTO,
} from '../interfaces/delivery.service.interface.js';
import type {
  DeliveryResponseDTO,
  DeliveryRetryResponseDTO,
  DeliveryListResponseDTO,
} from '../../dtos/responses/delivery-response.dto.js';

@Injectable()
export class DeliveryService implements IDeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async getByNotification(notificationId: string): Promise<DeliveryResponseDTO> {
    const entity = await this.load(notificationId);
    return DeliveryMapper.toResponse(entity);
  }

  async list(options: DeliveryListOptionsDTO): Promise<DeliveryListResponseDTO> {
    const result = await this.notificationRepo.findPaginated({
      page: options.page,
      limit: options.limit,
      filter: {
        channel: options.channel,
        status: options.status,
        fromDate: options.fromDate,
        toDate: options.toDate,
      },
    });
    const items = result.items.map((e) => DeliveryMapper.toResponse(e));
    return {
      items,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async retry(notificationId: string, actorId?: string): Promise<DeliveryRetryResponseDTO> {
    const entity = await this.load(notificationId);
    if (!entity.isFailed()) {
      throw new DeliveryRetryNotAllowedError(
        notificationId,
        `status "${entity.status.value}" is not failed`,
      );
    }
    if (entity.retryAttempts >= NOTIFICATION_LIMIT.RETRY_ATTEMPTS) {
      throw new DeliveryRetryNotAllowedError(
        notificationId,
        `retry limit reached (${entity.retryAttempts}/${NOTIFICATION_LIMIT.RETRY_ATTEMPTS})`,
      );
    }

    const failureReason = entity.failureReason ?? DeliveryFailureReasonVO.unknown();
    const decision = NotificationRetryPolicyService.decide({
      channel: entity.channel,
      attempt: entity.retryAttempts,
      failureReason,
      lastAttemptAt: entity.failedAt ?? new Date().toISOString(),
    });

    if (!decision.shouldRetry) {
      throw new DeliveryRetryNotAllowedError(notificationId, decision.reason ?? 'retry not allowed');
    }

    entity.retry();
    const saved = await this.notificationRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Retry scheduled for ${saved.id} at ${decision.nextAttemptAt}`);
    void actorId;

    return DeliveryMapper.toRetryResponse({
      notificationId: saved.id,
      scheduled: true,
      attempt: saved.retryAttempts,
      nextAttemptAt: decision.nextAttemptAt,
      delayMs: decision.delayMs,
    });
  }

  async recordAttempt(input: {
    notificationId: string;
    channel: string;
    provider: string;
    attempt: number;
    success: boolean;
    providerMessageId?: string;
    failureReason?: string;
    failureCode?: string;
    durationMs?: number;
  }): Promise<DeliveryResponseDTO> {
    const entity = await this.load(input.notificationId);
    const now = new Date().toISOString();

    if (input.success) {
      entity.startSending(input.provider, now);
      entity.markSent(input.providerMessageId, now);
    } else {
      entity.startSending(input.provider, now);
      const reason = input.failureReason
        ? DeliveryFailureReasonVO.reconstitute(input.failureReason)
        : DeliveryFailureReasonVO.unknown();
      entity.fail(reason, now);
    }

    const saved = await this.notificationRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(
      `Delivery attempt recorded: ${saved.id} provider=${input.provider} attempt=${input.attempt} success=${input.success}`,
    );
    return DeliveryMapper.toResponse(saved);
  }

  private async load(id: string): Promise<NotificationEntity> {
    const vo = NotificationIdVO.create(id);
    const entity = await this.notificationRepo.findByIdVO(vo);
    if (!entity) throw new NotificationNotFoundApplicationError(id);
    return entity;
  }
}
