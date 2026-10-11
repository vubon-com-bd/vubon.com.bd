/**
 * WebhookPrismaMapper — row ↔ domain entity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 */
import { WebhookEntity } from '../../../../domain/entities/webhook.entity.js';
import { WebhookMethodVO } from '../../../../domain/value-objects/primitives/webhook-method.vo.js';
import { WebhookStatusVO } from '../../../../domain/value-objects/primitives/webhook-status.vo.js';
import { WebhookEventVO } from '../../../../domain/value-objects/primitives/webhook-event.vo.js';
import { WebhookUrlVO } from '../../../../domain/value-objects/primitives/webhook-url.vo.js';
import { WebhookSecretVO } from '../../../../domain/value-objects/primitives/webhook-secret.vo.js';

export interface PrismaWebhookRow {
  id: string;
  url: string;
  method: string;
  status: string;
  events: string[];
  secret: string | null;
  description: string | null;
  headers: unknown;
  failureCount: number;
  lastSuccessAt: Date | null;
  lastFailureAt: Date | null;
  createdBy: string;
  metadata: unknown;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class WebhookPrismaMapper {
  static toDomain(raw: PrismaWebhookRow): WebhookEntity {
    return WebhookEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        url: WebhookUrlVO.reconstitute(raw.url),
        method: WebhookMethodVO.reconstitute(raw.method),
        status: WebhookStatusVO.reconstitute(raw.status),
        events: raw.events.map((e) => WebhookEventVO.reconstitute(e)),
        secret: raw.secret ? WebhookSecretVO.reconstitute(raw.secret) : undefined,
        description: raw.description ?? undefined,
        failureCount: raw.failureCount,
        lastSuccessAt: toIso(raw.lastSuccessAt),
        lastFailureAt: toIso(raw.lastFailureAt),
        createdBy: raw.createdBy,
      },
    });
  }

  static toPersistence(entity: WebhookEntity): Record<string, unknown> {
    return {
      id: entity.id,
      url: entity.url.value,
      method: entity.method.value,
      status: entity.status.value,
      events: entity.events.map((e) => e.value),
      secret: entity.secret?.value ?? null,
      description: entity.description ?? null,
      failureCount: entity.failureCount,
      lastSuccessAt: entity.lastSuccessAt ? new Date(entity.lastSuccessAt) : null,
      lastFailureAt: entity.lastFailureAt ? new Date(entity.lastFailureAt) : null,
      createdBy: entity.createdBy,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
