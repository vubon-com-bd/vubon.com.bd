/**
 * AuthRecoveryCodeService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthRecoveryCodeServiceInterface } from '../interfaces/auth-recovery-code.service.interface';
import type { AuthRecoveryCodeRepository } from '../../../domain/repositories/auth-recovery-code.repository.interface';
import type { RecoveryCodeGeneratorServiceInterface } from '../interfaces/recovery-code-generator.service.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { AuthRecoveryCodeEntity } from '../../../domain/entities/auth-recovery-code.entity';
import { RecoveryCodeVO } from '../../../domain/value-objects/primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../../../domain/value-objects/primitives/recovery-code-status.vo';
import type { RecoveryCodesResponseDTO } from '../../dtos/responses/recovery-codes-response.dto';
import { ID_GENERATOR } from '../tokens';
import { RECOVERY_CODE_GENERATOR } from '../../tokens';
import { AUTH_RECOVERY_CODE_REPO } from '../../tokens';

const DEFAULT_COUNT = 10;

@Injectable()
export class AuthRecoveryCodeService
  extends BaseService<AuthRecoveryCodeEntity, string>
  implements AuthRecoveryCodeServiceInterface {
  readonly name = 'AuthRecoveryCodeService';

  constructor(
    @Inject(AUTH_RECOVERY_CODE_REPO)
    private readonly repo: AuthRecoveryCodeRepository,
    @Inject(RECOVERY_CODE_GENERATOR)
    private readonly generator: RecoveryCodeGeneratorServiceInterface,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async generateForUser(
    userId: UserId,
    count: number = DEFAULT_COUNT,
    invalidatePrevious = true,
  ): Promise<RecoveryCodesResponseDTO> {
    const now = Date.now();
    if (invalidatePrevious) {
      await this.repo.invalidateAllForUser(userId, now);
    }
    const codes = await this.generator.generate(count);
    const entities = await Promise.all(
      codes.map((code) => {
        const vo = RecoveryCodeVO.of(code);
        return this.repo.save(
          AuthRecoveryCodeEntity.create({
            id: this.idGen.generate(),
            userId,
            code: vo,
            status: RecoveryCodeStatusVO.active(),
            createdAt: new Date(now).toISOString(),
            updatedAt: new Date(now).toISOString(),
          }),
        );
      }),
    );
    void entities;
    return {
      codes,
      generatedAt: new Date(now).toISOString(),
    };
  }

  async consume(userId: UserId, code: string): Promise<boolean> {
    const vo = RecoveryCodeVO.of(code);
    const found = await this.repo.findByCode(userId, vo);
    if (!found || !found.isUsable()) return false;
    found.use(Date.now());
    await this.repo.save(found);
    return true;
  }

  async listActive(userId: UserId): Promise<readonly AuthRecoveryCodeEntity[]> {
    return this.repo.findActiveByUserId(userId);
  }

  async invalidateAll(userId: UserId): Promise<number> {
    return this.repo.invalidateAllForUser(userId, Date.now());
  }
}
