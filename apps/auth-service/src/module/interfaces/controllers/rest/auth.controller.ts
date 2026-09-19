import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Public,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { LoginCommand } from '../../../application/commands/auth/login.command';
import { RegisterCommand } from '../../../application/commands/auth/register.command';
import { RefreshTokenCommand } from '../../../application/commands/auth/refresh-token.command';
import { LogoutCommand } from '../../../application/commands/auth/logout.command';
import { ForgotPasswordCommand } from '../../../application/commands/auth/forgot-password.command';
import { ResetPasswordCommand } from '../../../application/commands/auth/reset-password.command';
import { VerifyEmailCommand } from '../../../application/commands/auth/verify-email.command';
import { ResendVerificationCommand } from '../../../application/commands/auth/resend-verification.command';
import {
  AuthLoginRequestDTO,
  AuthRegisterRequestDTO,
  AuthRefreshTokenRequestDTO,
  AuthForgotPasswordRequestDTO,
  AuthResetPasswordRequestDTO,
  AuthVerifyEmailRequestDTO,
  AuthResendVerificationRequestDTO,
} from '../../dtos/requests/auth.request.dto';
import { AuthSwagger } from '../../swagger/auth.swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @AuthSwagger.Login()
  @ApiResponse({ status: 200 })
  async login(@Body() body: AuthLoginRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new LoginCommand(
        body.identifier,
        body.password,
        body.rememberMe ?? false,
        body.deviceId,
        body.mfaCode,
      ),
    );
  }

  @Public()
  @Post('register')
  @AuthSwagger.Register()
  async register(@Body() body: AuthRegisterRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new RegisterCommand(
        body.email,
        body.password,
        body.confirmPassword,
        body.acceptTerms,
        body.acceptMarketing ?? false,
        body.phone,
        body.username,
        body.firstName,
        body.lastName,
        body.deviceId,
      ),
    );
  }

  @Public()
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: AuthRefreshTokenRequestDTO): Promise<unknown> {
    return this.commandBus.execute(new RefreshTokenCommand(body.refreshToken));
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@CurrentUser() user: CurrentUserShape): Promise<void> {
    return this.commandBus.execute(new LogoutCommand(user.sessionId ?? ''));
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() body: AuthForgotPasswordRequestDTO): Promise<void> {
    return this.commandBus.execute(new ForgotPasswordCommand(body.email));
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(@Body() body: AuthResetPasswordRequestDTO): Promise<void> {
    return this.commandBus.execute(
      new ResetPasswordCommand(body.token, body.newPassword, body.confirmPassword),
    );
  }

  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  async verifyEmail(@Body() body: AuthVerifyEmailRequestDTO): Promise<void> {
    return this.commandBus.execute(new VerifyEmailCommand(body.userId, body.code));
  }

  @Public()
  @Post('resend-verification')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendVerification(@Body() body: AuthResendVerificationRequestDTO): Promise<void> {
    return this.commandBus.execute(new ResendVerificationCommand(body.email));
  }
}
