import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { AuthRecoveryCodeEntity } from '../../../../domain/entities/auth-recovery-code.entity.js';
import type { AuthRecoveryCodeRepository } from '../../../../domain/repositories/auth-recovery-code.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

@Injectable()
export class InMemoryAuthRecoveryCodeRepository
  extends InMemoryRepository<AuthRecoveryCodeEntity, string>
  implements AuthRecoveryCodeRepository
{
  protected idOf(entity: AuthRecoveryCodeEntity): string { return entity.id; }
  async findByAuthId(authId: AuthIdVO): Promise<readonly AuthRecoveryCodeEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }
  async findActiveByAuthId(authId: AuthIdVO): Promise<readonly AuthRecoveryCodeEntity[]> {
    return (await this.findByAuthId(authId)).filter((e) => e.isActive());
  }
  async countActiveByAuthId(authId: AuthIdVO): Promise<number> {
    return (await this.findActiveByAuthId(authId)).length;
  }
  async findByCode(authId: AuthIdVO, code: string): Promise<AuthRecoveryCodeEntity | null> {
    const all = await this.findByAuthId(authId);
    return all.find((e) => e.code.value === code) ?? null;
  }
  async revokeAllByAuthId(authId: AuthIdVO): Promise<number> {
    const all = await this.findActiveByAuthId(authId);
    let count = 0;
    for (const rc of all) { rc.revoke(); await this.save(rc); count++; }
    return count;
  }
  async deleteAllByAuthId(_authId: AuthIdVO): Promise<number> { return 0; }
  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
