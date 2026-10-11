/**
 * BroadcastPrismaMapper — row ↔ domain entity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 */
import { BroadcastEntity } from '../../../../domain/entities/broadcast.entity.js';
import { BroadcastTypeVO } from '../../../../domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '../../../../domain/value-objects/primitives/broadcast-status.vo.js';
import { BroadcastTargetVO } from '../../../../domain/value-objects/primitives/broadcast-target.vo.js';

export interface PrismaBroadcastRow {
  id: string;
  type: string;
  status: string;
  target: string;
  templateId: string;
  channels: string[];
  estimatedRecipients: number | null;
  totalRecipients: number | null;
  processed: number;
  succeeded: number;
  failed: number;
  failureReasons: string[];
  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdBy: string;
  approvedBy: string | null;
  metadata: unknown;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class BroadcastPrismaMapper {
  static toDomain(raw: PrismaBroadcastRow): BroadcastEntity {
    return BroadcastEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        type: BroadcastTypeVO.reconstitute(raw.type),
        status: BroadcastStatusVO.reconstitute(raw.status),
        target: BroadcastTargetVO.reconstitute(raw.target),
        templateId: raw.templateId,
        estimatedRecipients: raw.estimatedRecipients ?? undefined,
        totalRecipients: raw.totalRecipients ?? undefined,
        processed: raw.processed,
        succeeded: raw.succeeded,
        failed: raw.failed,
        failureReasons: raw.failureReasons,
        scheduledAt: toIso(raw.scheduledAt),
        startedAt: toIso(raw.startedAt),
        completedAt: toIso(raw.completedAt),
        createdBy: raw.createdBy,
        approvedBy: raw.approvedBy ?? undefined,
      },
    });
  }

  static toPersistence(entity: BroadcastEntity): Record<string, unknown> {
    return {
      id: entity.id,
      type: entity.type.value,
      status: entity.status.value,
      target: entity.target.value,
      templateId: entity.templateId,
      channels: [],
      estimatedRecipients: entity.estimatedRecipients ?? null,
      totalRecipients: entity.totalRecipients ?? null,
      processed: entity.processed,
      succeeded: entity.succeeded,
      failed: entity.failed,
      failureReasons: entity.failureReasons,
      scheduledAt: entity.scheduledAt ? new Date(entity.scheduledAt) : null,
      startedAt: entity.startedAt ? new Date(entity.startedAt) : null,
      completedAt: entity.completedAt ? new Date(entity.completedAt) : null,
      createdBy: entity.createdBy,
      approvedBy: entity.approvedBy ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
