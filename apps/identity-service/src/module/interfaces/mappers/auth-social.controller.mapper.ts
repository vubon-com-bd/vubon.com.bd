/**
 * AuthSocialControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { SocialLoginHttpDTO } from '../dtos/requests/auth/social-login.request.dto.js';
import type { LinkSocialHttpDTO } from '../dtos/requests/auth/link-social.request.dto.js';
import type { UnlinkSocialHttpDTO } from '../dtos/requests/auth/unlink-social.request.dto.js';
import type { SocialLoginResponseDTO } from '../../application/dtos/responses/social-login-response.dto.js';
import type { SocialLoginHttpResponseDTO } from '../dtos/responses/social/social-login.response.dto.js';

interface SafePublicUser {
  readonly id: string;
  readonly email: string;
  readonly type: string;
  readonly status: string;
  readonly roles?: readonly string[];
  readonly emailVerified: boolean;
  readonly phoneVerified?: boolean;
  readonly isMfaEnabled?: boolean;
  readonly createdAt: string;
}

export class AuthSocialControllerMapper {
  static toLoginAppDto(dto: SocialLoginHttpDTO): unknown {
    return {
      provider: dto.provider,
      code: dto.code,
      redirectUri: dto.redirectUri,
      state: dto.state,
      deviceId: dto.deviceId,
    };
  }

  static toLinkAppDto(dto: LinkSocialHttpDTO): unknown {
    return {
      provider: dto.provider,
      code: dto.code,
      redirectUri: dto.redirectUri,
      state: dto.state,
    };
  }

  static toUnlinkAppDto(dto: UnlinkSocialHttpDTO): { provider: string } {
    return { provider: dto.provider };
  }

  static toHttpResponse(app: SocialLoginResponseDTO): SocialLoginHttpResponseDTO {
    const u = app.user as unknown as SafePublicUser;
    return {
      success: true,
      user: {
        id: u.id,
        userId: u.id,
        type: u.type,
        provider: app.provider,
        status: u.status,
        isEmailVerified: u.emailVerified,
        isPhoneVerified: u.phoneVerified ?? false,
        isMfaEnabled: u.isMfaEnabled ?? false,
      } as never,
      session: app.session as never,
      tokens: app.tokens as never,
      isNewUser: app.isNewUser,
      provider: app.provider,
    };
  }
}
