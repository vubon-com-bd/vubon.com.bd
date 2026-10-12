/**
 * VendorTeamMemberPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorTeamMember as PrismaVendorTeamMember } from '@prisma/client';
import { VendorTeamMemberEntity } from '../../../../domain/entities/vendor-team-member.entity.js';
import { MemberEmailVO } from '../../../../domain/value-objects/primitives/member-email.vo.js';
import { MemberNameVO } from '../../../../domain/value-objects/primitives/member-name.vo.js';
import { MemberRoleVO } from '../../../../domain/value-objects/primitives/member-role.vo.js';
import { TeamMemberStatusVO } from '../../../../domain/value-objects/primitives/team-member-status.vo.js';
import { MemberPermissionVO } from '../../../../domain/value-objects/primitives/member-permission.vo.js';

export class VendorTeamMemberPrismaMapper {
  static toDomain(row: PrismaVendorTeamMember): VendorTeamMemberEntity {
    return VendorTeamMemberEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      props: {
        vendorId: row.vendorId,
        userId: row.userId,
        email: MemberEmailVO.create(row.email),
        name: MemberNameVO.create(row.name),
        role: MemberRoleVO.create(row.role),
        status: TeamMemberStatusVO.create(row.status),
        permissions: row.permissions.map((p) => MemberPermissionVO.create(p)),
        joinedAt: row.joinedAt.toISOString(),
        lastActiveAt: row.lastActiveAt?.toISOString(),
        invitedBy: row.invitedBy ?? undefined,
      },
    });
  }

  static toPersistence(entity: VendorTeamMemberEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      userId: entity.userId,
      email: entity.email.value,
      name: entity.name.value,
      role: entity.role.value,
      status: entity.status.value,
      permissions: entity.permissions.map((p) => p.value),
      joinedAt: new Date(entity.joinedAt),
      lastActiveAt: entity.lastActiveAt ? new Date(entity.lastActiveAt) : null,
      invitedBy: entity.invitedBy,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
