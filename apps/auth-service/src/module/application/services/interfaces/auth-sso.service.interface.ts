import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthSsoEntity } from '../../../domain/entities/auth-sso.entity';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto';

export interface AuthSsoServiceInterface
  extends BaseServiceInterface<AuthSsoEntity, string> {
  login(provider: string, externalId: string): Promise<SsoLoginResponseDTO>;
  callback(provider: string, token: string): Promise<SsoLoginResponseDTO>;
  link(userId: string, provider: string, externalId: string): Promise<void>;
  unlink(userId: string, provider: string): Promise<void>;
}
