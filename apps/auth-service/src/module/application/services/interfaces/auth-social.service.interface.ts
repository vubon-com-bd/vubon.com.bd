/**
 * AuthSocialServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthSocialEntity } from '../../../domain/entities/auth-social.entity';
import type { SocialLoginRequestDTO } from '../../dtos/requests/auth/social-login.dto';
import type { SocialCallbackRequestDTO } from '../../dtos/requests/auth/social-callback.dto';
import type { LinkSocialRequestDTO } from '../../dtos/requests/auth/link-social.dto';
import type { UnlinkSocialRequestDTO } from '../../dtos/requests/auth/unlink-social.dto';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto';

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
