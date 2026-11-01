/**
 * AuthEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { AuthEntity } from '../../../../domain/entities/auth.entity.js';
import type {
  AuthRepository,
  AuthListOptions,
  AuthPaginationResult,
  AuthStats,
} from '../../../../domain/repositories/auth.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

@Injectable()
export class InMemoryAuthRepository
  extends InMemoryRepository<AuthEntity, string>
  implements AuthRepository
{
  protected idOf(entity: AuthEntity): string { return entity.id; }

  async findByIdVO(id: AuthIdVO): Promise<AuthEntity | null> { return this.findById(id.value); }

  async findByUserId(userId: UserIdVO): Promise<readonly AuthEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }

  async findByIdentifier(identifier: string): Promise<AuthEntity | null> {
    const lower = identifier.trim().toLowerCase();
    const all = await this.findAll();
    return all.find((e) => e.identifier.normalized.toLowerCase() === lower) ?? null;
  }

  async findByUserIdAndProvider(userId: UserIdVO, provider: string): Promise<AuthEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId.value && e.provider.value === provider) ?? null;
  }

  async findPaginated(options: AuthListOptions): Promise<AuthPaginationResult> {
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

  async getStats(): Promise<AuthStats> {
    const all = await this.findAll();
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byProvider: Record<string, number> = {};
    let activeCount = 0, lockedCount = 0, mfaEnabledCount = 0;
    for (const a of all) {
      byStatus[a.status.value] = (byStatus[a.status.value] ?? 0) + 1;
      byType[a.type.value] = (byType[a.type.value] ?? 0) + 1;
      byProvider[a.provider.value] = (byProvider[a.provider.value] ?? 0) + 1;
      if (a.status.isActive()) activeCount++;
      if (a.status.isLocked()) lockedCount++;
      if (a.isMfaEnabled) mfaEnabledCount++;
    }
    return { total: all.length, byStatus, byType, byProvider, activeCount, lockedCount, mfaEnabledCount };
  }

  async findLockedExpired(): Promise<readonly AuthEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.isLocked());
  }

  async findInactive(olderThanDays: number): Promise<readonly AuthEntity[]> {
    const cutoff = Date.now() - olderThanDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.status.isInactive() && Date.parse(e.updatedAt) < cutoff);
  }

  async findUnverified(olderThanHours: number): Promise<readonly AuthEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.isEmailVerified && Date.parse(e.createdAt) < cutoff);
  }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
