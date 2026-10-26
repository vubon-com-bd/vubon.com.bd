/**
 * CleanupWorker — periodic data cleanup worker
 * @module notification-service/infrastructure/workers
 *
 * Purges expired/stale records per retention policy:
 *  - notifications (90 days)
 *  - webhook deliveries (30 days)
 *  - digests (90 days)
 *  - audit logs (365 days)
 */
import { Injectable, Logger , Optional } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '@domain/repositories/notification.repository.interface.js';
import {
  DIGEST_REPOSITORY,
  type DigestRepository,
} from '@domain/repositories/digest.repository.interface.js';
import { WebhookDeliveryPrismaRepository } from '@infrastructure/persistence/prisma/repositories/webhook-delivery.prisma.repository.js';
import { AuditLogPrismaRepository } from '@infrastructure/persistence/prisma/repositories/audit-log.prisma.repository.js';
import { RateLimitPrismaRepository } from '@infrastructure/persistence/prisma/repositories/rate-limit.prisma.repository.js';
import { Inject } from '@nestjs/common';

import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
} from '@infrastructure/queues/queue.constants.js';

export interface CleanupPayload {
  readonly scope: 'notifications' | 'webhooks' | 'digests' | 'audit' | 'rate-limits' | 'all';
  readonly cutoff: string;
}

const RETENTION = {
  NOTIFICATIONS_DAYS: 90,
  WEBHOOKS_DAYS: 30,
  DIGESTS_DAYS: 90,
  AUDIT_DAYS: 365,
} as const;

@Injectable()
export class CleanupWorker extends BaseWorker<CleanupPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.RETRY;
  protected readonly jobNames = [NOTIFICATION_JOB_NAME.CLEANUP] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notifRepo: NotificationRepository,
    @Inject(DIGEST_REPOSITORY)
    private readonly digestRepo: DigestRepository,
    @Optional()
    private readonly webhookDeliveryRepo?: WebhookDeliveryPrismaRepository,
    @Optional()
    private readonly auditLogRepo?: AuditLogPrismaRepository,
    @Optional()
    private readonly rateLimitRepo?: RateLimitPrismaRepository,
  ) {
    super(queueService, 'CleanupWorker');
  }

  protected async handle(payload: CleanupPayload): Promise<unknown> {
    this.logger.log(`🧹 Cleanup started: scope=${payload.scope} cutoff=${payload.cutoff}`);

    const results: Record<string, number> = {};

    const scopes =
      payload.scope === 'all'
        ? (['notifications', 'webhooks', 'digests', 'audit', 'rate-limits'] as const)
        : ([payload.scope] as const);

    for (const scope of scopes) {
      try {
        switch (scope) {
          case 'notifications': {
            results['notifications'] = await this.notifRepo.purgeOlderThan(payload.cutoff);
            break;
          }
          case 'webhooks': {
            const cutoff = new Date(payload.cutoff);
            const before = cutoff.getTime() - RETENTION.WEBHOOKS_DAYS * 24 * 3600_000;
            if (this.webhookDeliveryRepo) {
              results['webhooks'] = await this.webhookDeliveryRepo.deleteByWebhook(
                new Date(before).toISOString(),
              );
            } else {
              this.logger.debug('WebhookDeliveryPrismaRepository not available — skipping');
            }
            break;
          }
          case 'digests': {
            results['digests'] = await this.digestRepo.purgeOlderThan(payload.cutoff);
            break;
          }
          case 'audit': {
            if (this.auditLogRepo) {
              results['audit'] = await this.auditLogRepo.purgeOlderThan(payload.cutoff);
            } else {
              this.logger.debug('AuditLogPrismaRepository not available — skipping');
            }
            break;
          }
          case 'rate-limits': {
            if (this.rateLimitRepo) {
              results['rate-limits'] = await this.rateLimitRepo.purgeExpired(payload.cutoff);
            } else {
              this.logger.debug('RateLimitPrismaRepository not available — skipping');
            }
            break;
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`Cleanup failed for ${scope}: ${msg}`);
      }
    }

    this.logger.log(`🧹 Cleanup complete: ${JSON.stringify(results)}`);
    return { processed: true, results };
  }

  protected concurrency(): number {
    return 1;
  }
}
