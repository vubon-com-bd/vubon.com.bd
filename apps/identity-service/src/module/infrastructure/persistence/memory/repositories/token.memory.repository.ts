/**
 * TokenEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { TokenEntity } from '../../../../domain/entities/token.entity.js';
import type {
  TokenRepository,
  TokenListOptions,
  TokenPaginationResult,
  TokenStats,
} from '../../../../domain/repositories/token.repository.interface.js';
import type { TokenIdVO } from '../../../../domain/value-objects/primitives/token-id.vo.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

@Injectable()
export class InMemoryTokenRepository
  extends InMemoryRepository<TokenEntity, string>
  implements TokenRepository
{
  protected idOf(entity: TokenEntity): string { return entity.id; }

  async findByIdVO(id: TokenIdVO): Promise<TokenEntity | null> { return this.findById(id.value); }

  async findByJti(jti: string): Promise<TokenEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.jti === jti) ?? null;
  }

  async findByUserId(userId: UserIdVO): Promise<readonly TokenEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }

  async findBySessionId(sessionId: string): Promise<readonly TokenEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.sessionId.value === sessionId);
  }

  async findPaginated(options: TokenListOptions): Promise<TokenPaginationResult> {
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

  async getStats(): Promise<TokenStats> {
    const all = await this.findAll();
    const byType: Record<string, number> = {};
    let activeCount = 0, revokedCount = 0;
    for (const t of all) {
      byType[t.type.value] = (byType[t.type.value] ?? 0) + 1;
      if (t.isUsable()) activeCount++;
      if (t.isRevoked()) revokedCount++;
    }
    return { total: all.length, activeCount, revokedCount, byType };
  }

  async findExpired(nowMs: number = Date.now()): Promise<readonly TokenEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isExpired(nowMs));
  }

  async findUnusedExpired(nowMs: number = Date.now()): Promise<readonly TokenEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isExpired(nowMs) && !e.isUsed());
  }

  async revokeAllByUserId(userId: UserIdVO, reason: string): Promise<number> {
    const all = await this.findAll();
    let count = 0;
    for (const t of all) {
      if (t.userId.value === userId.value && !t.isRevoked()) {
        t.revoke(reason);
        await this.save(t);
        count++;
      }
    }
    return count;
  }

  async revokeAllBySessionId(_sessionId: string, _reason: string): Promise<number> { return 0; }

  async purge(_cutoffIso: string): Promise<number> { return 0; }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
