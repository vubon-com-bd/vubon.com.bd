/**
 * AuthBiometricServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthBiometricEntity } from '../../../domain/entities/auth-biometric.entity.js';
import type { EnableBiometricRequestDTO } from '../../dtos/requests/auth/enable-biometric.dto.js';
import type { DisableBiometricRequestDTO } from '../../dtos/requests/auth/disable-biometric.dto.js';
import type { VerifyBiometricRequestDTO } from '../../dtos/requests/auth/verify-biometric.dto.js';
import type { BiometricResponseDTO } from '../../dtos/responses/biometric-response.dto.js';

export interface AuthBiometricServiceInterface
  extends BaseServiceInterface<AuthBiometricEntity, string> {
  enroll(
    userId: UserId,
    input: EnableBiometricRequestDTO,
  ): Promise<BiometricResponseDTO>;

  remove(userId: UserId, input: DisableBiometricRequestDTO): Promise<void>;

  verify(input: VerifyBiometricRequestDTO): Promise<boolean>;

  listForUser(userId: UserId): Promise<readonly AuthBiometricEntity[]>;
}
