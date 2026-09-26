/**
 * AuthTokenMapper
 * @module auth-service/application/mappers
 */
import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { AuthTokenEntity } from '../../domain/entities/auth-token.entity';
import type { AuthTokenResponseDTO } from '../dtos/responses/auth-token-response.dto';

export class AuthTokenMapper
  extends BaseMapper<AuthTokenEntity, AuthTokenResponseDTO> {
  toTarget(token: AuthTokenEntity): AuthTokenResponseDTO {
    return {
      accessToken: token.value.value,
      refreshToken: '',
      tokenType: 'Bearer',
      expiresIn: Math.floor(token.expiry.remainingMs(Date.now()) / 1000),
      expiresAt: token.expiry.epochMs,
    };
  }

  toSource(_dto: AuthTokenResponseDTO): AuthTokenEntity {
    throw new Error('AuthTokenMapper.toSource is not supported');
  }
}
