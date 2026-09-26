/**
 * AuthTokenServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthTokenEntity } from '../../../domain/entities/auth-token.entity';
import type { AuthTokenResponseDTO } from '../../dtos/responses/auth-token-response.dto';

export type TokenPurpose =
  | 'access'
  | 'refresh'
  | 'id'
  | 'password_reset'
  | 'email_verification'
  | 'invite'
  | 'api_key';

export interface AuthTokenServiceInterface
  extends BaseServiceInterface<AuthTokenEntity, string> {
  generate(input: {
    subjectId: string;
    purpose: TokenPurpose;
    metadata?: Readonly<Record<string, unknown>>;
    parentTokenId?: string;
  }): Promise<AuthTokenEntity>;

  generatePair(subjectId: string): Promise<AuthTokenResponseDTO>;

  verify(
    token: string,
    purpose?: TokenPurpose,
  ): Promise<AuthTokenEntity>;

  revoke(tokenId: string): Promise<void>;

  revokeAllForSubject(subjectId: string): Promise<number>;

  refresh(refreshToken: string): Promise<AuthTokenResponseDTO>;
}
