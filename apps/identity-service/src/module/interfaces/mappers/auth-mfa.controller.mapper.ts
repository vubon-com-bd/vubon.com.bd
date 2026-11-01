/**
 * AuthMfaControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { EnableMfaHttpDTO, DisableMfaHttpDTO } from '../dtos/requests/auth/enable-mfa.request.dto.js';
import type { VerifyMfaHttpDTO } from '../dtos/requests/auth/verify-mfa.request.dto.js';
import type { SetupMfaHttpDTO } from '../dtos/requests/auth/setup-mfa.request.dto.js';
import type { VerifyBackupCodeHttpDTO } from '../dtos/requests/auth/verify-backup-code.request.dto.js';

import type { MfaSetupHttpResponseDTO, MfaVerifyHttpResponseDTO, MfaDisableHttpResponseDTO, MfaChallengeHttpResponseDTO } from '../dtos/responses/mfa/index.js';

export class AuthMfaControllerMapper {
  static toEnableAppDto(dto: EnableMfaHttpDTO): { method: string; code?: string } {
    return { method: dto.method, code: dto.code };
  }

  static toDisableAppDto(dto: DisableMfaHttpDTO): { password: string; code?: string } {
    return { password: dto.password, code: dto.code };
  }

  static toVerifyAppDto(dto: VerifyMfaHttpDTO): unknown {
    return {
      challengeId: dto.challengeId,
      code: dto.code,
      method: dto.method,
      rememberDevice: dto.rememberDevice ?? false,
    };
  }

  static toSetupAppDto(dto: SetupMfaHttpDTO): { method: string } {
    return { method: dto.method };
  }

  static toVerifyBackupCodeAppDto(dto: VerifyBackupCodeHttpDTO): { challengeId: string; code: string } {
    return { challengeId: dto.challengeId, code: dto.code };
  }

  static toSetupHttpResponse(app: {
    secret: string;
    qrCodeUrl: string;
    otpauthUrl: string;
    backupCodes: readonly string[];
  }): MfaSetupHttpResponseDTO {
    return {
      success: true,
      method: 'totp',
      secret: app.secret,
      otpauthUrl: app.otpauthUrl,
      qrCodeUrl: app.qrCodeUrl,
      backupCodes: app.backupCodes,
      setupAt: new Date().toISOString(),
    };
  }

  static toVerifyHttpResponse(app: {
    verified: boolean;
    method?: string;
    remainingBackupCodes?: number;
  }): MfaVerifyHttpResponseDTO {
    return {
      success: true,
      verified: app.verified,
      method: app.method ?? 'totp',
      usedBackupCode: false,
      remainingBackupCodes: app.remainingBackupCodes ?? 0,
      verifiedAt: new Date().toISOString(),
    };
  }

  static toDisableHttpResponse(): MfaDisableHttpResponseDTO {
    return { success: true, enabled: false, message: 'MFA disabled' };
  }

  static toChallengeHttpResponse(app: {
    challengeId: string;
    mfaMethods: readonly string[];
    expiresAt: string;
  }): MfaChallengeHttpResponseDTO {
    return {
      success: true,
      challengeId: app.challengeId,
      mfaMethods: app.mfaMethods,
      expiresAt: app.expiresAt,
    };
  }
}
