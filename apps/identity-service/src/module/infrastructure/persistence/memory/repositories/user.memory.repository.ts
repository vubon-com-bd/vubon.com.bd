/**
 * UserEntity In-Memory Repository — Full Implementation
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { UserEntity } from '../../../../domain/entities/user.entity.js';
import type {
  UserRepository,
  UserListOptions,
  UserPaginationResult,
  UserStats,
} from '../../../../domain/repositories/user.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import type { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo.js';

@Injectable()
export class InMemoryUserRepository
  extends InMemoryRepository<UserEntity, string>
  implements UserRepository
{
  protected idOf(entity: UserEntity): string {
    return entity.id;
  }

  async findByIdVO(id: UserIdVO): Promise<UserEntity | null> { return this.findById(id.value); }

  async findByEmail(email: UserEmailVO): Promise<UserEntity | null> { return this.findByEmailRaw(email.value); }

  async findByEmailRaw(email: string): Promise<UserEntity | null> {
    const lower = email.trim().toLowerCase();
    const all = await this.findAll();
    return all.find((e) => e.email.value.toLowerCase() === lower) ?? null;
  }

  async findByPhone(phone: string): Promise<UserEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.phone?.value === phone) ?? null;
  }

  async findByUsername(_username: string): Promise<UserEntity | null> { return null; }

  async findPaginated(options: UserListOptions): Promise<UserPaginationResult> {
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

  async getStats(): Promise<UserStats> {
    const all = await this.findAll();
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byRole: Record<string, number> = {};
    let activeCount = 0;
    let suspendedCount = 0;
    let verifiedCount = 0;
    for (const u of all) {
      byStatus[u.status.value] = (byStatus[u.status.value] ?? 0) + 1;
      byType[u.type.value] = (byType[u.type.value] ?? 0) + 1;
      for (const r of u.roles) byRole[r.value] = (byRole[r.value] ?? 0) + 1;
      if (u.status.isActive()) activeCount++;
      if (u.status.isSuspended()) suspendedCount++;
      if (u.emailVerified) verifiedCount++;
    }
    return { total: all.length, byStatus, byType, byRole, activeCount, suspendedCount, verifiedCount };
  }

  async findActive(): Promise<readonly UserEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.isActive());
  }

  async findByRole(role: string): Promise<readonly UserEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.hasRole(role));
  }

  async findInactive(olderThanDays: number): Promise<readonly UserEntity[]> {
    const cutoff = Date.now() - olderThanDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.status.isInactive() && Date.parse(e.updatedAt) < cutoff);
  }

  async findUnverified(olderThanHours: number): Promise<readonly UserEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.emailVerified && Date.parse(e.createdAt) < cutoff);
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    return this.softDeleteById(id);
  }
}
