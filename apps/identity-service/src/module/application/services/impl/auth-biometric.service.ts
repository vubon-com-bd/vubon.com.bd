import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthBiometricServiceInterface } from '../interfaces/auth-biometric.service.interface.js';
import type { AuthBiometricRepository } from '../../../domain/repositories/auth-biometric.repository.interface.js';
import { AUTH_BIOMETRIC_REPOSITORY } from '../../../domain/repositories/auth-biometric.repository.interface.js';
import type { AuthBiometricEntity } from '../../../domain/entities/auth-biometric.entity.js';
import type { BiometricResponseDTO } from '../../dtos/responses/biometric-response.dto.js';
import type { EnableBiometricRequestDTO } from '../../dtos/requests/auth/enable-biometric.dto.js';
import type { VerifyBiometricRequestDTO } from '../../dtos/requests/auth/verify-biometric.dto.js';

@Injectable()
export class AuthBiometricService extends BaseService implements AuthBiometricServiceInterface {
  readonly name = 'AuthBiometricService';
  constructor(@Inject(AUTH_BIOMETRIC_REPOSITORY) private readonly repo: AuthBiometricRepository) { super(); }
  async enable(_authId: string, _input: EnableBiometricRequestDTO): Promise<BiometricResponseDTO> {
    return { success: true, enabled: true };
  }
  async disable(_authId: string, _deviceId: string): Promise<BiometricResponseDTO> {
    return { success: true, enabled: false };
  }
  async verify(_authId: string, _input: VerifyBiometricRequestDTO): Promise<boolean> { return false; }
  async listForAuth(authId: string): Promise<readonly AuthBiometricEntity[]> {
    return this.repo.findByAuthIdRaw(authId);
  }
}
