/**
 * LoginAttemptEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { LoginAttemptEntity } from '../../../../domain/entities/login-attempt.entity.js';
import type {
  LoginAttemptRepository,
  LoginAttemptListOptions,
  LoginAttemptPaginationResult,
  LoginAttemptStats,
} from '../../../../domain/repositories/login-attempt.repository.interface.js';

@Injectable()
export class InMemoryLoginAttemptRepository
  extends InMemoryRepository<LoginAttemptEntity, string>
  implements LoginAttemptRepository
{
  protected idOf(entity: LoginAttemptEntity): string { return entity.id; }

  async findByIdentifier(identifier: string, limit = 20): Promise<readonly LoginAttemptEntity[]> {
    const all = await this.findAll();
    const lower = identifier.toLowerCase();
    return all.filter((e) => e.identifier.normalized.toLowerCase() === lower).slice(0, limit);
  }

  async findByIp(ipAddress: string, limit = 20): Promise<readonly LoginAttemptEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.ipAddress?.value === ipAddress).slice(0, limit);
  }

  async findRecent(identifier: string, windowSeconds: number, nowMs: number = Date.now()): Promise<readonly LoginAttemptEntity[]> {
    const cutoff = nowMs - windowSeconds * 1000;
    return (await this.findByIdentifier(identifier, 100)).filter((e) => Date.parse(e.attemptedAt) >= cutoff);
  }

  async countRecent(identifier: string, windowSeconds: number, nowMs: number = Date.now()): Promise<number> {
    return (await this.findRecent(identifier, windowSeconds, nowMs)).length;
  }

  async countRecentByIp(ipAddress: string, windowSeconds: number, nowMs: number = Date.now()): Promise<number> {
    const cutoff = nowMs - windowSeconds * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.ipAddress?.value === ipAddress && Date.parse(e.attemptedAt) >= cutoff).length;
  }

  async findPaginated(options: LoginAttemptListOptions): Promise<LoginAttemptPaginationResult> {
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

  async getStats(): Promise<LoginAttemptStats> {
    const all = await this.findAll();
    const byStatus: Record<string, number> = {};
    let successCount = 0, failureCount = 0, blockedCount = 0;
    for (const a of all) {
      byStatus[a.status.value] = (byStatus[a.status.value] ?? 0) + 1;
      if (a.isSuccess()) successCount++;
      if (a.isFailure()) failureCount++;
    }
    return { total: all.length, successCount, failureCount, blockedCount, byStatus };
  }

  async purge(_cutoffIso: string): Promise<number> { return 0; }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
