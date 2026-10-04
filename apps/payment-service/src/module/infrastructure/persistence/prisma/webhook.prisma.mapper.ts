/**
 * WebhookPrismaMapper — row ↔ domain entity
 * @module payment-service/infrastructure/persistence/prisma
 */
import { WebhookEventEntity } from '../../../domain/entities/webhook-event.entity.js';
import { GatewaySignatureVO } from '../../../domain/value-objects/primitives/gateway-signature.vo.js';
import { FailureReasonVO } from '../../../domain/value-objects/primitives/failure-reason.vo.js';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo.js';

const toIso = (d: Date | null | undefined) => (d ? new Date(d).toISOString() : undefined);

export class WebhookPrismaMapper {
  static toDomain(raw: Record<string, unknown>): WebhookEventEntity {
    return WebhookEventEntity.reconstitute({
      id: String(raw['id']),
      createdAt: new Date(raw['createdAt'] as Date).toISOString(),
      updatedAt: new Date(raw['updatedAt'] as Date).toISOString(),
      deletedAt: raw['deletedAt'] ? new Date(raw['deletedAt'] as Date).toISOString() : null,
      props: {
        gateway: String(raw['gateway']),
        gatewayEventId: String(raw['gatewayEventId']),
        eventType: String(raw['eventType']),
        payload: (raw['payload'] as Readonly<Record<string, unknown>>) ?? {},
        signature: raw['signature']
          ? GatewaySignatureVO.reconstitute(String(raw['signature']))
          : undefined,
        verified: Boolean(raw['verified']),
        processed: Boolean(raw['processed']),
        attempts: Number(raw['attempts'] ?? 0),
        maxAttempts: raw['maxAttempts'] ? Number(raw['maxAttempts']) : undefined,
        lastError: raw['lastError']
          ? FailureReasonVO.reconstitute(String(raw['lastError']))
          : undefined,
        paymentId: raw['paymentId']
          ? PaymentIdVO.reconstitute(String(raw['paymentId']))
          : undefined,
        receivedAt: toIso(raw['receivedAt'] as Date) ?? new Date().toISOString(),
        verifiedAt: toIso(raw['verifiedAt'] as Date | null),
        processedAt: toIso(raw['processedAt'] as Date | null),
        failedAt: toIso(raw['failedAt'] as Date | null),
      },
    });
  }

  static toPersistence(entity: WebhookEventEntity): Record<string, unknown> {
    return {
      id: entity.id,
      gateway: entity.gateway,
      gatewayEventId: entity.gatewayEventId,
      eventType: entity.eventType,
      payload: entity.payload as object,
      signature: entity.signature?.value ?? null,
      verified: entity.verified,
      processed: entity.processed,
      attempts: entity.attempts,
      maxAttempts: entity.maxAttempts,
      lastError: entity.lastError?.value ?? null,
      paymentId: entity.paymentId?.value ?? null,
      receivedAt: new Date(entity.receivedAt),
      verifiedAt: entity.verifiedAt ? new Date(entity.verifiedAt) : null,
      processedAt: entity.processedAt ? new Date(entity.processedAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
