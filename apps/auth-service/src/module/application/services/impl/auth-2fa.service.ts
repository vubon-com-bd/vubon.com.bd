/**
 * Auth2FaService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { Auth2FaServiceInterface } from '../interfaces/auth-2fa.service.interface';
import type { Auth2FaRepository } from '../../../domain/repositories/auth-2fa.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { Auth2FaEntity } from '../../../domain/entities/auth-2fa.entity';
import { MfaTypeVO } from '../../../domain/value-objects/primitives/mfa-type.vo';
import { ID_GENERATOR } from '../tokens';
import { AUTH_2FA_REPO } from '../../tokens';

@Injectable()
export class Auth2FaService
  extends BaseService<Auth2FaEntity, UserId>
  implements Auth2FaServiceInterface {
  readonly name = 'Auth2FaService';

  constructor(
    @Inject(AUTH_2FA_REPO) private readonly repo: Auth2FaRepository,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async enable(userId: UserId, primaryMethod: string): Promise<Auth2FaEntity> {
    const existing = await this.repo.findByUser(userId);
    const now = new Date().toISOString();
    const entity = existing ?? Auth2FaEntity.create({
      id: this.idGen.generate(),
      userId,
      primaryMethod: MfaTypeVO.of(primaryMethod),
      backupMethods: [],
      createdAt: now,
      updatedAt: now,
    });
    entity.enable(Date.now());
    return this.repo.save(entity);
  }

  async disable(userId: UserId): Promise<void> {
    const existing = await this.repo.findByUser(userId);
    if (!existing) return;
    existing.disable();
    await this.repo.save(existing);
  }

  async setPrimary(userId: UserId, method: string): Promise<void> {
    const existing = await this.repo.findByUser(userId);
    if (!existing) throw new Error('2FA not configured');
    existing.setPrimary(MfaTypeVO.of(method));
    await this.repo.save(existing);
  }

  async addBackupMethod(userId: UserId, method: string): Promise<void> {
    const existing = await this.repo.findByUser(userId);
    if (!existing) throw new Error('2FA not configured');
    const mfaMethod = MfaTypeVO.of(method);
    const entity = Auth2FaEntity.create({
      id: existing.id,
      userId,
      primaryMethod: existing.primaryMethod,
      backupMethods: [...existing.backupMethods, mfaMethod],
      enabledAt: existing.isEnabled() ? Date.now() : undefined,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    });
    await this.repo.save(entity);
  }

  async getConfig(userId: UserId): Promise<Auth2FaEntity | null> {
    return this.repo.findByUser(userId);
  }
}
