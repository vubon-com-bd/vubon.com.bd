/**
 * WebhookService — outbound webhook management
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { WEBHOOK } from '@vubon/shared-constants/platform/notification';

import {
  WEBHOOK_REPOSITORY,
  type WebhookRepository,
} from '../../../domain/repositories/webhook.repository.interface.js';
import { WebhookEntity } from '../../../domain/entities/webhook.entity.js';

import { WebhookIdVO } from '../../../domain/value-objects/primitives/webhook-id.vo.js';
import { WebhookMethodVO } from '../../../domain/value-objects/primitives/webhook-method.vo.js';
import { WebhookEventVO } from '../../../domain/value-objects/primitives/webhook-event.vo.js';
import { WebhookUrlVO } from '../../../domain/value-objects/primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '../../../domain/value-objects/primitives/webhook-secret.vo.js';

import { WebhookMapper } from '../../mappers/webhook.mapper.js';
import {
  WebhookNotFoundApplicationError,
  MaxActiveWebhooksReachedError,
} from '../../errors/webhook.errors.js';

import type { IWebhookService } from '../interfaces/webhook.service.interface.js';
import type {
  CreateWebhookRequestDTO,
  UpdateWebhookRequestDTO,
  GetWebhookRequestDTO,
  ListWebhooksRequestDTO,
  ActivateWebhookRequestDTO,
  DeactivateWebhookRequestDTO,
  DisableWebhookRequestDTO,
  TestWebhookRequestDTO,
  ListWebhookDeliveriesRequestDTO,
  RetryWebhookDeliveryRequestDTO,
} from '../../dtos/requests/webhook/index.js';
import type {
  WebhookResponseDTO,
  WebhookListResponseDTO,
  WebhookDeliveryResponseDTO,
  WebhookDeliveryListResponseDTO,
  WebhookTestResponseDTO,
} from '../../dtos/responses/webhook-response.dto.js';

@Injectable()
export class WebhookService implements IWebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @Inject(WEBHOOK_REPOSITORY)
    private readonly webhookRepo: WebhookRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(dto: CreateWebhookRequestDTO, actorId?: string): Promise<WebhookResponseDTO> {
    const active = await this.webhookRepo.countActive();
    if (active >= WEBHOOK.MAX_ACTIVE_WEBHOOKS) {
      throw new MaxActiveWebhooksReachedError(WEBHOOK.MAX_ACTIVE_WEBHOOKS);
    }
    const now = new Date().toISOString();
    const entity = WebhookEntity.create({
      id: randomUUID(),
      now,
      props: {
        url: WebhookUrlVO.create(dto.url),
        method: WebhookMethodVO.create(dto.method),
        events: dto.events.map((e) => WebhookEventVO.create(e)),
        secret: dto.secret ? WebhookSecretVO.create(dto.secret) : undefined,
        description: dto.description,
        createdBy: actorId ?? 'system',
        metadata: dto.metadata,
      },
    });
    const saved = await this.webhookRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Webhook created: ${saved.id} url=${dto.url}`);
    return WebhookMapper.toResponse(saved);
  }

  async update(dto: UpdateWebhookRequestDTO, actorId?: string): Promise<WebhookResponseDTO> {
    const entity = await this.load(dto.webhookId);
    entity.update(
      {
        url: dto.url ? WebhookUrlVO.create(dto.url) : undefined,
        method: dto.method ? WebhookMethodVO.create(dto.method) : undefined,
        events: dto.events ? dto.events.map((e) => WebhookEventVO.create(e)) : undefined,
        secret: dto.secret ? WebhookSecretVO.create(dto.secret) : undefined,
        description: dto.description,
      },
      actorId ?? 'system',
    );
    const saved = await this.webhookRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WebhookMapper.toResponse(saved);
  }

  async activate(dto: ActivateWebhookRequestDTO, actorId?: string): Promise<WebhookResponseDTO> {
    const entity = await this.load(dto.webhookId);
    entity.activate(actorId);
    const saved = await this.webhookRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WebhookMapper.toResponse(saved);
  }

  async deactivate(dto: DeactivateWebhookRequestDTO, actorId?: string): Promise<WebhookResponseDTO> {
    const entity = await this.load(dto.webhookId);
    entity.deactivate(actorId, dto.reason);
    const saved = await this.webhookRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return WebhookMapper.toResponse(saved);
  }

  async disable(dto: DisableWebhookRequestDTO, actorId?: string): Promise<WebhookResponseDTO> {
    const entity = await this.load(dto.webhookId);
    entity.disable(dto.reason);
    const saved = await this.webhookRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    void actorId;
    return WebhookMapper.toResponse(saved);
  }

  async test(dto: TestWebhookRequestDTO, actorId?: string): Promise<WebhookTestResponseDTO> {
    const entity = await this.load(dto.webhookId);
    const started = Date.now();
    let success = false;
    let responseStatus: number | undefined;
    let error: string | undefined;

    try {
      const body = JSON.stringify(
        dto.payload ?? { event: dto.event ?? 'webhook.test', timestamp: new Date().toISOString() },
      );
      const response = await fetch(entity.url.value, {
        method: entity.method.value,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Vubon-Webhook-Tester/1.0',
        },
        body: entity.method.hasBody() ? body : undefined,
        signal: AbortSignal.timeout(WEBHOOK.TIMEOUT_SECONDS * 1000),
      });
      responseStatus = response.status;
      success = response.status >= 200 && response.status < 300;
      if (!success) error = `HTTP ${response.status}`;
    } catch (err) {
      error = (err as Error).message;
    }

    const durationMs = Date.now() - started;
    if (success) {
      entity.recordDeliverySuccess(dto.event ?? 'webhook.test', responseStatus!, durationMs);
    } else {
      entity.recordDeliveryFailure(dto.event ?? 'webhook.test', 1, error ?? 'unknown', responseStatus);
    }
    const saved = await this.webhookRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Webhook test ${entity.id}: ${success ? 'ok' : 'fail'} (${durationMs}ms)`);
    void actorId;

    return {
      webhookId: entity.id,
      success,
      responseStatus,
      durationMs,
      error,
    };
  }

  async getById(dto: GetWebhookRequestDTO): Promise<WebhookResponseDTO> {
    return WebhookMapper.toResponse(await this.load(dto.webhookId));
  }

  async list(dto: ListWebhooksRequestDTO): Promise<WebhookListResponseDTO> {
    const result = await this.webhookRepo.findPaginated({
      page: dto.page,
      limit: dto.limit,
      sortBy: dto.sortBy,
      sortDir: dto.sortDir,
      filter: dto.filter,
    });
    return WebhookMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async listDeliveries(
    dto: ListWebhookDeliveriesRequestDTO,
  ): Promise<WebhookDeliveryListResponseDTO> {
    await this.load(dto.webhookId);
    return {
      items: [],
      total: 0,
      page: dto.page,
      limit: dto.limit,
      totalPages: 0,
    };
  }

  async retryDelivery(
    dto: RetryWebhookDeliveryRequestDTO,
    actorId?: string,
  ): Promise<WebhookDeliveryResponseDTO> {
    this.logger.debug(`Retry delivery requested: ${dto.deliveryId}`);
    void actorId;
    throw new WebhookNotFoundApplicationError(dto.deliveryId);
  }

  async triggerWebhooks(
    event: string,
    payload: Readonly<Record<string, unknown>>,
  ): Promise<readonly string[]> {
    const eventVO = WebhookEventVO.create(event);
    const hooks = await this.webhookRepo.findByEvent(eventVO);
    const activeHooks = hooks.filter((h) => h.isActive());
    const deliveryIds: string[] = [];

    for (const hook of activeHooks) {
      try {
        const response = await fetch(hook.url.value, {
          method: hook.method.value,
          headers: { 'Content-Type': 'application/json', 'User-Agent': 'Vubon-Webhook/1.0' },
          body: hook.method.hasBody() ? JSON.stringify(payload) : undefined,
          signal: AbortSignal.timeout(WEBHOOK.TIMEOUT_SECONDS * 1000),
        });
        if (response.ok) {
          hook.recordDeliverySuccess(event, response.status, 0);
        } else {
          hook.recordDeliveryFailure(event, 1, `HTTP ${response.status}`, response.status);
        }
        const saved = await this.webhookRepo.save(hook);
        await this.eventBridge.publishFromEntity(saved);
        deliveryIds.push(saved.id);
      } catch (err) {
        this.logger.warn(`Webhook ${hook.id} failed: ${(err as Error).message}`);
      }
    }
    return deliveryIds;
  }

  private async load(id: string): Promise<WebhookEntity> {
    const vo = WebhookIdVO.create(id);
    const entity = await this.webhookRepo.findByIdVO(vo);
    if (!entity) throw new WebhookNotFoundApplicationError(id);
    return entity;
  }
}
