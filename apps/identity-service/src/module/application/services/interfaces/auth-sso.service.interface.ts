/**
 * Auth SSO Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SsoConfigEntity } from '../../../domain/entities/sso-config.entity.js';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto.js';
import type { SsoLoginRequestDTO } from '../../dtos/requests/auth/sso-login.dto.js';

export const AUTH_SSO_SERVICE = Symbol('AUTH_SSO_SERVICE');

export interface AuthSsoServiceInterface extends BaseServiceInterface<SsoConfigEntity, string> {
  login(input: SsoLoginRequestDTO): Promise<SsoLoginResponseDTO>;
  validateAssertion(configId: string, assertion: string): Promise<Record<string, string>>;
  logout(sessionId: string): Promise<void>;
}
