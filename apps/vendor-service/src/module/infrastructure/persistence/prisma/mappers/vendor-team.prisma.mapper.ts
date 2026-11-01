/**
 * VendorTeamPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 *
 * ⚠️ This handles `vendor_team_members` table only. Team invites
 * are a separate table and would need a dedicated mapper.
 */
import { VendorTeamEntity } from '../../../../domain/entities/vendor-team.entity.js';
import {
  VendorTeamVO,
  type TeamStatusValue,
  type TeamInviteStatusValue,
} from '../../../../domain/value-objects/composites/vendor-team.vo.js';
import { TeamMemberIdVO } from '../../../../domain/value-objects/primitives/team-member-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { TeamRoleVO } from '../../../../domain/value-objects/primitives/team-role.vo.js';

export interface VendorTeamPrismaRow {
  id: string;
  vendorId: string;
  userId: string;
  role: string;
  status: string;
  inviteStatus: string | null;
  email: string;
  fullName: string;
  permissions: unknown;
  invitedAt: Date;
  invitedBy: string | null;
  joinedAt: Date | null;
  lastActiveAt: Date | null;
  suspendedAt: Date | null;
  removedAt: Date | null;
  removedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class VendorTeamPrismaMapper {
  static toDomain(raw: VendorTeamPrismaRow): VendorTeamEntity {
    const vo = VendorTeamVO.reconstitute({
      id: TeamMemberIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      userId: UserIdVO.reconstitute(raw.userId),
      role: TeamRoleVO.reconstitute(raw.role),
      status: raw.status as TeamStatusValue,
      inviteStatus: (raw.inviteStatus as TeamInviteStatusValue | null) ?? undefined,
      email: raw.email,
      fullName: raw.fullName,
      permissions: Array.isArray(raw.permissions) ? (raw.permissions as string[]) : [],
      invitedAt: new Date(raw.invitedAt).toISOString(),
      invitedBy: raw.invitedBy ?? undefined,
      joinedAt: toIso(raw.joinedAt),
      lastActiveAt: toIso(raw.lastActiveAt),
      suspendedAt: toIso(raw.suspendedAt),
      removedAt: toIso(raw.removedAt),
      removedBy: raw.removedBy ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorTeamEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorTeamEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      userId: vo.userId.value,
      role: vo.role.value,
      status: vo.status,
      inviteStatus: vo.inviteStatus ?? null,
      email: vo.email,
      fullName: vo.fullName,
      permissions: [...vo.permissions],
      invitedAt: new Date(vo.invitedAt),
      invitedBy: vo.invitedBy ?? null,
      joinedAt: vo.joinedAt ? new Date(vo.joinedAt) : null,
      lastActiveAt: vo.lastActiveAt ? new Date(vo.lastActiveAt) : null,
      suspendedAt: vo.suspendedAt ? new Date(vo.suspendedAt) : null,
      removedAt: vo.removedAt ? new Date(vo.removedAt) : null,
      removedBy: vo.removedBy ?? null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
