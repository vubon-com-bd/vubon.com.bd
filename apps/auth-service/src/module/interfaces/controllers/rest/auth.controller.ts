/**
 * AuthController — Core authentication endpoints
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller, Post, Body, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public } from '@vubon/shared-kernel/interfaces';

import { LoginCommand } from '../../../application/commands/auth/login.command';
import { RegisterCommand } from '../../../application/commands/auth/register.command';
import { RefreshTokenCommand } from '../../../application/commands/auth/refresh-token.command';
import { LogoutCommand } from '../../../application/commands/auth/logout.command';
import { ForgotPasswordCommand } from '../../../application/commands/auth/forgot-password.command';
import { ResetPasswordCommand } from '../../../application/commands/auth/reset-password.command';
import { VerifyEmailCommand } from '../../../application/commands/auth/verify-email.command';
import { ResendVerificationCommand } from '../../../application/commands/auth/resend-verification.command';
import type { LoginResponseDTO } from '../../../application/dtos/responses/login-response.dto';
import type { RegisterResponseDTO } from '../../../application/dtos/responses/register-response.dto';

import { AuthRequestDTO } from '../../dtos/requests/auth.request.dto';
import { TokenRequestDTO } from '../../dtos/requests/token.request.dto';
import { VerifyEmailRequestDTO, ResendVerificationRequestDTO } from '../../dtos/requests/verification.request.dto';
import { RecoverAccountRequestDTO } from '../../dtos/requests/recovery-code.request.dto';
import { AuthControllerMapper } from '../../mappers/auth.controller.mapper';
import { AuthSwagger } from '../../swagger/auth.swagger';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly mapper: AuthControllerMapper,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @AuthSwagger.Login()
  async login(@Body() body: AuthRequestDTO) {
    const result = await this.commandBus.execute<
      LoginCommand,
      LoginResponseDTO
    >(
      new LoginCommand({
        identifier: body.identifier,
        password: body.password,
        rememberMe: body.rememberMe ?? false,
        deviceId: body.deviceId,
        mfaCode: body.mfaCode,
      } as never),
    );
    return this.mapper.toLoginResponse(result);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @AuthSwagger.Register()
  async register(
    @Body() body: AuthRequestDTO & {
      firstName?: string;
      lastName?: string;
      acceptTerms?: boolean;
    },
  ) {
    const result = await this.commandBus.execute<
      RegisterCommand,
      RegisterResponseDTO
    >(
      new RegisterCommand({
        email: body.identifier,
        password: body.password,
        confirmPassword: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
        acceptTerms: true,
        acceptMarketing: false,
      } as never),
    );
    return this.mapper.toRegisterResponse(result);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @AuthSwagger.Refresh()
  async refresh(@Body() body: TokenRequestDTO) {
    return this.commandBus.execute(
      new RefreshTokenCommand({
        refreshToken: body.refreshToken,
        deviceId: body.deviceId,
      } as never),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AuthSwagger.Logout()
  async logout(@CurrentUser() user: AuthenticatedUser): Promise<void> {
    await this.commandBus.execute(
      new LogoutCommand({
        sessionId: user.sessionId,
        refreshToken: undefined,
      } as never),
    );
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.ACCEPTED)
  @AuthSwagger.ForgotPassword()
  async forgotPassword(
    @Body() body: { identifier: string; channel?: 'email' | 'sms' },
  ): Promise<void> {
    await this.commandBus.execute(
      new ForgotPasswordCommand({
        identifier: body.identifier,
        channel: body.channel ?? 'email',
      } as never),
    );
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AuthSwagger.ResetPassword()
  async resetPassword(
    @Body() body: RecoverAccountRequestDTO & { token?: string },
  ): Promise<void> {
    await this.commandBus.execute(
      new ResetPasswordCommand({
        token: body.token ?? '',
        newPassword: body.newPassword,
        confirmPassword: body.confirmPassword,
      } as never),
    );
  }

  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AuthSwagger.VerifyEmail()
  async verifyEmail(
    @Body() body: VerifyEmailRequestDTO & { token?: string },
  ): Promise<void> {
    await this.commandBus.execute(
      new VerifyEmailCommand({
        email: body.email,
        token: body.token ?? body.code,
      } as never),
    );
  }

  @Public()
  @Post('resend-verification')
  @HttpCode(HttpStatus.ACCEPTED)
  async resendVerification(
    @Body() body: ResendVerificationRequestDTO,
  ): Promise<void> {
    await this.commandBus.execute(
      new ResendVerificationCommand({
        email: body.identifier,
      } as never),
    );
  }
}
