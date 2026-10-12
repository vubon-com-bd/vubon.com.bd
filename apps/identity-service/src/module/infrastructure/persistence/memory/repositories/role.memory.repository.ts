/**
 * RoleEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { RoleEntity } from '../../../../domain/entities/role.entity.js';
import type {
  RoleRepository,
  RoleListOptions,
  RolePaginationResult,
  RoleStats,
} from '../../../../domain/repositories/role.repository.interface.js';
import type { RoleIdVO } from '../../../../domain/value-objects/primitives/role-id.vo.js';

@Injectable()
export class InMemoryRoleRepository
  extends InMemoryRepository<RoleEntity, string>
  implements RoleRepository
{
  protected idOf(entity: RoleEntity): string { return entity.id; }

  async findByIdVO(id: RoleIdVO): Promise<RoleEntity | null> { return this.findById(id.value); }

  async findByName(name: string): Promise<RoleEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.name.value === name) ?? null;
  }

  async findSystemRoles(): Promise<readonly RoleEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isSystemRole);
  }

  async findWithPermission(_permission: string): Promise<readonly RoleEntity[]> { return []; }

  async findPaginated(options: RoleListOptions): Promise<RolePaginationResult> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }

  async getStats(): Promise<RoleStats> {
    const all = await this.findAll();
    const byLevel: Record<string, number> = {};
    let systemRoleCount = 0;
    for (const r of all) {
      byLevel[String(r.level)] = (byLevel[String(r.level)] ?? 0) + 1;
      if (r.isSystemRole) systemRoleCount++;
    }
    return { total: all.length, systemRoleCount, byLevel };
  }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
