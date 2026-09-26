/**
 * SupportTeamMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { SupportTeam as PrismaSupportTeam } from '@prisma/client';
import { SupportTeamEntity } from '../../../../domain/entities/support-team.entity';

@Injectable()
export class SupportTeamMapper {
  toDomain(raw: PrismaSupportTeam): SupportTeamEntity {
    return SupportTeamEntity.rehydrate({
      id: raw.id,
      name: raw.name,
      type: raw.type,
      isActive: raw.isActive,
      leadAgentId: raw.leadAgentId ?? undefined,
      memberIds: raw.memberIds,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: SupportTeamEntity): {
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly isActive: boolean;
    readonly leadAgentId: string | null;
    readonly memberIds: readonly string[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      name: snap.name,
      type: snap.type,
      isActive: snap.isActive,
      leadAgentId: snap.leadAgentId ?? null,
      memberIds: snap.memberIds,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
