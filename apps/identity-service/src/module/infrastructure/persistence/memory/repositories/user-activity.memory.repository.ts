/**
 * UserActivityEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { UserActivityEntity } from '../../../../domain/entities/user-activity.entity.js';
import type {
  UserActivityRepository,
  UserActivityListOptions,
  UserActivityPaginationResult,
} from '../../../../domain/repositories/user-activity.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

@Injectable()
export class InMemoryUserActivityRepository
  extends InMemoryRepository<UserActivityEntity, string>
  implements UserActivityRepository
{
  protected idOf(entity: UserActivityEntity): string { return entity.id; }

  async findByUserId(userId: UserIdVO, limit?: number): Promise<readonly UserActivityEntity[]> {
    const all = await this.findAll();
    const filtered = all.filter((e) => e.userId.value === userId.value);
    return limit ? filtered.slice(0, limit) : filtered;
  }

  async findByType(type: string, limit?: number): Promise<readonly UserActivityEntity[]> {
    const all = await this.findAll();
    const filtered = all.filter((e) => e.type.value === type);
    return limit ? filtered.slice(0, limit) : filtered;
  }

  async findSecurityEvents(userId: UserIdVO, limit?: number): Promise<readonly UserActivityEntity[]> {
    const all = await this.findAll();
    const filtered = all.filter((e) => e.userId.value === userId.value && e.type.isSecurityEvent());
    return limit ? filtered.slice(0, limit) : filtered;
  }

  async findRecent(userId: UserIdVO, sinceMs: number): Promise<readonly UserActivityEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value && Date.parse(e.occurredAt) >= sinceMs);
  }

  async findPaginated(options: UserActivityListOptions): Promise<UserActivityPaginationResult> {
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

  async purge(_cutoffIso: string): Promise<number> { return 0; }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
