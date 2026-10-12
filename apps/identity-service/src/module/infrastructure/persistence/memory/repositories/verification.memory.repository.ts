/**
 * VerificationEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { VerificationEntity } from '../../../../domain/entities/verification.entity.js';
import type {
  VerificationRepository,
  VerificationListOptions,
  VerificationPaginationResult,
  VerificationStats,
} from '../../../../domain/repositories/verification.repository.interface.js';
import type { VerificationIdVO } from '../../../../domain/value-objects/primitives/verification-id.vo.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

@Injectable()
export class InMemoryVerificationRepository
  extends InMemoryRepository<VerificationEntity, string>
  implements VerificationRepository
{
  protected idOf(entity: VerificationEntity): string { return entity.id; }

  async findByIdVO(id: VerificationIdVO): Promise<VerificationEntity | null> {
    return this.findById(id.value);
  }

  async findByAuthId(authId: AuthIdVO): Promise<readonly VerificationEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }

  async findByUserId(userId: UserIdVO): Promise<readonly VerificationEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }

  async findPendingByTarget(_target: string, _purpose: string): Promise<VerificationEntity | null> {
    return null;
  }

  async findLatestByAuthId(authId: AuthIdVO): Promise<VerificationEntity | null> {
    const list = await this.findByAuthId(authId);
    const sorted = [...list].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return sorted[0] ?? null;
  }

  async findPaginated(options: VerificationListOptions): Promise<VerificationPaginationResult> {
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

  async getStats(): Promise<VerificationStats> {
    const all = await this.findAll();
    const byPurpose: Record<string, number> = {};
    let verifiedCount = 0, pendingCount = 0;
    for (const v of all) {
      byPurpose[v.purpose.value] = (byPurpose[v.purpose.value] ?? 0) + 1;
      if (v.status.isVerified()) verifiedCount++;
      if (v.status.isPending()) pendingCount++;
    }
    return { total: all.length, verifiedCount, pendingCount, byPurpose };
  }

  async findExpired(nowMs: number = Date.now()): Promise<readonly VerificationEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isExpired(nowMs));
  }

  async findPendingOlderThan(minutes: number, nowMs: number = Date.now()): Promise<readonly VerificationEntity[]> {
    const cutoff = nowMs - minutes * 60 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.status.isPending() && Date.parse(e.createdAt) < cutoff);
  }

  async purge(_cutoffIso: string): Promise<number> { return 0; }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
