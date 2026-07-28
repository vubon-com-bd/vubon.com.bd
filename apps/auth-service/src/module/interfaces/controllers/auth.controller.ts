/**
 * Auth Controller
 * HTTP API endpoints for authentication
 * Currently only registration endpoint is implemented
 * Other endpoints (login, logout, etc.) will be added in later phases
 */

import { Controller, Post, Body, UsePipes, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { AuthServiceImpl } from '../../application/services/impl/auth.service.impl.js';
import { RegisterRequestDto } from '../dtos/auth/register.request.dto.js';
import { RegisterResponseDto } from '../dtos/auth/register.response.dto.js';
import { AuthMapper } from '../mappers/auth.mapper.js';
import { RegisterSchema } from '../validators/auth.validator.js';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.js';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthServiceImpl) {}

  /**
   * Register a new user
   * POST /auth/register
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(@Body() requestDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    this.logger.log(`Registration request received for: ${requestDto.email}`);

    // Sanitize input
    requestDto.sanitize();

    // Map to application DTO
    const registerDto = AuthMapper.toRegisterDto(requestDto);

    // Execute registration
    const authResponse = await this.authService.register(registerDto);

    // Map response
    return AuthMapper.toRegisterResponseDto(authResponse);
  }

  // ============================================
  // FUTURE ENDPOINTS (to be added in later phases)
  // ============================================

  /*
   * Login endpoint
   * POST /auth/login
   */
  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
  //   this.logger.log('Login endpoint - to be implemented in phase 3');
  //   // TODO: Implement login logic in phase 3
  //   throw new Error('Login endpoint not yet implemented');
  // }

  /*
   * Logout endpoint
   * POST /auth/logout
   */
  // @Post('logout')
  // @HttpCode(HttpStatus.OK)
  // async logout(@Req() req: Request): Promise<{ message: string }> {
  //   this.logger.log('Logout endpoint - to be implemented in phase 3');
  //   // TODO: Implement logout logic in phase 3
  //   throw new Error('Logout endpoint not yet implemented');
  // }

  /*
   * Refresh token endpoint
   * POST /auth/refresh
   */
  // @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  // async refreshToken(@Body() refreshDto: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
  //   this.logger.log('Refresh token endpoint - to be implemented in phase 3');
  //   // TODO: Implement refresh token logic in phase 3
  //   throw new Error('Refresh token endpoint not yet implemented');
  // }

  /*
   * Verify email endpoint
   * GET /auth/verify-email/:token
   */
  // @Get('verify-email/:token')
  // @HttpCode(HttpStatus.OK)
  // async verifyEmail(@Param('token') token: string): Promise<{ message: string }> {
  //   this.logger.log('Verify email endpoint - to be implemented in phase 3');
  //   // TODO: Implement email verification in phase 3
  //   throw new Error('Verify email endpoint not yet implemented');
  // }

  /*
   * Forgot password endpoint
   * POST /auth/forgot-password
   */
  // @Post('forgot-password')
  // @HttpCode(HttpStatus.OK)
  // async forgotPassword(@Body() forgotDto: ForgotPasswordRequestDto): Promise<{ message: string }> {
  //   this.logger.log('Forgot password endpoint - to be implemented in phase 3');
  //   // TODO: Implement forgot password in phase 3
  //   throw new Error('Forgot password endpoint not yet implemented');
  // }

  /*
   * Reset password endpoint
   * POST /auth/reset-password
   */
  // @Post('reset-password')
  // @HttpCode(HttpStatus.OK)
  // async resetPassword(@Body() resetDto: ResetPasswordRequestDto): Promise<{ message: string }> {
  //   this.logger.log('Reset password endpoint - to be implemented in phase 3');
  //   // TODO: Implement reset password in phase 3
  //   throw new Error('Reset password endpoint not yet implemented');
  // }
}
