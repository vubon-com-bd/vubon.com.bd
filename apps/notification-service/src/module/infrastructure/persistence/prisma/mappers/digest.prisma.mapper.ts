/**
 * DigestPrismaMapper — row ↔ domain entity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 */
import { DigestEntity } from '../../../../domain/entities/digest.entity.js';
import { DigestFrequencyVO } from '../../../../domain/value-objects/primitives/digest-frequency.vo.js';
import { DigestTypeVO } from '../../../../domain/value-objects/primitives/digest-type.vo.js';
import { DigestStatusVO } from '../../../../domain/value-objects/primitives/digest-status.vo.js';

export interface PrismaDigestRow {
  id: string;
  userId: string;
  frequency: string;
  type: string;
  status: string;
  periodStart: Date;
  periodEnd: Date;
  itemCount: number;
  itemIds: string[];
  channel: string | null;
  generatedAt: Date | null;
  sentAt: Date | null;
  failureReason: string | null;
  metadata: unknown;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class DigestPrismaMapper {
  static toDomain(raw: PrismaDigestRow): DigestEntity {
    return DigestEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        userId: raw.userId,
        frequency: DigestFrequencyVO.reconstitute(raw.frequency),
        type: DigestTypeVO.reconstitute(raw.type),
        status: DigestStatusVO.reconstitute(raw.status),
        periodStart: new Date(raw.periodStart).toISOString(),
        periodEnd: new Date(raw.periodEnd).toISOString(),
        itemCount: raw.itemCount,
        itemIds: raw.itemIds,
        generatedAt: toIso(raw.generatedAt),
        sentAt: toIso(raw.sentAt),
        channel: raw.channel ?? undefined,
        failureReason: raw.failureReason ?? undefined,
      },
    });
  }

  static toPersistence(entity: DigestEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId,
      frequency: entity.frequency.value,
      type: entity.type.value,
      status: entity.status.value,
      periodStart: new Date(entity.periodStart),
      periodEnd: new Date(entity.periodEnd),
      itemCount: entity.itemCount,
      itemIds: entity.itemIds,
      channel: entity.channel ?? null,
      generatedAt: entity.generatedAt ? new Date(entity.generatedAt) : null,
      sentAt: entity.sentAt ? new Date(entity.sentAt) : null,
      failureReason: entity.failureReason ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
