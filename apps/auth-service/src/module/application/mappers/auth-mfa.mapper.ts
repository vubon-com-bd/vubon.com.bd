import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { AuthMfaEntity } from '../../domain/entities/auth-mfa.entity';
import type { MfaResponseDTO } from '../dtos/responses/mfa-response.dto';

export class AuthMfaMapper extends BaseMapper<AuthMfaEntity, MfaResponseDTO> {
  toTarget(source: AuthMfaEntity): MfaResponseDTO {
    return {
      success: true,
      method: source.type.value,
      secret: source.secret.value,
      qrCodeUrl: 'https://example.com/qr',
      otpauthUrl: 'otpauth://totp/example',
      backupCodes: [],
      setupAt: source.createdAt,
    };
  }

  toSource(target: MfaResponseDTO): AuthMfaEntity {
    void target;
    throw new Error('AuthMfaMapper.toSource not supported');
  }
}
