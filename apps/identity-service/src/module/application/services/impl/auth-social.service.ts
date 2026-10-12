/**
 * Auth Social Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthSocialServiceInterface, LinkSocialInput } from '../interfaces/auth-social.service.interface.js';
import type { SocialAccountRepository } from '../../../domain/repositories/social-account.repository.interface.js';
import { SOCIAL_ACCOUNT_REPOSITORY } from '../../../domain/repositories/social-account.repository.interface.js';
import type { SocialAccountEntity } from '../../../domain/entities/social-account.entity.js';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto.js';
import type { SocialLoginRequestDTO } from '../../dtos/requests/auth/social-login.dto.js';
import { SocialAccountLinkerService } from '../../../domain/services/social-account-linker.service.js';

@Injectable()
export class AuthSocialService extends BaseService implements AuthSocialServiceInterface {
  readonly name = 'AuthSocialService';

  constructor(@Inject(SOCIAL_ACCOUNT_REPOSITORY) private readonly repo: SocialAccountRepository) { super(); }

  async login(input: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO> {
    SocialAccountLinkerService.assertSupported(input.provider);
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
      isNewUser: false,
      provider: input.provider,
    };
  }

  async link(input: LinkSocialInput): Promise<SocialAccountEntity> {
    SocialAccountLinkerService.assertSupported(input.provider);
    throw new Error('Not implemented');
  }

  async unlink(_authId: string, _provider: string): Promise<void> {}

  async listForUser(userId: string): Promise<readonly SocialAccountEntity[]> {
    return this.repo.findByUserId({ value: userId } as never);
  }
}
