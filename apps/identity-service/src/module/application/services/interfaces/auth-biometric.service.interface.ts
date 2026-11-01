/**
 * Auth Biometric Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthBiometricEntity } from '../../../domain/entities/auth-biometric.entity.js';
import type { BiometricResponseDTO } from '../../dtos/responses/biometric-response.dto.js';
import type { EnableBiometricRequestDTO } from '../../dtos/requests/auth/enable-biometric.dto.js';
import type { VerifyBiometricRequestDTO } from '../../dtos/requests/auth/verify-biometric.dto.js';

export const AUTH_BIOMETRIC_SERVICE = Symbol('AUTH_BIOMETRIC_SERVICE');

export interface AuthBiometricServiceInterface extends BaseServiceInterface<AuthBiometricEntity, string> {
  enable(authId: string, input: EnableBiometricRequestDTO): Promise<BiometricResponseDTO>;
  disable(authId: string, deviceId: string): Promise<BiometricResponseDTO>;
  verify(authId: string, input: VerifyBiometricRequestDTO): Promise<boolean>;
  listForAuth(authId: string): Promise<readonly AuthBiometricEntity[]>;
}
