/**
 * AuthSsoControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { SsoLoginHttpDTO } from '../dtos/requests/auth/sso-login.request.dto.js';
import type { SsoLoginResponseDTO } from '../../application/dtos/responses/sso-login-response.dto.js';
import type { SsoLoginHttpResponseDTO } from '../dtos/responses/sso/sso-login.response.dto.js';

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

export class AuthSsoControllerMapper {
  static toLoginAppDto(dto: SsoLoginHttpDTO): unknown {
    return {
      providerId: dto.providerId,
      relayState: dto.relayState,
      returnUrl: dto.returnUrl,
    };
  }

  static toHttpResponse(app: SsoLoginResponseDTO): SsoLoginHttpResponseDTO {
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
      provider: app.provider,
      isNewUser: app.isNewUser,
    };
  }
}
