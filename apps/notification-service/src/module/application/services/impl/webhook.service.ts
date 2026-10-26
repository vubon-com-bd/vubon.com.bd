/**
 * WebhookService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  WEBHOOK_REPOSITORY,
  type WebhookRepository,
  type WebhookListOptions,
} from '@domain/repositories/webhook.repository.interface.js';
import { WebhookEntity } from '@domain/entities/webhook.entity.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '@domain/primitives/webhook-secret.vo.js';
import { WebhookVO } from '@domain/value-objects/composites/webhook.vo.js';
import type { WebhookEventValue } from '@domain/value-objects/composites/webhook.vo.js';
import { CanSendWebhookSpecification } from '@domain/specifications/can-send-webhook.specification.js';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { WebhookMapper } from '@application/mappers/webhook.mapper.js';
import {
  WebhookNotFoundApplicationError,
  WebhookValidationError,
  WebhookCreationError,
  WebhookUpdateError,
  WebhookTestError,
} from '@application/errors/webhook.errors.js';
import { NotImplementedError } from '@application/errors/not-implemented.error.js';

import type {
  IWebhookService,
  WebhookListOptionsDTO,
} from '@application/services/interfaces/webhook.service.interface.js';
import type {
  CreateWebhookRequestDTO,
  UpdateWebhookRequestDTO,
  TestWebhookRequestDTO,
} from '@application/dtos/requests/webhook/index.js';
import type {
  WebhookResponseDTO,
  WebhookListResponseDTO,
  WebhookDeliveryResponseDTO,
} from '@application/dtos/responses/webhook-response.dto.js';

@Injectable()
export class WebhookService implements IWebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @Inject(WEBHOOK_REPOSITORY)
    private readonly repo: WebhookRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(
    dto: CreateWebhookRequestDTO,
    actorId?: string,
  ): Promise<WebhookResponseDTO> {
    const now = new Date().toISOString();

    if (!dto.events || dto.events.length === 0) {
      throw new WebhookValidationError('At least one event required', 'events');
    }

    const existing = await this.repo.findByUrl(dto.url);
    if (existing) throw new WebhookValidationError('Webhook URL already exists', 'url');

    const id = randomUUID();
    let entity: WebhookEntity;
    try {
      entity = await this.buildAndCreate({ id, dto, now });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new WebhookCreationError(msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Webhook ${saved.id} created by ${actorId ?? 'system'}`);
    return WebhookMapper.toResponse(saved);
  }

  private async buildAndCreate(args: {
    id: string;
    dto: CreateWebhookRequestDTO;
    now: string;
  }): Promise<WebhookEntity> {
    const { id, dto, now } = args;

    const idVO = WebhookIdVO.create(id);
    const typeVO = WebhookTypeVO.create('outgoing');
    const statusVO = WebhookStatusVO.active();
    const urlVO = WebhookUrlVO.create(dto.url);
    const secretVO = dto.secret ? WebhookSecretVO.create(dto.secret) : undefined;

    const vo = WebhookVO.create({
      id: idVO,
      name: dto.name,
      type: typeVO,
      status: statusVO,
      url: urlVO,
      secret: secretVO,
      events: (dto.events ?? []) as readonly WebhookEventValue[],
      headers: dto.headers,
    });

    return WebhookEntity.create({ id: idVO, vo, now });
  }

  async update(
    dto: UpdateWebhookRequestDTO,
    actorId?: string,
  ): Promise<WebhookResponseDTO> {
    const entity = await this.load(dto.webhookId);
    const now = new Date().toISOString();

    try {
      if (dto.events) {
        entity.addEvents(dto.events as never, now);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new WebhookUpdateError(dto.webhookId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Webhook ${saved.id} updated by ${actorId ?? 'system'}`);
    return WebhookMapper.toResponse(saved);
  }

  async test(
    dto: TestWebhookRequestDTO,
    _actorId?: string,
  ): Promise<WebhookDeliveryResponseDTO> {
    const entity = await this.load(dto.webhookId);

    // Check spec
    const spec = new CanSendWebhookSpecification();
    const check = spec.explain({
      webhook: entity,
      ctx: {
        event: dto.event,
        payloadSizeBytes: dto.payload ? JSON.stringify(dto.payload).length : 0,
      },
    });
    if (check) throw new WebhookTestError(dto.webhookId, check);

    const now = new Date().toISOString();
    const deliveryId = randomUUID();

    // Simulate test delivery
    entity.recordDelivery(deliveryId, dto.event, 200, 120, now);
    await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(entity);

    this.logger.log(`Webhook ${entity.id} test-fired — event=${dto.event}`);
    return {
      id: deliveryId,
      webhookId: entity.id,
      event: dto.event,
      status: 'delivered' as never,
      responseStatus: 200,
      durationMs: 120,
      attemptCount: 1,
      deliveredAt: now,
      createdAt: now,
    };
  }

  async getById(id: string): Promise<WebhookResponseDTO> {
    const entity = await this.load(id);
    return WebhookMapper.toResponse(entity);
  }

  async list(options: WebhookListOptionsDTO): Promise<WebhookListResponseDTO> {
    const result = await this.repo.findPaginated(options as WebhookListOptions);
    return WebhookMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  private async load(id: string): Promise<WebhookEntity> {
    const vo = WebhookIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new WebhookNotFoundApplicationError(id);
    return entity;
  }
}
