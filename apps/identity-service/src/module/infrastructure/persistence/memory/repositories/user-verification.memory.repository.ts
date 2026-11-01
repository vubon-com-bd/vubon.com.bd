/**
 * UserVerificationEntity In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { UserVerificationEntity } from '../../../../domain/entities/user-verification.entity.js';
import type {
  UserVerificationRepository,
  UserVerificationStats,
} from '../../../../domain/repositories/user-verification.repository.interface.js';
import type { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

@Injectable()
export class InMemoryUserVerificationRepository
  extends InMemoryRepository<UserVerificationEntity, string>
  implements UserVerificationRepository
{
  protected idOf(entity: UserVerificationEntity): string { return entity.id; }

  async findByUserId(userId: UserIdVO): Promise<UserVerificationEntity | null> {
    return this.findByUserIdRaw(userId.value);
  }

  async findByUserIdRaw(userId: string): Promise<UserVerificationEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId) ?? null;
  }

  async getStats(): Promise<UserVerificationStats> {
    const all = await this.findAll();
    return {
      total: all.length,
      emailVerifiedCount: all.filter((e) => e.emailVerified).length,
      phoneVerifiedCount: all.filter((e) => e.phoneVerified).length,
      identityVerifiedCount: all.filter((e) => e.identityVerified).length,
      fullyVerifiedCount: all.filter((e) => e.isFullyVerified()).length,
    };
  }

  async findUnverifiedUsers(): Promise<readonly UserVerificationEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => !e.emailVerified || !e.phoneVerified);
  }

  async softDelete(id: string): Promise<void> { return this.softDeleteById(id); }
}
