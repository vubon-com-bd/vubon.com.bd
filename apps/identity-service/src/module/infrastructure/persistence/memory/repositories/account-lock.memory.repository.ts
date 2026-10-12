/**
 * AccountLockEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { AccountLockEntity } from '../../../../domain/entities/account-lock.entity.js';
import type {
  AccountLockRepository,
  AccountLockListOptions,
  AccountLockPaginationResult,
  AccountLockStats,
} from '../../../../domain/repositories/account-lock.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

@Injectable()
export class InMemoryAccountLockRepository
  extends InMemoryRepository<AccountLockEntity, string>
  implements AccountLockRepository
{
  protected idOf(entity: AccountLockEntity): string { return entity.id; }

  async findActiveByAuthId(authId: AuthIdVO): Promise<AccountLockEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.authId.value === authId.value && e.isActive()) ?? null;
  }

  async findActiveByUserId(userId: string): Promise<AccountLockEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId && e.isActive()) ?? null;
  }

  async findByAuthId(authId: AuthIdVO): Promise<readonly AccountLockEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }

  async findPaginated(options: AccountLockListOptions): Promise<AccountLockPaginationResult> {
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

  async getStats(): Promise<AccountLockStats> {
    const all = await this.findAll();
    const byReason: Record<string, number> = {};
    let activeCount = 0;
    for (const l of all) {
      byReason[l.reason.value] = (byReason[l.reason.value] ?? 0) + 1;
      if (l.isActive()) activeCount++;
    }
    return { total: all.length, activeCount, byReason };
  }

  async findExpired(nowMs: number = Date.now()): Promise<readonly AccountLockEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isExpired(nowMs));
  }

  async autoUnlockExpired(_nowMs: number = Date.now()): Promise<number> { return 0; }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
