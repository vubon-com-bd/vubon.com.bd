import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthMfaServiceInterface } from '../interfaces/auth-mfa.service.interface';
import type { AuthMfaRepository } from '../../../domain/repositories/auth-mfa.repository.interface';
import { AuthMfaEntity } from '../../../domain/entities/auth-mfa.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { MfaSecretVO } from '../../../domain/value-objects/primitives/mfa-secret.vo';
import { MfaTypeVO } from '../../../domain/value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../../../domain/value-objects/primitives/mfa-status.vo';
import { MfaVerificationFailedError } from '../../errors/mfa.errors';
import type { MfaResponseDTO } from '../../dtos/responses/mfa-response.dto';
import type { MfaValidatorPort } from '../../ports/mfa-validator.port';

@Injectable()
export class AuthMfaService
  extends BaseService<AuthMfaEntity, string>
  implements AuthMfaServiceInterface
{
  readonly name = 'AuthMfaService';

  constructor(
    @Inject('AuthMfaRepository') private readonly mfaRepo: AuthMfaRepository,
    @Inject('MfaValidatorPort') private readonly mfaValidator: MfaValidatorPort,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async setup(userId: string, method: string): Promise<MfaResponseDTO> {
    const setup = await this.mfaValidator.generateSecret();
    const entity = AuthMfaEntity.create({
      userId: UserIdVO.create(userId),
      secret: MfaSecretVO.create(setup.secret),
      type: MfaTypeVO.create(method),
      status: MfaStatusVO.create('pending'),
      enabledAt: null,
      lastVerifiedAt: null,
    });
    await this.mfaRepo.save(entity);

    return {
      success: true,
      method,
      secret: setup.secret,
      qrCodeUrl: setup.qrCodeDataUrl,
      otpauthUrl: setup.otpauthUrl,
      backupCodes: [],
      setupAt: new Date().toISOString(),
    };
  }

  async verify(userId: string, code: string): Promise<boolean> {
    const entity = await this.mfaRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) {
      throw new MfaVerificationFailedError('MFA not configured');
    }
    const valid = await this.mfaValidator.verify(entity.secret.value, code);
    if (!valid) {
      return false;
    }
    const verified = entity.verify();
    const enabled = verified.enable();
    await this.mfaRepo.save(enabled);
    const events = enabled.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
    return true;
  }

  async disable(userId: string): Promise<void> {
    const entity = await this.mfaRepo.findByUserId(UserIdVO.create(userId));
    if (!entity) return;
    const disabled = entity.disable();
    await this.mfaRepo.save(disabled);
    const events = disabled.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }

  async isEnabled(userId: string): Promise<boolean> {
    const entity = await this.mfaRepo.findByUserId(UserIdVO.create(userId));
    return entity?.isEnabled ?? false;
  }
}
