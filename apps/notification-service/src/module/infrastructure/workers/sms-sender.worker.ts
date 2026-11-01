/**
 * SmsSenderWorker — SMS channel dispatch worker
 * @module notification-service/infrastructure/workers
 *
 * Flow:
 * 1. Load notification entity
 * 2. Resolve SMS provider (priority order)
 * 3. Call provider.send()
 * 4. Mark sent / failed
 * 5. Throw on error → BullMQ retry
 */

import { Inject, Injectable, Optional } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '@domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import {
  ProviderResolverService,
} from '@infrastructure/providers/base/provider-resolver.service.js';
import { FallbackDispatcherService } from '@infrastructure/providers/base/fallback-dispatcher.service.js';
import type { SmsProviderInput } from '@infrastructure/providers/base/provider.interface.js';

import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
} from '@infrastructure/queues/queue.constants.js';

export interface SmsSenderPayload {
  readonly notificationId: string;
  readonly to: string;
  readonly message: string;
  readonly senderId?: string;
}

@Injectable()
export class SmsSenderWorker extends BaseWorker<SmsSenderPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.SMS;
  protected readonly jobNames = [NOTIFICATION_JOB_NAME.SEND] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly repo: NotificationRepository,
    @Optional() private readonly fallback?: FallbackDispatcherService,
  ) {
    super(queueService, 'SmsSenderWorker');
  }

  protected async handle(payload: SmsSenderPayload): Promise<unknown> {
    const vo = NotificationIdVO.reconstitute(payload.notificationId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      this.logger.warn(`Notification ${payload.notificationId} not found`);
      return { skipped: true, reason: 'not-found' };
    }

    this.logger.log(
      `📱 SMS send → notification=${payload.notificationId} to=${payload.to} length=${payload.message.length}`,
    );

    const providerInput: SmsProviderInput = {
      to: payload.to,
      message: payload.message,
      ...(payload.senderId ? { from: payload.senderId } : {}),
      type: 'transactional',
    };

    try {
      if (!this.fallback) {
        this.logger.warn(`FallbackDispatcher not available — SMS log only (no external delivery)`);
        this.logger.log(`📱 SMS [LOG-ONLY] to=${payload.to} message="${payload.message.slice(0, 30)}..."`);
        entity.markSent();
        await this.repo.save(entity);
        return { processed: true, channel: 'sms', to: payload.to, mode: 'log-only' };
      }

      const result = await this.fallback.dispatchWithFallback('sms', providerInput);

      if (!result.success) {
        const err = result.error ?? 'all sms providers failed';
        this.logger.error(`❌ SMS failed to ${payload.to}: ${err}`);
        entity.markFailed(err);
        await this.repo.save(entity);
        throw new Error(err);
      }

      this.logger.log(
        `✅ SMS sent to ${payload.to} via ${result.finalProvider} (msgId=${result.messageId ?? 'n/a'})`,
      );
      entity.markSent();
      await this.repo.save(entity);
      return {
        processed: true,
        channel: 'sms',
        to: payload.to,
        provider: result.finalProvider,
        messageId: result.messageId,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`SMS dispatch exception: ${msg}`);
      try {
        if (typeof (entity as unknown as { isSent?: () => boolean }).isSent !== 'function' || !(entity as unknown as { isSent: () => boolean }).isSent()) {
          entity.markFailed(msg);
          await this.repo.save(entity);
        }
      } catch { /* ignore */ }
      throw err; // trigger retry
    }
  }

  protected concurrency(): number {
    return 10;
  }
}
