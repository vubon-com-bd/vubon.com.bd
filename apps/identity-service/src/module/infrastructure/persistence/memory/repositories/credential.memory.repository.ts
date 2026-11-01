import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { CredentialEntity } from '../../../../domain/entities/credential.entity.js';
import type {
  CredentialRepository,
  CredentialListOptions,
  CredentialPaginationResult,
} from '../../../../domain/repositories/credential.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

@Injectable()
export class InMemoryCredentialRepository
  extends InMemoryRepository<CredentialEntity, string>
  implements CredentialRepository
{
  protected idOf(entity: CredentialEntity): string { return entity.id; }
  async findByAuthId(authId: AuthIdVO): Promise<CredentialEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.authId.value === authId.value) ?? null;
  }

  async findByAuthIdRaw(authId: string): Promise<CredentialEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.authId.value === authId) ?? null;
  }
  async findPaginated(options: CredentialListOptions): Promise<CredentialPaginationResult> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return { items: all.slice(start, start + options.limit), total: all.length, page: options.page, limit: options.limit, totalPages: Math.ceil(all.length / options.limit) };
  }
  async findExpired(): Promise<readonly CredentialEntity[]> { return []; }
  async findMustChange(): Promise<readonly CredentialEntity[]> { return []; }
  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
