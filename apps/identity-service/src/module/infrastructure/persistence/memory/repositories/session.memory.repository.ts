/**
 * SessionEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { SessionEntity } from '../../../../domain/entities/session.entity.js';
import type {
  SessionRepository,
  SessionListOptions,
  SessionPaginationResult,
  SessionStats,
} from '../../../../domain/repositories/session.repository.interface.js';
import type { SessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

@Injectable()
export class InMemorySessionRepository
  extends InMemoryRepository<SessionEntity, string>
  implements SessionRepository
{
  protected idOf(entity: SessionEntity): string { return entity.id; }

  async findByIdVO(id: SessionIdVO): Promise<SessionEntity | null> { return this.findById(id.value); }

  async findByUserId(userId: UserIdVO): Promise<readonly SessionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }

  async findActiveByUserId(userId: UserIdVO): Promise<readonly SessionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value && e.status.isActive());
  }

  async countActiveByUserId(userId: UserIdVO): Promise<number> {
    return (await this.findActiveByUserId(userId)).length;
  }

  async findByAuthId(authId: string): Promise<readonly SessionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId);
  }

  async findPaginated(options: SessionListOptions): Promise<SessionPaginationResult> {
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

  async getStats(): Promise<SessionStats> {
    const all = await this.findAll();
    const byStatus: Record<string, number> = {};
    let activeCount = 0;
    for (const s of all) {
      byStatus[s.status.value] = (byStatus[s.status.value] ?? 0) + 1;
      if (s.status.isActive()) activeCount++;
    }
    return { total: all.length, activeCount, byStatus, averageDurationSeconds: 0 };
  }

  async findExpired(nowMs: number = Date.now()): Promise<readonly SessionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isExpired(nowMs));
  }

  async findIdle(idleThresholdMs: number, nowMs: number = Date.now()): Promise<readonly SessionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => nowMs - Date.parse(e.lastAccessedAt) > idleThresholdMs);
  }

  async findOldestByUserId(userId: UserIdVO): Promise<SessionEntity | null> {
    const all = await this.findAll();
    const filtered = all.filter((e) => e.userId.value === userId.value);
    const sorted = [...filtered].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    return sorted[0] ?? null;
  }

  async revokeAllByUserId(userId: UserIdVO, reason: string): Promise<number> {
    const all = await this.findAll();
    let count = 0;
    for (const s of all) {
      if (s.userId.value === userId.value && !s.status.isRevoked()) {
        s.revoke(reason);
        await this.save(s);
        count++;
      }
    }
    return count;
  }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
