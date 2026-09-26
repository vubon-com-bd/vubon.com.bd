/**
 * SupportRuleMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { SupportRule as PrismaSupportRule } from '@prisma/client';
import { SupportRuleEntity } from '../../../../domain/entities/support-rule.entity';

@Injectable()
export class SupportRuleMapper {
  toDomain(raw: PrismaSupportRule): SupportRuleEntity {
    return SupportRuleEntity.rehydrate({
      id: raw.id,
      type: raw.type,
      condition: raw.condition,
      action: raw.action,
      isActive: raw.isActive,
      priority: raw.priority,
      triggerCount: raw.triggerCount,
      lastTriggeredAt: raw.lastTriggeredAt?.toISOString(),
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: SupportRuleEntity): {
    readonly id: string;
    readonly type: string;
    readonly condition: string;
    readonly action: string;
    readonly isActive: boolean;
    readonly priority: number;
    readonly triggerCount: number;
    readonly lastTriggeredAt: Date | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      type: snap.type,
      condition: snap.condition,
      action: snap.action,
      isActive: snap.isActive,
      priority: snap.priority,
      triggerCount: snap.triggerCount,
      lastTriggeredAt: snap.lastTriggeredAt ? new Date(snap.lastTriggeredAt) : null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
