import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { AuthBiometricEntity } from '../../../../domain/entities/auth-biometric.entity.js';
import type { AuthBiometricRepository } from '../../../../domain/repositories/auth-biometric.repository.interface.js';
import type { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';

@Injectable()
export class InMemoryAuthBiometricRepository
  extends InMemoryRepository<AuthBiometricEntity, string>
  implements AuthBiometricRepository
{
  protected idOf(entity: AuthBiometricEntity): string { return entity.id; }
  async findByAuthId(authId: AuthIdVO): Promise<readonly AuthBiometricEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }
  async findByAuthIdRaw(authId: string): Promise<readonly AuthBiometricEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId);
  }
  async findByAuthIdAndDevice(authId: AuthIdVO, deviceId: string): Promise<AuthBiometricEntity | null> {
    const all = await this.findByAuthId(authId);
    return all.find((e) => e.deviceId?.value === deviceId) ?? null;
  }
  async findStale(inactiveDays: number): Promise<readonly AuthBiometricEntity[]> {
    const cutoff = Date.now() - inactiveDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.lastUsedAt || Date.parse(e.lastUsedAt) < cutoff);
  }
  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
