/**
 * SocialAccountEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { SocialAccountEntity } from '../../../../domain/entities/social-account.entity.js';
import type {
  SocialAccountRepository,
  SocialAccountListOptions,
  SocialAccountPaginationResult,
  SocialAccountStats,
} from '../../../../domain/repositories/social-account.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

@Injectable()
export class InMemorySocialAccountRepository
  extends InMemoryRepository<SocialAccountEntity, string>
  implements SocialAccountRepository
{
  protected idOf(entity: SocialAccountEntity): string { return entity.id; }

  async findByUserId(userId: UserIdVO): Promise<readonly SocialAccountEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }

  async findByProviderAndProviderUserId(provider: string, providerUserId: string): Promise<SocialAccountEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.provider.value === provider && e.providerUserId === providerUserId) ?? null;
  }

  async findByUserIdAndProvider(userId: UserIdVO, provider: string): Promise<SocialAccountEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.provider.value === provider) ?? null;
  }

  async findPaginated(options: SocialAccountListOptions): Promise<SocialAccountPaginationResult> {
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

  async getStats(): Promise<SocialAccountStats> {
    const all = await this.findAll();
    const byProvider: Record<string, number> = {};
    let activeCount = 0;
    for (const s of all) {
      byProvider[s.provider.value] = (byProvider[s.provider.value] ?? 0) + 1;
      if (s.isActive) activeCount++;
    }
    return { total: all.length, activeCount, byProvider };
  }

  async findInactive(olderThanDays: number): Promise<readonly SocialAccountEntity[]> {
    const cutoff = Date.now() - olderThanDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.lastUsedAt || Date.parse(e.lastUsedAt) < cutoff);
  }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
