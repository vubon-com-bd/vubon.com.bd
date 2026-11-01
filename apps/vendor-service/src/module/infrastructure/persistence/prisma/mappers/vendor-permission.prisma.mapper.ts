/**
 * VendorPermissionPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 *
 * ⚠️ There is NO dedicated `vendor_permissions` table in Prisma schema.
 * Vendor permissions are derived from team member roles + per-member JSON
 * (overrides/denials) which live on the team_members table.
 *
 * This mapper is a placeholder that must be backed by team_members data
 * OR a future dedicated table.
 */
import { VendorPermissionEntity } from '../../../../domain/entities/vendor-permission.entity.js';
import { VendorPermissionVO } from '../../../../domain/value-objects/composites/vendor-permission.vo.js';
import { PermissionIdVO } from '../../../../domain/value-objects/primitives/permission-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { TeamMemberIdVO } from '../../../../domain/value-objects/primitives/team-member-id.vo.js';
import { TeamRoleVO } from '../../../../domain/value-objects/primitives/team-role.vo.js';

export interface VendorPermissionPrismaRow {
  id: string;
  vendorId: string;
  memberId: string;
  role: string;
  permissions: unknown;
  overrides: unknown;
  denials: unknown;
  grantedAt: Date;
  grantedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const toArr = (v: unknown): string[] =>
  Array.isArray(v) ? (v as string[]) : [];

export class VendorPermissionPrismaMapper {
  static toDomain(raw: VendorPermissionPrismaRow): VendorPermissionEntity {
    const vo = VendorPermissionVO.reconstitute({
      id: PermissionIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      memberId: TeamMemberIdVO.reconstitute(raw.memberId),
      role: TeamRoleVO.reconstitute(raw.role),
      permissions: toArr(raw.permissions),
      overrides: toArr(raw.overrides),
      denials: toArr(raw.denials),
      grantedAt: new Date(raw.grantedAt).toISOString(),
      grantedBy: raw.grantedBy ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorPermissionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorPermissionEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      memberId: vo.memberId.value,
      role: vo.role.value,
      permissions: [...vo.permissions],
      overrides: [...vo.overrides],
      denials: [...vo.denials],
      grantedAt: new Date(vo.grantedAt),
      grantedBy: vo.grantedBy ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
