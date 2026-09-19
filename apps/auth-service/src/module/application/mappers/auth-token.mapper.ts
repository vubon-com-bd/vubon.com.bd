import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { AuthTokenEntity } from '../../domain/entities/auth-token.entity';
import type { AuthTokenResponseDTO } from '../dtos/responses/auth-token-response.dto';

export class AuthTokenMapper extends BaseMapper<
  AuthTokenEntity,
  AuthTokenResponseDTO
> {
  toTarget(source: AuthTokenEntity): AuthTokenResponseDTO {
    return {
      accessToken: source.tokenValue.value,
      refreshToken: source.tokenValue.value,
      accessExpiresAt: source.expiry.epochMs,
      refreshExpiresAt: source.expiry.epochMs,
      tokenType: 'Bearer',
    };
  }

  toSource(target: AuthTokenResponseDTO): AuthTokenEntity {
    void target;
    throw new Error('AuthTokenMapper.toSource not supported');
  }
}
