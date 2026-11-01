/**
 * MfaEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { MfaEntity } from '../../../../domain/entities/mfa.entity.js';
import type {
  MfaRepository,
  MfaListOptions,
  MfaPaginationResult,
  MfaStats,
} from '../../../../domain/repositories/mfa.repository.interface.js';
import type { MfaIdVO } from '../../../../domain/value-objects/primitives/mfa-id.vo.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

@Injectable()
export class InMemoryMfaRepository
  extends InMemoryRepository<MfaEntity, string>
  implements MfaRepository
{
  protected idOf(entity: MfaEntity): string { return entity.id; }

  async findByIdVO(id: MfaIdVO): Promise<MfaEntity | null> { return this.findById(id.value); }

  async findByAuthId(authId: AuthIdVO): Promise<readonly MfaEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }

  async findPrimaryByAuthId(authId: AuthIdVO): Promise<MfaEntity | null> {
    const all = await this.findByAuthId(authId);
    return all[0] ?? null;
  }

  async findEnabledByAuthId(authId: AuthIdVO): Promise<MfaEntity | null> {
    const all = await this.findByAuthId(authId);
    return all.find((e) => e.isEnabledAndVerified()) ?? null;
  }

  async findPaginated(options: MfaListOptions): Promise<MfaPaginationResult> {
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

  async getStats(): Promise<MfaStats> {
    const all = await this.findAll();
    const byMethod: Record<string, number> = {};
    let enabledCount = 0, verified = 0;
    for (const m of all) {
      byMethod[m.method.value] = (byMethod[m.method.value] ?? 0) + 1;
      if (m.isEnabledAndVerified()) enabledCount++;
      if (m.verified) verified++;
    }
    return { total: all.length, enabledCount, byMethod, byVerified: { yes: verified, no: all.length - verified } };
  }

  async findUnverified(olderThanHours: number): Promise<readonly MfaEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.verified && Date.parse(e.createdAt) < cutoff);
  }

  async findFailing(_threshold: number): Promise<readonly MfaEntity[]> { return []; }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
