/**
 * Auth SSO Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthSsoServiceInterface } from '../interfaces/auth-sso.service.interface.js';
import type { SsoConfigRepository } from '../../../domain/repositories/sso-config.repository.interface.js';
import { SSO_CONFIG_REPOSITORY } from '../../../domain/repositories/sso-config.repository.interface.js';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto.js';
import type { SsoLoginRequestDTO } from '../../dtos/requests/auth/sso-login.dto.js';

@Injectable()
export class AuthSsoService extends BaseService implements AuthSsoServiceInterface {
  readonly name = 'AuthSsoService';

  constructor(@Inject(SSO_CONFIG_REPOSITORY) private readonly repo: SsoConfigRepository) { super(); }

  async login(input: SsoLoginRequestDTO): Promise<SsoLoginResponseDTO> {
    const now = new Date().toISOString();
    return {
      success: true,
      user: {
        id: '',
        email: '',
        status: 'pending',
        type: 'individual',
        roles: ['customer'],
        emailVerified: false,
        createdAt: now,
      },
      session: {
        id: '',
        userId: '',
        status: 'active',
        createdAt: now,
        lastAccessedAt: now,
        expiresAt: now,
        isCurrent: true,
      },
      tokens: {
        accessToken: '',
        refreshToken: '',
        tokenType: 'Bearer',
        expiresIn: 900,
        expiresAt: 0,
      },
      provider: input.providerId,
      isNewUser: false,
    };
  }

  async validateAssertion(_configId: string, _assertion: string): Promise<Record<string, string>> { return {}; }
  async logout(_sessionId: string): Promise<void> {}
}
