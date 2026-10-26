/**
 * WebhookPrismaMapper — Prisma NotificationWebhook ↔ WebhookEntity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma fields:
 *  - url (String) → WebhookUrlVO
 *  - events (String[]) → WebhookEventValue[]
 *  - secret (String?) → WebhookSecretVO
 *  - headers (Json?) → Record<string, string>
 *  - status + failureCount + lastSuccessAt/lastFailureAt → WebhookVO
 */
import type { PrismaNotificationWebhook } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
  jsonRecord,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { WebhookEntity } from '@domain/entities/webhook.entity.js';
import { WebhookVO } from '@domain/composites/webhook.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '@domain/primitives/webhook-secret.vo.js';

export class WebhookPrismaMapper {
  // ═══════════════ Prisma → Domain ═══════════════
  static toDomain(raw: PrismaNotificationWebhook): WebhookEntity {
    const vo = WebhookVO.reconstitute({
      id: WebhookIdVO.reconstitute(raw.id),
      name: `Webhook ${raw.id.slice(0, 8)}`,
      type: WebhookTypeVO.reconstitute('outgoing'),
      status: WebhookStatusVO.reconstitute(raw.status),
      url: WebhookUrlVO.reconstitute(raw.url),
      secret: raw.secret ? WebhookSecretVO.reconstitute(raw.secret) : undefined,
      events: Object.freeze([...(raw.events ?? [])]) as never,
      headers: this.buildHeaders(raw.headers),
      lastTriggeredAt: toIso(raw.lastSuccessAt),
    });

    return WebhookEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: toIso(raw.deletedAt) ?? null,
      version: raw.version,
      props: {
        vo,
        pausedAt: undefined,
        pausedReason: undefined,
        disabledAt: undefined,
        disabledReason: undefined,
        failureReason: (raw.failureCount > 0 && raw.lastFailureAt) ? 'delivery-failures' : undefined,
      },
    });
  }

  // ═══════════════ Domain → Prisma ═══════════════
  static toPersistence(entity: WebhookEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      url: vo.url.value,
      method: 'POST',
      status: vo.status.value,
      events: [...vo.events],
      secret: vo.secret?.value ?? null,
      description: null,
      headers: vo.headers ? { ...vo.headers } : null,
      failureCount: 0,
      lastSuccessAt: vo.lastTriggeredAt ? new Date(vo.lastTriggeredAt) : null,
      lastFailureAt: null,
      createdBy: '00000000-0000-0000-0000-000000000000',
      metadata: null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  // ═══════════════ Helpers ═══════════════
  private static buildHeaders(rawHeaders: unknown): Readonly<Record<string, string>> | undefined {
    const obj = jsonRecord(rawHeaders);
    const keys = Object.keys(obj);
    if (keys.length === 0) return undefined;

    const headers: Record<string, string> = {};
    for (const key of keys) {
      const val = obj[key];
      if (typeof val === 'string') headers[key] = val;
    }
    return Object.keys(headers).length > 0 ? Object.freeze(headers) : undefined;
  }
}
