/**
 * AuthBiometricControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { EnableBiometricHttpDTO } from '../dtos/requests/auth/enable-biometric.request.dto.js';
import type { DisableBiometricHttpDTO } from '../dtos/requests/auth/disable-biometric.request.dto.js';
import type { VerifyBiometricHttpDTO } from '../dtos/requests/auth/verify-biometric.request.dto.js';
import type { BiometricHttpResponseDTO } from '../dtos/responses/biometric/biometric.response.dto.js';

export class AuthBiometricControllerMapper {
  static toEnableAppDto(dto: EnableBiometricHttpDTO): unknown {
    return {
      type: dto.type,
      publicKeyHash: dto.publicKeyHash,
      deviceId: dto.deviceId,
    };
  }

  static toDisableAppDto(dto: DisableBiometricHttpDTO): { deviceId: string } {
    return { deviceId: dto.deviceId };
  }

  static toVerifyAppDto(dto: VerifyBiometricHttpDTO): unknown {
    return {
      deviceId: dto.deviceId,
      challengeResponse: dto.challengeResponse,
    };
  }

  static toHttpResponse(
    enabled: boolean,
    biometricId?: string,
    type?: string,
  ): BiometricHttpResponseDTO {
    return {
      success: true,
      enabled,
      biometricId,
      type,
      message: enabled ? 'Biometric enabled' : 'Biometric disabled',
    };
  }
}
