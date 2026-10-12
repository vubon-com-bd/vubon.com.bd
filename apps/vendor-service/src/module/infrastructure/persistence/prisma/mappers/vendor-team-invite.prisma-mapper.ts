/**
 * VendorTeamInvitePrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorTeamInvite as PrismaVendorTeamInvite } from '@prisma/client';
import { VendorTeamInviteEntity } from '../../../../domain/entities/vendor-team-invite.entity.js';
import { MemberEmailVO } from '../../../../domain/value-objects/primitives/member-email.vo.js';
import { MemberRoleVO } from '../../../../domain/value-objects/primitives/member-role.vo.js';
import { TeamInviteTokenVO } from '../../../../domain/value-objects/primitives/team-invite-token.vo.js';
import { TeamInviteStatusVO } from '../../../../domain/value-objects/primitives/team-invite-status.vo.js';
import { InviteExpiryVO } from '../../../../domain/value-objects/primitives/invite-expiry.vo.js';

export class VendorTeamInvitePrismaMapper {
  static toDomain(row: PrismaVendorTeamInvite): VendorTeamInviteEntity {
    return VendorTeamInviteEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        email: MemberEmailVO.create(row.email),
        role: MemberRoleVO.create(row.role),
        status: TeamInviteStatusVO.create(row.status),
        token: TeamInviteTokenVO.reconstitute(row.token),
        invitedBy: row.invitedBy,
        invitedAt: row.invitedAt.toISOString(),
        expiresAt: InviteExpiryVO.reconstitute(row.expiresAt.toISOString()),
        message: row.message ?? undefined,
        acceptedAt: row.acceptedAt?.toISOString(),
        acceptedBy: row.acceptedBy ?? undefined,
        rejectedAt: row.rejectedAt?.toISOString(),
      },
    });
  }

  static toPersistence(entity: VendorTeamInviteEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      email: entity.email.value,
      role: entity.role.value,
      status: entity.status.value,
      token: entity.token.value,
      invitedBy: entity.invitedBy,
      invitedAt: new Date(entity.invitedAt),
      expiresAt: new Date(entity.expiresAt.value),
      message: entity.message,
      acceptedAt: entity.acceptedAt ? new Date(entity.acceptedAt) : null,
      acceptedBy: entity.acceptedBy,
      rejectedAt: entity.rejectedAt ? new Date(entity.rejectedAt) : null,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
