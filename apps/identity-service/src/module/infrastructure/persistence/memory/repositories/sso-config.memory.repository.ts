import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { SsoConfigEntity } from '../../../../domain/entities/sso-config.entity.js';
import type {
  SsoConfigRepository,
  SsoConfigListOptions,
  SsoConfigPaginationResult,
  SsoConfigStats,
} from '../../../../domain/repositories/sso-config.repository.interface.js';

@Injectable()
export class InMemorySsoConfigRepository
  extends InMemoryRepository<SsoConfigEntity, string>
  implements SsoConfigRepository
{
  protected idOf(entity: SsoConfigEntity): string { return entity.id; }

  async findByName(name: string): Promise<SsoConfigEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.name === name) ?? null;
  }

  async findByProvider(provider: string): Promise<readonly SsoConfigEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.provider.value === provider);
  }

  async findActive(): Promise<readonly SsoConfigEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isActive);
  }

  async findPaginated(options: SsoConfigListOptions): Promise<SsoConfigPaginationResult> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return { items: all.slice(start, start + options.limit), total: all.length, page: options.page, limit: options.limit, totalPages: Math.ceil(all.length / options.limit) };
  }

  async getStats(): Promise<SsoConfigStats> {
    const all = await this.findAll();
    const byProvider: Record<string, number> = {};
    for (const s of all) byProvider[s.provider.value] = (byProvider[s.provider.value] ?? 0) + 1;
    return { total: all.length, activeCount: all.filter((e) => e.isActive).length, byProvider };
  }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
