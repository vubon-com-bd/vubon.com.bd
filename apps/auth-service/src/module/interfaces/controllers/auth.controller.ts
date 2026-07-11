/**
 * Auth Controller - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/controllers/auth.controller
 *
 * @description
 * Authentication controller handling all auth-related HTTP endpoints.
 * Implements CQRS pattern with command/query separation.
 *
 * Enterprise Features:
 * ✅ CQRS pattern with CommandBus/QueryBus
 * ✅ Comprehensive Swagger documentation
 * ✅ Request/Response validation with Zod
 * ✅ Rate limiting per endpoint
 * ✅ Distributed tracing with correlation ID
 * ✅ Multi-language error messages (English/Bengali)
 * ✅ Security headers and guards
 * ✅ Audit logging
 * ✅ Bangladesh specific - Phone/Email verification
 * ✅ Device fingerprinting
 * ✅ Graceful error handling
 *
 * @example
 * // Register endpoint
 * POST /api/v1/auth/register
 * {
 *   "email": "user@vubon.com.bd",
 *   "password": "StrongP@ssw0rd123!",
 *   "fullName": "John Doe",
 *   "acceptTerms": true
 * }
 */

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Get,
  Req,
  Res,
  Logger,
  Inject,
  HttpException,
  BadRequestException,
  ConflictException,
  TooManyRequestsException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiSecurity,
  ApiHeader,
  ApiConsumes,
  ApiProduces,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request, Response } from 'express';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { v4 as uuidv4 } from 'uuid';

// Shared packages
import { 
  RATE_LIMITS, 
  AUDIT_ACTIONS, 
  API_PREFIXES,
  API_VERSIONS,
} from '@vubon/shared-constants';
import type { AuditMetadata } from '@vubon/shared-types';
import { maskEmail, maskPhone, normalizePhone } from '@vubon/shared-utils';

// Application layer - Commands & Queries
import { RegisterUserCommand } from '../../application/commands/auth/register-user.command';
import { GetCurrentUserQuery } from '../../application/queries/auth/get-current-user.query';

// Application layer - DTOs
import { RegisterRequestDto, RegisterResponseDto, RegistrationSuccessDto } from '../dtos/auth/register.request.dto';
import { LoginRequestDto, LoginResponseDto } from '../dtos/auth/login.request.dto';
import { RefreshTokenRequestDto, RefreshTokenResponseDto } from '../dtos/auth/refresh-token.request.dto';
import { LogoutRequestDto, LogoutResponseDto } from '../dtos/auth/logout.request.dto';
import { ForgotPasswordRequestDto, ForgotPasswordResponseDto } from '../dtos/auth/forgot-password.request.dto';
import { ResetPasswordRequestDto, ResetPasswordResponseDto } from '../dtos/auth/reset-password.request.dto';
import { VerifyEmailRequestDto, VerifyEmailResponseDto } from '../dtos/auth/verify-email.request.dto';

// Infrastructure - Guards, Interceptors, Pipes
import { Public } from '../../infrastructure/auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/guards/roles.guard';
import { Roles } from '../../infrastructure/auth/decorators/roles.decorator';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { ZodValidationPipe } from '../../common/pipes/validation.pipe';

// Validation schemas from shared-schemas
import { RegisterSchema } from '@vubon/shared-schemas';
import { LoginSchema } from '@vubon/shared-schemas';

// ============================================================
// Types
// ============================================================

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

// ============================================================
// Controller
// ============================================================

@ApiTags('Authentication')
@ApiSecurity('bearer')
@ApiHeader({
  name: 'X-Correlation-ID',
  description: 'Correlation ID for distributed tracing',
  required: false,
})
@ApiConsumes('application/json')
@ApiProduces('application/json')
@Controller(`${API_PREFIXES.REST}/${API_VERSIONS.V1}/auth`)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // ============================================================
  // Registration Endpoint
  // ============================================================

  @Public()
  @Post('register')
  @Throttle({
    default: {
      ttl: RATE_LIMITS.AUTH.REGISTER.WINDOW_MS / 1000,
      limit: RATE_LIMITS.AUTH.REGISTER.MAX_REQUESTS,
    },
  })
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account with email and password. Supports phone number registration for Bangladesh users.',
  })
  @ApiBody({ type: RegisterRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email or phone already exists',
  })
  @ApiResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many registration attempts',
  })
  async register(
    @Body() dto: RegisterRequestDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RegisterResponseDto> {
    const correlationId = this.getCorrelationId(req);

    this.logger.debug(`Register request received: ${dto.getMaskedEmail()}`, {
      correlationId,
      hasPhone: dto.hasPhone(),
      hasReferral: dto.hasReferralCode(),
    });

    try {
      // Extract device information from request
      const deviceInfo = {
        ...dto.deviceInfo,
        ipAddress: this.getClientIp(req),
        userAgent: req.headers['user-agent'],
        platform: this.detectPlatform(req),
      };

      // Create command
      const command = new RegisterUserCommand({
        email: dto.email,
        password: dto.password,
        confirmPassword: dto.confirmPassword,
        fullName: dto.fullName,
        displayName: dto.displayName,
        phone: dto.phone,
        acceptTerms: dto.acceptTerms,
        acceptPrivacy: dto.acceptPrivacy,
        preferredLanguage: dto.preferredLanguage,
        referralCode: dto.referralCode,
        captchaToken: dto.captchaToken,
        deviceInfo,
        preferences: dto.preferences,
        correlationId,
        registrationSource: this.detectRegistrationSource(req),
      });

      // Execute command
      const result = await this.commandBus.execute<
        RegisterUserCommand,
        RegisterResponseDto
      >(command);

      this.logger.debug(`User registered successfully: ${result.userId}`, {
        correlationId,
        userId: result.userId,
        requiresEmailVerification: result.requiresEmailVerification,
        requiresPhoneVerification: result.requiresPhoneVerification,
      });

      // Set response headers
      res.setHeader('X-Request-ID', correlationId);
      res.setHeader('X-User-ID', result.userId);

      return result;
    } catch (error) {
      this.handleError(error, correlationId);
    }
  }

  // ============================================================
  // Login Endpoint
  // ============================================================

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({
    default: {
      ttl: RATE_LIMITS.AUTH.LOGIN.WINDOW_MS / 1000,
      limit: RATE_LIMITS.AUTH.LOGIN.MAX_REQUESTS,
    },
  })
  @UsePipes(new ZodValidationPipe(LoginSchema))
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticate user with email/phone and password.',
  })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many login attempts',
  })
  async login(
    @Body() dto: LoginRequestDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const correlationId = this.getCorrelationId(req);

    this.logger.debug(`Login request received: ${dto.email}`, {
      correlationId,
      method: dto.loginMethod,
    });

    try {
      // Extract device information
      const deviceInfo = {
        ipAddress: this.getClientIp(req),
        userAgent: req.headers['user-agent'],
        platform: this.detectPlatform(req),
      };

      // Execute login command
      const result = await this.commandBus.execute({
        email: dto.email,
        password: dto.password,
        phone: dto.phone,
        loginMethod: dto.loginMethod,
        deviceInfo,
        correlationId,
        rememberMe: dto.rememberMe,
        captchaToken: dto.captchaToken,
      });

      // Set secure cookie for refresh token
      if (result.refreshToken) {
        res.cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          path: '/api/v1/auth/refresh',
        });
      }

      res.setHeader('X-Request-ID', correlationId);
      res.setHeader('X-User-ID', result.userId);

      return result;
    } catch (error) {
      this.handleError(error, correlationId);
    }
  }

  // ============================================================
  // Refresh Token Endpoint
  // ============================================================

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Throttle({
    default: {
      ttl: RATE_LIMITS.AUTH.REFRESH_TOKEN.WINDOW_MS / 1000,
      limit: RATE_LIMITS.AUTH.REFRESH_TOKEN.MAX_REQUESTS,
    },
  })
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Get a new access token using refresh token.',
  })
  @ApiBody({ type: RefreshTokenRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token refreshed successfully',
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired refresh token',
  })
  async refreshToken(
    @Body() dto: RefreshTokenRequestDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RefreshTokenResponseDto> {
    const correlationId = this.getCorrelationId(req);

    try {
      // If refresh token not in body, try cookie
      const refreshToken = dto.refreshToken || req.cookies?.refreshToken;

      if (!refreshToken) {
        throw new BadRequestException('Refresh token is required');
      }

      const result = await this.commandBus.execute({
        refreshToken,
        correlationId,
        deviceInfo: {
          ipAddress: this.getClientIp(req),
          userAgent: req.headers['user-agent'],
        },
      });

      // Update refresh token cookie
      if (result.refreshToken) {
        res.cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: '/api/v1/auth/refresh',
        });
      }

      res.setHeader('X-Request-ID', correlationId);

      return result;
    } catch (error) {
      this.handleError(error, correlationId);
    }
  }

  // ============================================================
  // Logout Endpoint
  // ============================================================

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Throttle({
    default: {
      ttl: 60,
      limit: 10,
    },
  })
  @ApiOperation({
    summary: 'Logout user',
    description: 'Invalidate current session and refresh token.',
  })
  @ApiBody({ type: LogoutRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logged out successfully',
    type: LogoutResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async logout(
    @Body() dto: LogoutRequestDto,
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogoutResponseDto> {
    const correlationId = this.getCorrelationId(req);
    const userId = req.user?.id;

    this.logger.debug(`Logout request for user: ${userId}`, {
      correlationId,
      allDevices: dto.allDevices,
    });

    try {
      const refreshToken = dto.refreshToken || req.cookies?.refreshToken;

      const result = await this.commandBus.execute({
        userId,
        refreshToken,
        allDevices: dto.allDevices,
        correlationId,
        deviceInfo: {
          ipAddress: this.getClientIp(req),
          userAgent: req.headers['user-agent'],
        },
      });

      // Clear refresh token cookie
      res.clearCookie('refreshToken', {
        path: '/api/v1/auth/refresh',
      });

      res.setHeader('X-Request-ID', correlationId);

      return result;
    } catch (error) {
      this.handleError(error, correlationId);
    }
  }

  // ============================================================
  // Current User Endpoint
  // ============================================================

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @Throttle({
    default: {
      ttl: 60,
      limit: 100,
    },
  })
  @ApiOperation({
    summary: 'Get current user',
    description: 'Get authenticated user profile information.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async getCurrentUser(
    @Req() req: RequestWithUser,
  ): Promise<unknown> {
    const correlationId = this.getCorrelationId(req);
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestException('User not authenticated');
    }

    try {
      const result = await this.queryBus.execute(
        new GetCurrentUserQuery(userId, correlationId),
      );

      return result;
    } catch (error) {
      this.handleError(error, correlationId);
    }
  }

  // ============================================================
  // Forgot Password Endpoint
  // ============================================================

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({
    default: {
      ttl: RATE_LIMITS.AUTH.PASSWORD_RESET.WINDOW_MS / 1000,
      limit: RATE_LIMITS.AUTH.PASSWORD_RESET.MAX_REQUESTS,
    },
  })
  @ApiOperation({
    summary: 'Request password reset',
    description: 'Send password reset link to user email.',
  })
  @ApiBody({ type: ForgotPasswordRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset email sent',
    type: ForgotPasswordResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many password reset requests',
  })
  async forgotPassword(
    @Body() dto: ForgotPasswordRequestDto,
    @Req() req: Request,
  ): Promise<ForgotPasswordResponseDto> {
    const correlationId = this.getCorrelationId(req);

    try {
      const result = await this.commandBus.execute({
        email: dto.email,
        correlationId,
        deviceInfo: {
          ipAddress: this.getClientIp(req),
          userAgent: req.headers['user-agent'],
        },
      });

      return result;
    } catch (error) {
      // For security, always return success even if email not found
      // This prevents email enumeration attacks
      return {
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
        correlationId,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // ============================================================
  // Reset Password Endpoint
  // ============================================================

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({
    default: {
      ttl: 3600,
      limit: 5,
    },
  })
  @ApiOperation({
    summary: 'Reset password',
    description: 'Reset password using token from email.',
  })
  @ApiBody({ type: ResetPasswordRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset successfully',
    type: ResetPasswordResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid token or password',
  })
  async resetPassword(
    @Body() dto: ResetPasswordRequestDto,
    @Req() req: Request,
  ): Promise<ResetPasswordResponseDto> {
    const correlationId = this.getCorrelationId(req);

    try {
      const result = await this.commandBus.execute({
        token: dto.token,
        newPassword: dto.newPassword,
        confirmPassword: dto.confirmPassword,
        correlationId,
        deviceInfo: {
          ipAddress: this.getClientIp(req),
          userAgent: req.headers['user-agent'],
        },
      });

      return result;
    } catch (error) {
      this.handleError(error, correlationId);
    }
  }

  // ============================================================
  // Verify Email Endpoint
  // ============================================================

  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @Throttle({
    default: {
      ttl: 300,
      limit: 5,
    },
  })
  @ApiOperation({
    summary: 'Verify email',
    description: 'Verify user email using verification token.',
  })
  @ApiBody({ type: VerifyEmailRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email verified successfully',
    type: VerifyEmailResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid or expired token',
  })
  async verifyEmail(
    @Body() dto: VerifyEmailRequestDto,
    @Req() req: Request,
  ): Promise<VerifyEmailResponseDto> {
    const correlationId = this.getCorrelationId(req);

    try {
      const result = await this.commandBus.execute({
        token: dto.token,
        correlationId,
        deviceInfo: {
          ipAddress: this.getClientIp(req),
          userAgent: req.headers['user-agent'],
        },
      });

      return result;
    } catch (error) {
      this.handleError(error, correlationId);
    }
  }

  // ============================================================
  // Health Check Endpoints
  // ============================================================

  @Public()
  @Get('health')
  @ApiOperation({
    summary: 'Health check',
    description: 'Check if auth service is healthy.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service is healthy',
  })
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Get correlation ID from request headers
   */
  private getCorrelationId(req: Request): string {
    return (
      (req.headers['x-correlation-id'] as string) ||
      (req.headers['x-request-id'] as string) ||
      uuidv4()
    );
  }

  /**
   * Get client IP from request
   */
  private getClientIp(req: Request): string {
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      (req.ip) ||
      (req.socket?.remoteAddress as string) ||
      'unknown'
    );
  }

  /**
   * Detect device platform from user agent
   */
  private detectPlatform(req: Request): 'web' | 'mobile' | 'tablet' | 'desktop' {
    const userAgent = req.headers['user-agent']?.toLowerCase() || '';

    if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone')) {
      return 'mobile';
    }

    if (userAgent.includes('tablet') || userAgent.includes('ipad')) {
      return 'tablet';
    }

    if (userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('linux')) {
      return 'desktop';
    }

    return 'web';
  }

  /**
   * Detect registration source from request
   */
  private detectRegistrationSource(req: Request): string {
    const userAgent = req.headers['user-agent']?.toLowerCase() || '';

    if (userAgent.includes('vubonapp')) {
      return 'mobile_app';
    }

    if (userAgent.includes('admin') || userAgent.includes('dashboard')) {
      return 'admin';
    }

    if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone')) {
      return 'mobile_web';
    }

    return 'web';
  }

  /**
   * Handle errors
   */
  private handleError(error: unknown, correlationId: string): never {
    this.logger.error('Request failed', {
      correlationId,
      error: error instanceof Error ? {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      } : String(error),
    });

    // Re-throw known exceptions
    if (error instanceof BadRequestException ||
        error instanceof ConflictException ||
        error instanceof TooManyRequestsException) {
      throw error;
    }

    // Handle unknown errors
    if (error instanceof Error && error.message.includes('circuit breaker')) {
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Service temporarily unavailable. Please try again later.',
          messageBn: 'সার্ভিস সাময়িকভাবে অনুপলব্ধ। পরে আবার চেষ্টা করুন।',
          correlationId,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    // Default error
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error occurred',
        messageBn: 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে',
        correlationId,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
