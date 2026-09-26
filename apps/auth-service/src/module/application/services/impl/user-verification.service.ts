/**
 * UserVerificationService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserVerificationServiceInterface } from '../interfaces/user-verification.service.interface';
import type { UserVerificationRepository } from '../../../domain/repositories/user-verification.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { UserVerificationEntity } from '../../../domain/entities/user-verification.entity';
import { VerificationCodeVO } from '../../../domain/value-objects/primitives/verification-code.vo';
import { VerificationTypeVO } from '../../../domain/value-objects/primitives/verification-type.vo';
import { VerificationStatusVO } from '../../../domain/value-objects/primitives/verification-status.vo';
import type { UserVerificationResponseDTO } from '../../dtos/responses/user-verification-response.dto';
import { ID_GENERATOR } from '../tokens';
import { USER_VERIFICATION_REPO } from '../../tokens';

const DEFAULT_TTL_MS = 15 * 60 * 1000;

@Injectable()
export class UserVerificationService
  extends BaseService<UserVerificationEntity, string>
  implements UserVerificationServiceInterface {
  readonly name = 'UserVerificationService';

  constructor(
    @Inject(USER_VERIFICATION_REPO) private readonly repo: UserVerificationRepository,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) { super(); }

  async request(input: {
    userId: UserId;
    type: 'email' | 'phone' | 'kyc_document';
    ttlMs?: number;
  }): Promise<UserVerificationEntity> {
    const now = Date.now();
    // 6-digit code
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const entity = UserVerificationEntity.create({
      id: this.idGen.generate(),
      userId: input.userId,
      type: VerificationTypeVO.of(input.type),
      code: VerificationCodeVO.of(code),
      status: VerificationStatusVO.pending(),
      expiresAt: now + (input.ttlMs ?? DEFAULT_TTL_MS),
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    });
    return this.repo.save(entity);
  }

  async verify(input: {
    userId: UserId;
    code: string;
    type: 'email' | 'phone' | 'kyc_document';
  }): Promise<boolean> {
    const latest = await this.repo.findLatestByUserAndType(input.userId, input.type);
    if (!latest) return false;
    latest.verify(VerificationCodeVO.of(input.code), Date.now());
    await this.repo.save(latest);
    return true;
  }

  async getLatest(userId: UserId, type: string): Promise<UserVerificationEntity | null> {
    return this.repo.findLatestByUserAndType(userId, type);
  }

  toResponse(verification: UserVerificationEntity): UserVerificationResponseDTO {
    return {
      id: verification.id,
      userId: verification.userId,
      type: verification.type.value,
      status: verification.status.value as
        | 'pending' | 'verified' | 'rejected' | 'expired',
      expiresAt: new Date(verification.expiresAt).toISOString(),
      createdAt: verification.createdAt,
    };
  }
}
