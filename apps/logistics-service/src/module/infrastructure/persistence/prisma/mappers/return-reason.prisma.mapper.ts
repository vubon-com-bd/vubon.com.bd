import { ReturnReasonEntity } from '@domain/entities/return-reason.entity';
import { ReturnReasonTypeVO } from '@domain/value-objects/primitives/return-reason-type.vo';
import { ReturnReasonLabelVO } from '@domain/value-objects/primitives/return-reason-label.vo';

const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsReturnReasonRow {
  id: string; code: string; type: string; name: string; description: string | null;
  requiresImage: boolean; isRefundable: boolean; sortOrder: number; status: string;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  autoApprove: boolean; isActive: boolean; requiresPhoto: boolean; priority: number;
  label: unknown; deactivatedAt: Date | null; deactivateReason: string | null; metadata: unknown;
}

export class ReturnReasonPrismaMapper {
  static toDomain(raw: LogisticsReturnReasonRow): ReturnReasonEntity {
    return ReturnReasonEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        code: raw.code,
        type: ReturnReasonTypeVO.reconstitute(raw.type),
        label: ReturnReasonLabelVO.reconstitute(raw.label as never),
        description: raw.description ?? undefined,
        requiresPhoto: raw.requiresPhoto,
        autoApprove: raw.autoApprove,
        isActive: raw.isActive,
        priority: raw.priority,
        deactivatedAt: toIso(raw.deactivatedAt),
        deactivateReason: raw.deactivateReason ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: ReturnReasonEntity): Record<string, unknown> {
    return {
      id: entity.id, code: entity.code,
      type: entity.type.value,
      name: entity.label.value.en,
      label: entity.label.value,
      description: entity.description ?? null,
      requiresImage: entity.requiresPhoto, isRefundable: true, sortOrder: entity.priority,
      status: entity.isActive ? 'active' : 'inactive',
      autoApprove: entity.autoApprove, isActive: entity.isActive,
      requiresPhoto: entity.requiresPhoto, priority: entity.priority,
      deactivatedAt: entity.deactivatedAt ? new Date(entity.deactivatedAt) : null,
      deactivateReason: entity.deactivateReason ?? null,
      metadata: entity.metadata ?? null, version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
