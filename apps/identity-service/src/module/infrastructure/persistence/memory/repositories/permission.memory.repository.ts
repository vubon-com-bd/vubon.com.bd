import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { PermissionEntity } from '../../../../domain/entities/permission.entity.js';
import type {
  PermissionRepository,
  PermissionListOptions,
  PermissionPaginationResult,
  PermissionStats,
} from '../../../../domain/repositories/permission.repository.interface.js';

@Injectable()
export class InMemoryPermissionRepository
  extends InMemoryRepository<PermissionEntity, string>
  implements PermissionRepository
{
  protected idOf(entity: PermissionEntity): string { return entity.id; }

  async findByName(name: string): Promise<PermissionEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.name.value === name) ?? null;
  }

  async findByCategory(category: string): Promise<readonly PermissionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.category === category);
  }

  async findSensitive(): Promise<readonly PermissionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isSensitive);
  }

  async findPaginated(options: PermissionListOptions): Promise<PermissionPaginationResult> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return { items: all.slice(start, start + options.limit), total: all.length, page: options.page, limit: options.limit, totalPages: Math.ceil(all.length / options.limit) };
  }

  async getStats(): Promise<PermissionStats> {
    const all = await this.findAll();
    const byCategory: Record<string, number> = {};
    for (const p of all) byCategory[p.category] = (byCategory[p.category] ?? 0) + 1;
    return { total: all.length, sensitiveCount: all.filter((e) => e.isSensitive).length, byCategory };
  }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
