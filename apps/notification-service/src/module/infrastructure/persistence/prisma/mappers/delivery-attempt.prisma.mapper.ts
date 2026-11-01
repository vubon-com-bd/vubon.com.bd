/**
 * DeliveryAttemptPrismaMapper — Prisma NotificationDeliveryAttempt ↔ NotificationAttemptEntity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma stores each attempt as a row with `attempt`, `status`, `provider`, `failureReason`।
 * Domain `NotificationAttemptEntity` embeds `DeliveryAttemptVO` + optional `DeliveryErrorVO`।
 */
import type { PrismaNotificationDeliveryAttempt } from '@infrastructure/persistence/prisma/prisma.client.js';
import { toIso, toIsoRequired } from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { NotificationAttemptEntity } from '@domain/entities/notification-attempt.entity.js';
import { NotificationAttemptVO } from '@domain/composites/notification-attempt.vo.js';
import { DeliveryAttemptVO } from '@domain/primitives/delivery-attempt.vo.js';
import { DeliveryErrorVO } from '@domain/primitives/delivery-error.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { ProviderMessageIdVO } from '@domain/primitives/provider-message-id.vo.js';

export class DeliveryAttemptPrismaMapper {
  // ═══════════════ Prisma → Domain ═══════════════
  static toDomain(raw: PrismaNotificationDeliveryAttempt): NotificationAttemptEntity {
    const succeeded = raw.status === 'delivered' || raw.status === 'sent';

    const deliveryAttempt = DeliveryAttemptVO.reconstitute({
      attemptNumber: raw.attempt,
      attemptedAt: toIsoRequired(raw.startedAt),
      succeeded,
      errorMessage: raw.failureReason ?? undefined,
      providerMessageId: raw.providerMessageId ?? undefined,
    });

    const error = !succeeded && raw.failureReason
      ? DeliveryErrorVO.reconstitute({
          reason: (raw.failureCode ?? 'UNKNOWN') as never,
          message: raw.failureReason,
          providerCode: raw.failureCode ?? undefined,
          retryable: raw.retryable,
        })
      : undefined;

    const attemptVO = NotificationAttemptVO.reconstitute({
      attempt: deliveryAttempt,
      error,
    });

    return NotificationAttemptEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.completedAt ?? raw.createdAt),
      props: {
        notificationId: NotificationIdVO.reconstitute(raw.notificationId),
        attempt: attemptVO,
      },
    });
  }

  // ═══════════════ Domain → Prisma ═══════════════
  static toPersistence(entity: NotificationAttemptEntity): Record<string, unknown> {
    const attempt = entity.attempt.attempt;
    const error = entity.attempt.error;

    return {
      id: entity.id,
      notificationId: entity.notificationId.value,
      channel: 'email',
      provider: 'unknown',
      attempt: attempt.attemptNumber,
      status: attempt.succeeded ? 'sent' : 'failed',
      providerMessageId: attempt.providerMessageId
        ? ProviderMessageIdVO.reconstitute(attempt.providerMessageId).value
        : null,
      failureReason: error?.message ?? null,
      failureCode: error?.reason ?? null,
      durationMs: null,
      startedAt: new Date(attempt.attemptedAt),
      completedAt: error ? new Date(attempt.attemptedAt) : null,
      retryable: error?.retryable ?? false,
    };
  }

  static readonly _helpers = { toIso };
}
