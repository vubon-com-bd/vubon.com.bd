import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthRecoveryCodeServiceInterface } from '../interfaces/auth-recovery-code.service.interface';
import type { AuthRecoveryCodeRepository } from '../../../domain/repositories/auth-recovery-code.repository.interface';
import { AuthRecoveryCodeEntity } from '../../../domain/entities/auth-recovery-code.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { RecoveryCodeVO } from '../../../domain/value-objects/primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../../../domain/value-objects/primitives/recovery-code-status.vo';
import type { RecoveryCodesResponseDTO } from '../../dtos/responses/recovery-codes-response.dto';
import type { RecoveryCodeGeneratorPort } from '../../ports/recovery-code-generator.port';

@Injectable()
export class AuthRecoveryCodeService
  extends BaseService<AuthRecoveryCodeEntity, string>
  implements AuthRecoveryCodeServiceInterface
{
  readonly name = 'AuthRecoveryCodeService';

  constructor(
    private readonly recoveryCodeRepo: AuthRecoveryCodeRepository,
    private readonly recoveryCodeGenerator: RecoveryCodeGeneratorPort,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async generate(userId: string, count: number): Promise<RecoveryCodesResponseDTO> {
    const rawCodes = this.recoveryCodeGenerator.generate(count);
    const userIdVO = UserIdVO.create(userId);

    await this.recoveryCodeRepo.deleteAllForUser(userIdVO);

    const now = new Date().toISOString();
    const generated: RecoveryCodesResponseDTO['codes'][number][] = [];

    for (const raw of rawCodes) {
      const entity = AuthRecoveryCodeEntity.create({
        userId: userIdVO,
        code: RecoveryCodeVO.create(raw),
        status: RecoveryCodeStatusVO.create('active'),
        usedAt: null,
      });
      await this.recoveryCodeRepo.save(entity);
      generated.push({
        code: raw,
        createdAt: now,
        userId,
        used: false,
        usedAt: undefined,
      });
    }

    return {
      codes: generated,
      generatedAt: now,
    };
  }

  async consume(userId: string, code: string): Promise<boolean> {
    const userIdVO = UserIdVO.create(userId);
    const all = await this.recoveryCodeRepo.findByUserId(userIdVO);
    const normalized = this.recoveryCodeGenerator.normalize(code);
    const match = all.find((c) => !c.isUsed && c.code.value === normalized);
    if (!match) {
      return false;
    }
    await this.recoveryCodeRepo.markUsed(match.id);
    return true;
  }

  async revokeAll(userId: string): Promise<void> {
    await this.recoveryCodeRepo.deleteAllForUser(UserIdVO.create(userId));
  }
}
