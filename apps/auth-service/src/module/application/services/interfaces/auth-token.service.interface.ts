import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthTokenEntity } from '../../../domain/entities/auth-token.entity';
import type { AuthTokenResponseDTO } from '../../dtos/responses/auth-token-response.dto';

export interface AuthTokenServiceInterface
  extends BaseServiceInterface<AuthTokenEntity, string> {
  generatePair(userId: string): Promise<AuthTokenResponseDTO>;
  refresh(refreshToken: string): Promise<AuthTokenResponseDTO>;
  revoke(tokenId: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
}
