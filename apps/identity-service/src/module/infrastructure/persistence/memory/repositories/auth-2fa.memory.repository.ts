import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { AuthTwoFactorEntity } from '../../../../domain/entities/auth-2fa.entity.js';
import type { Auth2FaRepository } from '../../../../domain/repositories/auth-2fa.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

@Injectable()
export class InMemoryAuth2FaRepository
  extends InMemoryRepository<AuthTwoFactorEntity, string>
  implements Auth2FaRepository
{
  protected idOf(entity: AuthTwoFactorEntity): string { return entity.id; }
  async findByAuthId(authId: AuthIdVO): Promise<AuthTwoFactorEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.authId.value === authId.value) ?? null;
  }
  async findByAuthIdRaw(authId: string): Promise<AuthTwoFactorEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.authId.value === authId) ?? null;
  }
  async findEnabledByAuthId(authId: AuthIdVO): Promise<AuthTwoFactorEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.authId.value === authId.value && e.isEnabled()) ?? null;
  }
  async findLocked(): Promise<readonly AuthTwoFactorEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.isLocked());
  }
  async findUnverified(olderThanHours: number): Promise<readonly AuthTwoFactorEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.verified && Date.parse(e.createdAt) < cutoff);
  }
  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
