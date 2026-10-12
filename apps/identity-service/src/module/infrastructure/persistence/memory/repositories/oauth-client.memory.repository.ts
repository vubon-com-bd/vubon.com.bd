import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { OAuthClientEntity } from '../../../../domain/entities/oauth-client.entity.js';
import type {
  OAuthClientRepository,
  OAuthClientListOptions,
  OAuthClientPaginationResult,
  OAuthClientStats,
} from '../../../../domain/repositories/oauth-client.repository.interface.js';

@Injectable()
export class InMemoryOAuthClientRepository
  extends InMemoryRepository<OAuthClientEntity, string>
  implements OAuthClientRepository
{
  protected idOf(entity: OAuthClientEntity): string { return entity.id; }

  async findByClientId(clientId: string): Promise<OAuthClientEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.clientId === clientId) ?? null;
  }

  async findActiveClients(): Promise<readonly OAuthClientEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isActive);
  }

  async findPaginated(options: OAuthClientListOptions): Promise<OAuthClientPaginationResult> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return { items: all.slice(start, start + options.limit), total: all.length, page: options.page, limit: options.limit, totalPages: Math.ceil(all.length / options.limit) };
  }

  async getStats(): Promise<OAuthClientStats> {
    const all = await this.findAll();
    return { total: all.length, activeCount: all.filter((e) => e.isActive).length, publicCount: all.filter((e) => e.isPublic).length, confidentialCount: all.filter((e) => !e.isPublic).length };
  }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
