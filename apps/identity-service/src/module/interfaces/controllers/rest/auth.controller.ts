/**
 * AuthController — REST endpoints for authentication
 * @module identity-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard.js';
import {
  CurrentUser,
  Public,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { LoginCommand } from '../../../application/commands/auth/login.command.js';
import { RegisterCommand } from '../../../application/commands/auth/register.command.js';
import { RefreshTokenCommand } from '../../../application/commands/auth/refresh-token.command.js';
import { LogoutCommand } from '../../../application/commands/auth/logout.command.js';
import { ForgotPasswordCommand } from '../../../application/commands/auth/forgot-password.command.js';
import { ResetPasswordCommand } from '../../../application/commands/auth/reset-password.command.js';
import { VerifyEmailCommand } from '../../../application/commands/auth/verify-email.command.js';
import { ResendVerificationCommand } from '../../../application/commands/auth/resend-verification.command.js';

import { LoginHttpDTO } from '../../dtos/requests/auth/login.request.dto.js';
import { RegisterHttpDTO } from '../../dtos/requests/auth/register.request.dto.js';
import { RefreshTokenHttpDTO } from '../../dtos/requests/auth/refresh-token.request.dto.js';
import { LogoutHttpDTO } from '../../dtos/requests/auth/logout.request.dto.js';
import { ForgotPasswordHttpDTO } from '../../dtos/requests/auth/forgot-password.request.dto.js';
import { ResetPasswordHttpDTO } from '../../dtos/requests/auth/reset-password.request.dto.js';
import {
  VerifyEmailHttpDTO,
  ResendVerificationHttpDTO,
} from '../../dtos/requests/auth/verify-email.request.dto.js';

import type { LoginHttpResponseDTO } from '../../dtos/responses/auth/login.response.dto.js';
import type { RegisterHttpResponseDTO } from '../../dtos/responses/auth/register.response.dto.js';
import type { RefreshHttpResponseDTO } from '../../dtos/responses/auth/refresh.response.dto.js';
import type { LogoutHttpResponseDTO } from '../../dtos/responses/auth/logout.response.dto.js';

import { AuthControllerMapper } from '../../mappers/auth.controller.mapper.js';
import { ApiAuthTag, ApiLogin, ApiRegister, ApiRefreshToken, ApiLogout, ApiForgotPassword, ApiResetPassword, ApiVerifyEmail, ApiResendVerification } from '../../swagger/auth.swagger.js';

@ApiAuthTag()
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  // ═══ LOGIN ═══
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiLogin()
  async login(@Body() dto: LoginHttpDTO): Promise<LoginHttpResponseDTO> {
    const appDto = AuthControllerMapper.toLoginAppDto(dto);
    return this.commandBus.execute(new LoginCommand(appDto));
  }

  // ═══ REGISTER ═══
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiRegister()
  async register(@Body() dto: RegisterHttpDTO): Promise<RegisterHttpResponseDTO> {
    const appDto = AuthControllerMapper.toRegisterAppDto(dto);
    return this.commandBus.execute(new RegisterCommand(appDto));
  }

  // ═══ REFRESH TOKEN ═══
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiRefreshToken()
  async refresh(@Body() dto: RefreshTokenHttpDTO): Promise<RefreshHttpResponseDTO> {
    const appDto = AuthControllerMapper.toRefreshAppDto(dto);
    return this.commandBus.execute(new RefreshTokenCommand(appDto));
  }

  // ═══ LOGOUT ═══
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiLogout()
  async logout(
    @Body() dto: LogoutHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<LogoutHttpResponseDTO> {
    const appDto = AuthControllerMapper.toLogoutAppDto(dto);
    return this.commandBus.execute(new LogoutCommand(appDto, user.userId));
  }

  // ═══ FORGOT PASSWORD ═══
  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiForgotPassword()
  async forgotPassword(@Body() dto: ForgotPasswordHttpDTO): Promise<{ success: true; message: string }> {
    const appDto = AuthControllerMapper.toForgotPasswordAppDto(dto);
    return this.commandBus.execute(new ForgotPasswordCommand(appDto));
  }

  // ═══ RESET PASSWORD ═══
  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiResetPassword()
  async resetPassword(@Body() dto: ResetPasswordHttpDTO): Promise<{ success: true; message: string }> {
    const appDto = AuthControllerMapper.toResetPasswordAppDto(dto);
    return this.commandBus.execute(new ResetPasswordCommand(appDto));
  }

  // ═══ VERIFY EMAIL ═══
  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiVerifyEmail()
  async verifyEmail(@Body() dto: VerifyEmailHttpDTO): Promise<{ success: true; verified: boolean }> {
    const appDto = AuthControllerMapper.toVerifyEmailAppDto(dto);
    return this.commandBus.execute(new VerifyEmailCommand(appDto));
  }

  // ═══ RESEND VERIFICATION ═══
  @Public()
  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @ApiResendVerification()
  async resendVerification(@Body() dto: ResendVerificationHttpDTO): Promise<{ success: true; message: string }> {
    const appDto = AuthControllerMapper.toResendVerificationAppDto(dto);
    return this.commandBus.execute(new ResendVerificationCommand(appDto));
  }
}
