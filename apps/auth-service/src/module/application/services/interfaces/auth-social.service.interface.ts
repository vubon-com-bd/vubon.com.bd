/**
 * AuthSocialServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthSocialEntity } from '../../../domain/entities/auth-social.entity.js';
import type { SocialLoginRequestDTO } from '../../dtos/requests/auth/social-login.dto.js';
import type { SocialCallbackRequestDTO } from '../../dtos/requests/auth/social-callback.dto.js';
import type { LinkSocialRequestDTO } from '../../dtos/requests/auth/link-social.dto.js';
import type { UnlinkSocialRequestDTO } from '../../dtos/requests/auth/unlink-social.dto.js';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto.js';

export interface AuthSocialServiceInterface
  extends BaseServiceInterface<AuthSocialEntity, string> {
  initiateLogin(
    input: SocialLoginRequestDTO,
  ): Promise<{ authUrl: string; state: string }>;

  handleCallback(
    input: SocialCallbackRequestDTO,
  ): Promise<SocialLoginResponseDTO>;

  link(userId: UserId, input: LinkSocialRequestDTO): Promise<void>;

  unlink(userId: UserId, input: UnlinkSocialRequestDTO): Promise<void>;

  listForUser(userId: UserId): Promise<readonly AuthSocialEntity[]>;
}
