/**
 * Auth Social Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SocialAccountEntity } from '../../../domain/entities/social-account.entity.js';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto.js';
import type { SocialLoginRequestDTO } from '../../dtos/requests/auth/social-login.dto.js';

export const AUTH_SOCIAL_SERVICE = Symbol('AUTH_SOCIAL_SERVICE');

export interface LinkSocialInput {
  readonly authId: string;
  readonly userId: string;
  readonly provider: string;
  readonly providerUserId: string;
  readonly email?: string;
  readonly name?: string;
  readonly avatarUrl?: string;
}

export interface AuthSocialServiceInterface extends BaseServiceInterface<SocialAccountEntity, string> {
  login(input: SocialLoginRequestDTO): Promise<SocialLoginResponseDTO>;
  link(input: LinkSocialInput): Promise<SocialAccountEntity>;
  unlink(authId: string, provider: string): Promise<void>;
  listForUser(userId: string): Promise<readonly SocialAccountEntity[]>;
}
