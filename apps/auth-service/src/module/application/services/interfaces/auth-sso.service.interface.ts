/**
 * AuthSsoServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthSsoEntity } from '../../../domain/entities/auth-sso.entity';
import type { SsoLoginRequestDTO } from '../../dtos/requests/auth/sso-login.dto';
import type { SsoCallbackRequestDTO } from '../../dtos/requests/auth/sso-callback.dto';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto';

export interface AuthSsoServiceInterface
  extends BaseServiceInterface<AuthSsoEntity, string> {
  initiateLogin(
    input: SsoLoginRequestDTO,
  ): Promise<{ redirectUrl: string; state: string }>;

  handleCallback(
    input: SsoCallbackRequestDTO,
  ): Promise<SsoLoginResponseDTO>;

  listForUser(userId: UserId): Promise<readonly AuthSsoEntity[]>;

  revoke(userId: UserId, tenantId: string): Promise<void>;
}
