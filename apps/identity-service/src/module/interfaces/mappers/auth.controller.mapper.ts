/**
 * AuthControllerMapper — HTTP DTO ↔ Application DTO
 * @module identity-service/interfaces/mappers
 */
import type { LoginHttpDTO } from '../dtos/requests/auth/login.request.dto.js';
import type { RegisterHttpDTO } from '../dtos/requests/auth/register.request.dto.js';
import type { RefreshTokenHttpDTO } from '../dtos/requests/auth/refresh-token.request.dto.js';
import type { LogoutHttpDTO } from '../dtos/requests/auth/logout.request.dto.js';
import type { ForgotPasswordHttpDTO } from '../dtos/requests/auth/forgot-password.request.dto.js';
import type { ResetPasswordHttpDTO } from '../dtos/requests/auth/reset-password.request.dto.js';
import type { VerifyEmailHttpDTO, ResendVerificationHttpDTO } from '../dtos/requests/auth/verify-email.request.dto.js';

import type { LoginRequestDTO } from '../../application/dtos/requests/auth/login.dto.js';
import type { RegisterRequestDTO } from '../../application/dtos/requests/auth/register.dto.js';
import type { RefreshTokenRequestDTO } from '../../application/dtos/requests/auth/refresh-token.dto.js';
import type { LogoutRequestDTO } from '../../application/dtos/requests/auth/logout.dto.js';
import type { ForgotPasswordRequestDTO } from '../../application/dtos/requests/auth/forgot-password.dto.js';
import type { ResetPasswordRequestDTO } from '../../application/dtos/requests/auth/reset-password.dto.js';
import type { VerifyEmailRequestDTO } from '../../application/dtos/requests/auth/verify-email.dto.js';
import type { ResendVerificationRequestDTO } from '../../application/dtos/requests/auth/resend-verification.dto.js';

export class AuthControllerMapper {
  // ═══ HTTP → App ═══
  static toLoginAppDto(dto: LoginHttpDTO): LoginRequestDTO {
    return {
      identifier: dto.identifier,
      password: dto.password,
      rememberMe: dto.rememberMe ?? false,
      deviceId: dto.deviceId,
      mfaCode: dto.mfaCode,
    } as unknown as LoginRequestDTO;
  }

  static toRegisterAppDto(dto: RegisterHttpDTO): RegisterRequestDTO {
    return {
      email: dto.email,
      phone: dto.phone,
      username: dto.username,
      password: dto.password,
      confirmPassword: dto.confirmPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      acceptTerms: dto.acceptTerms,
      acceptMarketing: dto.acceptMarketing ?? false,
      referralCode: dto.referralCode,
      deviceId: dto.deviceId,
    } as unknown as RegisterRequestDTO;
  }

  static toRefreshAppDto(dto: RefreshTokenHttpDTO): RefreshTokenRequestDTO {
    return { refreshToken: dto.refreshToken } as unknown as RefreshTokenRequestDTO;
  }

  static toLogoutAppDto(dto: LogoutHttpDTO): LogoutRequestDTO {
    return {
      sessionId: dto.sessionId,
      allDevices: dto.allDevices ?? false,
      refreshToken: dto.refreshToken,
    } as unknown as LogoutRequestDTO;
  }

  static toForgotPasswordAppDto(dto: ForgotPasswordHttpDTO): ForgotPasswordRequestDTO {
    return {
      identifier: dto.identifier,
      channel: dto.channel ?? 'email',
    } as unknown as ForgotPasswordRequestDTO;
  }

  static toResetPasswordAppDto(dto: ResetPasswordHttpDTO): ResetPasswordRequestDTO {
    return {
      token: dto.token,
      newPassword: dto.newPassword,
      confirmPassword: dto.confirmPassword,
    } as unknown as ResetPasswordRequestDTO;
  }

  static toVerifyEmailAppDto(dto: VerifyEmailHttpDTO): VerifyEmailRequestDTO {
    return { email: dto.email, token: dto.token } as unknown as VerifyEmailRequestDTO;
  }

  static toResendVerificationAppDto(
    dto: ResendVerificationHttpDTO,
  ): ResendVerificationRequestDTO {
    return { email: dto.email } as unknown as ResendVerificationRequestDTO;
  }

  // ═══ App → HTTP (Response) ═══
  static toHttpResponse(app: unknown): unknown {
    return app;
  }
}
