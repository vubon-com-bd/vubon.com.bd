/**
 * ProviderWebhookService — inbound webhook processing (SendGrid/Twilio/SES/etc.)
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { createHmac } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../../domain/repositories/notification.repository.interface.js';
import { NotificationEntity } from '../../../domain/entities/notification.entity.js';
import { DeliveryFailureReasonVO } from '../../../domain/value-objects/primitives/delivery-failure-reason.vo.js';

import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo.js';

import { ProviderWebhookValidator } from '../../validators/provider-webhook.validator.js';

import type { IProviderWebhookService } from '../interfaces/provider-webhook.service.interface.js';
import type {
  ProviderWebhookRequestDTO,
  ProviderWebhookProcessResultDTO,
} from '../../dtos/requests/provider-webhook/index.js';

@Injectable()
export class ProviderWebhookService implements IProviderWebhookService {
  private readonly logger = new Logger(ProviderWebhookService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async process(dto: ProviderWebhookRequestDTO): Promise<ProviderWebhookProcessResultDTO> {
    const provider = ProviderWebhookValidator.validateProvider(dto.provider);
    const body = ProviderWebhookValidator.validateBody(dto.body);
    ProviderWebhookValidator.validateHeaders(dto.headers);

    const processed: string[] = [];
    const errors: string[] = [];

    switch (provider) {
      case 'sendgrid':
        await this.processSendGrid(body, processed, errors);
        break;
      case 'twilio':
        await this.processTwilio(body, processed, errors);
        break;
      case 'ses':
        await this.processSes(body, processed, errors);
        break;
      default:
        this.logger.warn(`Unsupported provider "${provider}"`);
    }

    return {
      accepted: errors.length === 0,
      provider: provider as ProviderWebhookProcessResultDTO['provider'],
      processedEvents: processed.length,
      updatedNotifications: processed,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  verifySignature(
    provider: string,
    rawBody: string,
    signature: string,
    secret?: string,
  ): boolean {
    if (!secret) {
      this.logger.debug(`Signature verification skipped for ${provider} (no secret)`);
      return true;
    }
    try {
      const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
      const provided = signature.replace(/^sha256=/, '');
      return expected === provided;
    } catch (err) {
      this.logger.warn(`Signature verification failed for ${provider}: ${(err as Error).message}`);
      return false;
    }
  }

  private async processSendGrid(
    body: Readonly<Record<string, unknown>>,
    processed: string[],
    errors: string[],
  ): Promise<void> {
    const events = Array.isArray(body['events']) ? body['events'] : [];
    for (const raw of events) {
      if (typeof raw !== 'object' || raw === null) continue;
      const event = raw as Record<string, unknown>;
      const messageId = String(event['sg_message_id'] ?? '');
      const eventType = String(event['event'] ?? '');
      if (!messageId || !eventType) continue;
      try {
        const entity = await this.findByProviderMessageId(messageId);
        if (!entity) continue;
        if (eventType === 'delivered') {
          entity.markDelivered();
        } else if (eventType === 'bounce' || eventType === 'dropped') {
          entity.fail(this.mapSendGridFailure(eventType), new Date().toISOString());
        } else if (eventType === 'open') {
          entity.markRead();
        }
        const saved = await this.notificationRepo.save(entity);
        await this.eventBridge.publishFromEntity(saved);
        processed.push(saved.id);
      } catch (err) {
        errors.push(`${messageId}: ${(err as Error).message}`);
      }
    }
  }

  private async processTwilio(
    body: Readonly<Record<string, unknown>>,
    processed: string[],
    errors: string[],
  ): Promise<void> {
    const messageSid = String(body['MessageSid'] ?? '');
    const status = String(body['MessageStatus'] ?? '');
    if (!messageSid || !status) return;

    try {
      const entity = await this.findByProviderMessageId(messageSid);
      if (!entity) return;
      if (status === 'delivered') {
        entity.markDelivered();
      } else if (status === 'failed' || status === 'undelivered') {
        entity.fail(this.mapTwilioFailure(status), new Date().toISOString());
      }
      const saved = await this.notificationRepo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      processed.push(saved.id);
    } catch (err) {
      errors.push(`${messageSid}: ${(err as Error).message}`);
    }
  }

  private async processSes(
    body: Readonly<Record<string, unknown>>,
    processed: string[],
    errors: string[],
  ): Promise<void> {
    const message = String(body['Message'] ?? '');
    if (!message) return;
    let event: Record<string, unknown>;
    try {
      event = JSON.parse(message) as Record<string, unknown>;
    } catch {
      errors.push('SES: invalid JSON in Message');
      return;
    }
    const eventType = String(event['eventType'] ?? '');
    const mail = event['mail'] as Record<string, unknown> | undefined;
    const messageId = mail ? String(mail['messageId'] ?? '') : '';
    if (!messageId || !eventType) return;

    try {
      const entity = await this.findByProviderMessageId(messageId);
      if (!entity) return;
      if (eventType === 'Delivery') {
        entity.markDelivered();
      } else if (eventType === 'Bounce' || eventType === 'Complaint') {
        entity.fail(
          this.mapSesFailure(eventType),
          new Date().toISOString(),
        );
      }
      const saved = await this.notificationRepo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      processed.push(saved.id);
    } catch (err) {
      errors.push(`${messageId}: ${(err as Error).message}`);
    }
  }

  private async findByProviderMessageId(messageId: string): Promise<NotificationEntity | null> {
    return null;
  }

  private mapSendGridFailure(eventType: string): ReturnType<typeof this.failure> {
    return this.failure(eventType === 'bounce' ? 'invalid_address' : 'blocked');
  }

  private mapTwilioFailure(status: string): ReturnType<typeof this.failure> {
    return this.failure(status === 'undelivered' ? 'network_error' : 'gateway_error');
  }

  private mapSesFailure(eventType: string): ReturnType<typeof this.failure> {
    return this.failure(eventType === 'Complaint' ? 'blocked' : 'invalid_address');
  }

  private failure(reason: string) {
    return DeliveryFailureReasonVO.reconstitute(reason);
  }
}
