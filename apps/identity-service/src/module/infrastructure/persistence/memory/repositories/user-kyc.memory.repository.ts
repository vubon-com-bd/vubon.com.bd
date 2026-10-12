/**
 * UserKycEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { UserKycEntity } from '../../../../domain/entities/user-kyc.entity.js';
import type {
  UserKycRepository,
  UserKycListOptions,
  UserKycPaginationResult,
  UserKycStats,
} from '../../../../domain/repositories/user-kyc.repository.interface.js';
import type { KycIdVO } from '../../../../domain/value-objects/primitives/kyc-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

@Injectable()
export class InMemoryUserKycRepository
  extends InMemoryRepository<UserKycEntity, string>
  implements UserKycRepository
{
  protected idOf(entity: UserKycEntity): string { return entity.id; }

  async findByIdVO(id: KycIdVO): Promise<UserKycEntity | null> { return this.findById(id.value); }

  async findByUserId(userId: UserIdVO): Promise<UserKycEntity | null> {
    return this.findByUserIdRaw(userId.value);
  }

  async findByUserIdRaw(userId: string): Promise<UserKycEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId) ?? null;
  }

  async findPaginated(options: UserKycListOptions): Promise<UserKycPaginationResult> {
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

  async getStats(): Promise<UserKycStats> {
    const all = await this.findAll();
    const byStatus: Record<string, number> = {};
    let pendingCount = 0, verifiedCount = 0, rejectedCount = 0;
    for (const k of all) {
      byStatus[k.status.value] = (byStatus[k.status.value] ?? 0) + 1;
      if (k.isPending()) pendingCount++;
      if (k.isVerified()) verifiedCount++;
      if (k.isRejected()) rejectedCount++;
    }
    return { total: all.length, byStatus, pendingCount, verifiedCount, rejectedCount };
  }

  async findPending(olderThanHours: number): Promise<readonly UserKycEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.isPending() && Date.parse(e.createdAt) < cutoff);
  }

  async findExpiring(withinDays: number): Promise<readonly UserKycEntity[]> {
    const cutoff = Date.now() + withinDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.expiresAt && Date.parse(e.expiresAt) < cutoff);
  }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
