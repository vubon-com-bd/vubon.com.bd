/**
 * Auth Controller - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/controllers/auth.controller
 *
 * @description
 * Authentication controller handling all auth-related endpoints.
 * Implements clean architecture with CQRS pattern.
 *
 * Enterprise Features:
 * ✅ CQRS pattern with CommandBus/QueryBus
 * ✅ Zod validation for all requests
 * ✅ Swagger documentation with Bengali support
 * ✅ Rate limiting with configurable limits
 * ✅ Audit logging for all auth operations
 * ✅ Device fingerprinting
 * ✅ Multi-language responses (English/Bengali)
 * ✅ Correlation ID propagation
 *
 * @example
 * // In module
 * @Module({
 *   controllers: [AuthController],
 *   providers: [RegisterUserHandler],
 * })
 * export class AuthModule {}
 */

import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
  Res,
  Ip,
  Headers,
  Logger,
  BadRequestException,
  ConflictException,
  TooManyRequestsException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Shared packages
import { RATE_LIMITS, AUDIT_ACTIONS } from '@vubon/shared-constants';
import { maskEmail, maskPhone } from '@vubon/shared-utils';
import { RegisterSchema } from '@vubon/shared-schemas';

// Local imports
import { RegisterRequestDto, RegisterResponseDto, DeviceInfoDto } from '../dtos/auth/register.request.dto';
import { RegisterUserCommand } from '../../application/commands/auth/register-user.command';
import { GetCurrentUserQuery } from '../../application/queries/auth/get-current-user.query';
import { ZodValidationPipe } from '../../common/pipes/validation.pipe';
import { Public } from '../../infrastructure/auth/decorators/public.decorator';
import { RateLimit } from '../../infrastructure/auth/decorators/rate-limit.decorator';
import { AuditLog } from '../../infrastructure/auth/decorators/audit-log.decorator';

// ============================================================
// Controller Implementation
// ============================================================

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // ============================================================
  // Register Endpoint
  // ============================================================

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @RateLimit({ key: 'register', limit: RATE_LIMITS.AUTH.REGISTER.MAX_REQUESTS, windowMs: RATE_LIMITS.AUTH.REGISTER.WINDOW_MS })
  @AuditLog({ action: AUDIT_ACTIONS.USER_REGISTERED })
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Create a new user account with email and password. Supports phone number (Bangladesh format).',
  })
  @ApiBody({ type: RegisterRequestDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (invalid email, password too weak, etc.)',
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email or phone already exists',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many registration attempts',
  })
  async register(
    @Body() dto: RegisterRequestDto,
    @Req() req: Request,
    @Ip() ipAddress?: string,
    @Headers('user-agent') userAgent?: string,
    @Res() res?: Response,
  ): Promise<RegisterResponseDto> {
    const correlationId = req.headers['x-correlation-id'] as string || uuidv4();
    const startTime = Date.now();

    this.logger.log(`Registration attempt from IP: ${ipAddress}, email: ${dto.getMaskedEmail()}`);

    try {
      // Validate passwords match
      if (!dto.doPasswordsMatch()) {
        throw new BadRequestException({
          message: 'Passwords do not match',
          messageBn: 'পাসওয়ার্ড দুটি মিলছে না',
        });
      }

      // Validate terms acceptance
      if (!dto.hasAcceptedTerms()) {
        throw new BadRequestException({
          message: 'You must accept the terms and conditions',
          messageBn: 'আপনাকে নিবন্ধনের জন্য শর্তাবলী মেনে নিতে হবে',
        });
      }

      // Validate privacy acceptance
      if (!dto.hasAcceptedPrivacy()) {
        throw new BadRequestException({
          message: 'You must accept the privacy policy',
          messageBn: 'আপনাকে নিবন্ধনের জন্য গোপনীয়তা নীতি মেনে নিতে হবে',
        });
      }

      // Build device info
      const deviceInfo: DeviceInfoDto = {
        ipAddress: ipAddress || req.ip,
        userAgent: userAgent || req.headers['user-agent'],
        deviceId: dto.deviceInfo?.deviceId || req.headers['x-device-id'] as string,
      };

      // Create command
      const command = new RegisterUserCommand(
        dto.email,
        dto.password,
        dto.confirmPassword,
        dto.fullName,
        dto.displayName,
        dto.phone,
        dto.avatar,
        dto.preferredLanguage,
        dto.preferredDistrict,
        dto.preferredUpazila,
        dto.acceptTerms,
        dto.acceptPrivacy,
        dto.marketingConsent || false,
        dto.whatsappConsent || false,
        dto.captchaToken,
        dto.referralCode,
        deviceInfo,
        correlationId,
        dto.hasDisplayName() ? dto.displayName : undefined,
      );

      // Execute command
      const result = await this.commandBus.execute(command);

      const response = RegisterResponseDto.success(
        result.userId,
        dto.email,
        result.userTier,
        {
          phoneNumber: dto.phone,
          requiresEmailVerification: true,
          requiresPhoneVerification: !!dto.phone,
          correlationId,
          metadata: {
            duration: Date.now() - startTime,
            ipAddress: ipAddress || req.ip,
            userAgent: userAgent || req.headers['user-agent'],
          },
        }
      );

      // Log success
      this.logger.log(`User registered successfully: ${result.userId}, email: ${dto.getMaskedEmail()}`);

      // Set response headers
      if (res) {
        res.header('X-Correlation-ID', correlationId);
        res.header('X-Registration-ID', result.userId);
      }

      return response;
    } catch (error) {
      // Log error
      this.logger.error(`Registration failed: ${error.message}`, error.stack);

      // Handle specific errors
      if (error instanceof BadRequestException) {
        throw error;
      }

      if (error instanceof ConflictException) {
        throw new ConflictException({
          message: error.message || 'User with this email or phone already exists',
          messageBn: 'এই ইমেইল বা ফোন নম্বর দিয়ে already একটি অ্যাকাউন্ট আছে',
          correlationId,
        });
      }

      if (error instanceof TooManyRequestsException) {
        throw new TooManyRequestsException({
          message: 'Too many registration attempts. Please try again later.',
          messageBn: 'অনেকবার নিবন্ধন চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
          correlationId,
        });
      }

      // Unknown error
      throw new BadRequestException({
        message: 'Registration failed. Please try again later.',
        messageBn: 'নিবন্ধন ব্যর্থ হয়েছে। পরে আবার চেষ্টা করুন।',
        correlationId,
      });
    }
  }

  // ============================================================
  // Get Current User Endpoint
  // ============================================================

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Get the profile of the currently authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized (invalid or missing token)',
  })
  async getCurrentUser(@Req() req: Request): Promise<unknown> {
    const userId = req.user?.['sub'];
    if (!userId) {
      throw new BadRequestException('User not authenticated');
    }

    return this.queryBus.execute(new GetCurrentUserQuery(userId));
  }

  // ============================================================
  // Health Check Endpoint
  // ============================================================

  @Get('health')
  @Public()
  @ApiOperation({
    summary: 'Authentication service health check',
    description: 'Check if the authentication service is healthy and ready.',
  })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
  })
  async healthCheck(): Promise<{
    status: string;
    version: string;
    timestamp: string;
    environment: string;
  }> {
    return {
      status: 'ok',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
