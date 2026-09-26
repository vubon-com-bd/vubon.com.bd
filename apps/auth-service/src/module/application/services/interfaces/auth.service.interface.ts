/**
 * AuthServiceInterface — Core authentication service contract
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { UserEntity } from '../../../domain/entities/user.entity';
import type { LoginRequestDTO } from '../../dtos/requests/auth/login.dto';
import type { RegisterRequestDTO } from '../../dtos/requests/auth/register.dto';
import type { LogoutRequestDTO } from '../../dtos/requests/auth/logout.dto';
import type { ForgotPasswordRequestDTO } from '../../dtos/requests/auth/forgot-password.dto';
import type { ResetPasswordRequestDTO } from '../../dtos/requests/auth/reset-password.dto';
import type { VerifyEmailRequestDTO } from '../../dtos/requests/auth/verify-email.dto';
import type { LoginResponseDTO, LoginMfaRequiredResponseDTO } from '../../dtos/responses/login-response.dto';
import type { RegisterResponseDTO } from '../../dtos/responses/register-response.dto';

export interface AuthServiceInterface
  extends BaseServiceInterface<UserEntity, UserId> {
  login(
    input: LoginRequestDTO,
    ctx?: { ip?: string; userAgent?: string },
  ): Promise<LoginResponseDTO | LoginMfaRequiredResponseDTO>;

  register(
    input: RegisterRequestDTO,
    ctx?: { ip?: string; userAgent?: string },
  ): Promise<RegisterResponseDTO>;

  logout(input: LogoutRequestDTO): Promise<void>;

  forgotPassword(input: ForgotPasswordRequestDTO): Promise<void>;

  resetPassword(input: ResetPasswordRequestDTO): Promise<void>;

  verifyEmail(input: VerifyEmailRequestDTO): Promise<void>;
}
