/**
 * AuthBiometricService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthBiometricServiceInterface } from '../interfaces/auth-biometric.service.interface';
import type { AuthBiometricRepository } from '../../../domain/repositories/auth-biometric.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import {
  AuthBiometricEntity,
  type BiometricKind,
} from '../../../domain/entities/auth-biometric.entity';
import { BiometricIdVO } from '../../../domain/value-objects/primitives/biometric-id.vo';
import { BiometricFailedAppError } from '../../errors/biometric.errors';
import type { EnableBiometricRequestDTO } from '../../dtos/requests/auth/enable-biometric.dto';
import type { DisableBiometricRequestDTO } from '../../dtos/requests/auth/disable-biometric.dto';
import type { VerifyBiometricRequestDTO } from '../../dtos/requests/auth/verify-biometric.dto';
import type { BiometricResponseDTO } from '../../dtos/responses/biometric-response.dto';
import { ID_GENERATOR } from '../tokens';
import { AUTH_BIOMETRIC_REPO } from '../../tokens';

@Injectable()
export class AuthBiometricService
  extends BaseService<AuthBiometricEntity, string>
  implements AuthBiometricServiceInterface {
  readonly name = 'AuthBiometricService';

  constructor(
    @Inject(AUTH_BIOMETRIC_REPO)
    private readonly repo: AuthBiometricRepository,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async enroll(
    userId: UserId,
    input: EnableBiometricRequestDTO,
  ): Promise<BiometricResponseDTO> {
    const now = Date.now();
    const entity = AuthBiometricEntity.create({
      id: this.idGen.generate(),
      userId,
      biometricId: BiometricIdVO.of(input.biometricId),
      kind: input.kind as BiometricKind,
      deviceId: input.deviceId,
      enrolledAt: now,
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    });
    await this.repo.save(entity);
    return {
      enabled: true,
      biometricId: input.biometricId,
      kind: input.kind as BiometricResponseDTO['kind'],
      enrolledAt: new Date(now).toISOString(),
      deviceId: input.deviceId,
    };
  }

  async remove(
    userId: UserId,
    input: DisableBiometricRequestDTO,
  ): Promise<void> {
    const list = await this.repo.findByUser(userId);
    const target = list.find((e) => e.biometricId.value === input.biometricId);
    if (target) {
      await this.repo.delete(target.id);
    }
  }

  async verify(input: VerifyBiometricRequestDTO): Promise<boolean> {
    const found = await this.repo.findByBiometricId(
      BiometricIdVO.of(input.biometricId),
    );
    if (!found) {
      throw new BiometricFailedAppError('Enrollment not found');
    }
    // Real impl would verify challenge against device attestation.
    return input.challenge.length > 0;
  }

  async listForUser(userId: UserId): Promise<readonly AuthBiometricEntity[]> {
    return this.repo.findByUser(userId);
  }
}
