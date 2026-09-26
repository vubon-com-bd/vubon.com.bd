/**
 * AuthMfaService — TOTP enrollment + verification
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthMfaServiceInterface } from '../interfaces/auth-mfa.service.interface';
import type { AuthMfaRepository } from '../../../domain/repositories/auth-mfa.repository.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { TotpServiceInterface } from '../interfaces/totp.service.interface';
import type { RecoveryCodeGeneratorServiceInterface } from '../interfaces/recovery-code-generator.service.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { AuthMfaEntity } from '../../../domain/entities/auth-mfa.entity';
import { MfaSecretVO } from '../../../domain/value-objects/primitives/mfa-secret.vo';
import { MfaTypeVO } from '../../../domain/value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../../../domain/value-objects/primitives/mfa-status.vo';
import {
  MfaAlreadyEnabledAppError,
  MfaInvalidAppError,
  MfaNotFoundAppError,
} from '../../errors/mfa.errors';
import type {
  MfaResponseDTO,
  MfaChallengeResponseDTO,
} from '../../dtos/responses/mfa-response.dto';
import type { EnableMfaRequestDTO } from '../../dtos/requests/auth/enable-mfa.dto';
import type { DisableMfaRequestDTO } from '../../dtos/requests/auth/disable-mfa.dto';
import type { VerifyMfaRequestDTO } from '../../dtos/requests/auth/verify-mfa.dto';
import { ID_GENERATOR } from '../tokens';
import { AUTH_MFA_REPO, USER_REPO, TOTP_SERVICE, RECOVERY_CODE_GENERATOR } from '../../tokens';

const ISSUER = 'Vubon';
const RECOVERY_CODE_COUNT = 10;

@Injectable()
export class AuthMfaService
  extends BaseService<AuthMfaEntity, UserId>
  implements AuthMfaServiceInterface {
  readonly name = 'AuthMfaService';

  constructor(
    @Inject(AUTH_MFA_REPO) private readonly mfaRepo: AuthMfaRepository,
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
    @Inject(TOTP_SERVICE) private readonly totp: TotpServiceInterface,
    @Inject(RECOVERY_CODE_GENERATOR)
    private readonly recoveryGen: RecoveryCodeGeneratorServiceInterface,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async beginEnrollment(
    userId: UserId,
    input: EnableMfaRequestDTO,
  ): Promise<{ secret: string; qrCodeUrl: string; recoveryCodes: readonly string[] }> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new MfaNotFoundAppError(userId);

    const existing = await this.mfaRepo.findByUserId(userId);
    if (existing?.isEnabled()) {
      throw new MfaAlreadyEnabledAppError(userId);
    }

    const rawSecret = this.totp.generateSecret();
    const now = Date.now();

    const entity = AuthMfaEntity.create({
      id: existing?.id ?? this.idGen.generate(),
      userId,
      type: MfaTypeVO.of(input.method),
      status: MfaStatusVO.of('pending'),
      secret: MfaSecretVO.of(rawSecret),
      enrolledAt: now,
      createdAt: existing?.createdAt ?? new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    });
    await this.mfaRepo.save(entity);

    const qrCodeUrl = this.totp.buildOtpAuthUrl({
      secret: rawSecret,
      accountName: user.email.value,
      issuer: ISSUER,
    });

    const recoveryCodes = await this.recoveryGen.generate(RECOVERY_CODE_COUNT);

    return { secret: rawSecret, qrCodeUrl, recoveryCodes };
  }

  async confirmEnrollment(userId: UserId, code: string): Promise<MfaResponseDTO> {
    const mfa = await this.mfaRepo.findByUserId(userId);
    if (!mfa || !mfa.secret) {
      throw new MfaNotFoundAppError(userId);
    }
    const ok = await this.totp.verify({
      secret: mfa.secret.value,
      code,
    });
    if (!ok) throw new MfaInvalidAppError('Invalid code during enrollment');

    mfa.confirmEnrollment(Date.now());
    await this.mfaRepo.save(mfa);

    return {
      enabled: true,
      type: mfa.type.value,
      enrolledAt: mfa.createdAt,
      verifiedAt: new Date().toISOString(),
    };
  }

  async disable(userId: UserId, _input: DisableMfaRequestDTO): Promise<void> {
    const mfa = await this.mfaRepo.findByUserId(userId);
    if (!mfa) return;
    mfa.disable();
    await this.mfaRepo.save(mfa);
  }

  async verify(input: VerifyMfaRequestDTO, userId?: UserId): Promise<boolean> {
    const targetUserId = userId;
    if (!targetUserId) {
      throw new MfaInvalidAppError('userId required for verify');
    }
    const mfa = await this.mfaRepo.findByUserId(targetUserId);
    if (!mfa || !mfa.secret) throw new MfaNotFoundAppError(targetUserId);

    const ok = await this.totp.verify({
      secret: mfa.secret.value,
      code: input.code,
    });
    if (!ok) throw new MfaInvalidAppError();
    return true;
  }

  async getStatus(userId: UserId): Promise<MfaResponseDTO> {
    const mfa = await this.mfaRepo.findByUserId(userId);
    if (!mfa) {
      return { enabled: false, type: 'none' };
    }
    return {
      enabled: mfa.isEnabled(),
      type: mfa.type.value,
      enrolledAt: new Date(mfa.createdAt).toISOString(),
    };
  }

  async createChallenge(userId: UserId): Promise<MfaChallengeResponseDTO> {
    const mfa = await this.mfaRepo.findByUserId(userId);
    if (!mfa?.isEnabled()) throw new MfaNotFoundAppError(userId);
    const challengeId = this.idGen.generateUuid();
    return {
      challengeId,
      methods: [mfa.type.value],
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    };
  }
}
