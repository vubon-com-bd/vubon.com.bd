/**
 * Role Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { RoleEntity } from '../../../../domain/entities/role.entity.js';
import { RoleIdVO } from '../../../../domain/value-objects/primitives/role-id.vo.js';
import { RoleNameVO } from '../../../../domain/value-objects/primitives/role-name.vo.js';

export interface PrismaRoleRow {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class RolePrismaMapper {
  static toDomain(raw: PrismaRoleRow): RoleEntity {
    return RoleEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        name: this.parseName(raw.name),
        description: raw.description,
        level: this.levelOf(raw.name),
        isSystemRole: raw.isSystem,
        permissions: [],
      },
    });
  }

  static toPersistence(entity: RoleEntity): Record<string, unknown> {
    return {
      id: entity.id,
      name: entity.name.value,
      description: entity.description ?? '',
      isSystem: entity.isSystemRole,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseName(v: string): RoleNameVO {
    try { return RoleNameVO.reconstitute(v); } catch { return RoleNameVO.reconstitute('customer'); }
  }

  private static levelOf(v: string): number {
    const map: Record<string, number> = {
      super_admin: 100, admin: 90, moderator: 70, vendor: 40,
      support_agent: 50, logistics_manager: 50, customer: 20, guest: 5,
    };
    return map[v] ?? 10;
  }
}
