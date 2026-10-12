/**
 * Permission Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { PermissionEntity } from '../../../../domain/entities/permission.entity.js';
import { PermissionNameVO } from '../../../../domain/value-objects/primitives/permission-name.vo.js';

export interface PrismaPermissionRow {
  id: string;
  name: string;
  action: string;
  resource: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class PermissionPrismaMapper {
  static toDomain(raw: PrismaPermissionRow): PermissionEntity {
    return PermissionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        name: this.parseName(raw.name, raw.resource, raw.action),
        description: raw.description ?? '',
        category: raw.resource,
        isSensitive: raw.action === 'delete' || raw.action === 'manage',
      },
    });
  }

  static toPersistence(entity: PermissionEntity): Record<string, unknown> {
    return {
      id: entity.id,
      name: entity.name.value,
      action: entity.name.action || 'view',
      resource: entity.name.resource || entity.category,
      description: entity.description,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseName(name: string, resource: string, action: string): PermissionNameVO {
    try { return PermissionNameVO.reconstitute(name); }
    catch {
      try { return PermissionNameVO.create(`${resource}:${action}`); }
      catch { return PermissionNameVO.reconstitute('unknown:unknown'); }
    }
  }
}
