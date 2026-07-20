/**
 * Authentication service implementation
 * Implements the auth service interface with registration logic
 */
import { env } from '@vubon/auth-shared-config';

import type { EmailValidator } from '../../../domain/ports/email-validator.port';
import type { PasswordHasher } from '../../../domain/ports/password-hasher.port';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { RegisterUserCommand } from '../../commands/auth/register-user.command';
import { RegisterUserHandler } from '../../commands/auth/register-user.handler';
import type { RegisterDto, RegisterResponseDto } from '../../dtos/auth/register.dto';
import type { ActivityLogData } from '../../event-handlers/log-registration-activity.handler';
import { LogRegistrationActivityHandler } from '../../event-handlers/log-registration-activity.handler';
import type {
  VerificationEmailData,
  WelcomeEmailData,
} from '../../event-handlers/send-welcome-email.handler';
import { SendWelcomeEmailHandler } from '../../event-handlers/send-welcome-email.handler';
import { UserRegisteredEvent } from '../../events/user-registered.event';
import { UserMapper } from '../../mappers/user.mapper';
import type { AuthService, AuthServiceConfig } from '../interfaces/auth.service.interface';

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly emailValidator: EmailValidator,
    private readonly config: AuthServiceConfig = {},
  ) {}

  /**
   * Register a new user
   */
  public async register(data: RegisterDto): Promise<RegisterResponseDto> {
    // Create the command
    const command = new RegisterUserCommand({
      ...data,
      ipAddress: data.metadata?.ipAddress as string | undefined,
      userAgent: data.metadata?.userAgent as string | undefined,
    });

    // Create the handler
    const handler = new RegisterUserHandler(
      this.userRepository,
      this.passwordHasher,
      this.emailValidator,
    );

    // Execute the command
    const result = await handler.execute(command);

    const targetUser = await this.userRepository.findById(result.id);
    if (!targetUser) {
      throw new Error('User not found after registration');
    }

    // Create the domain event
    const event = UserRegisteredEvent.fromUser(
      targetUser,
      result.requiresVerification,
      result.verificationToken,
      data.metadata?.ipAddress as string | undefined,
      data.metadata?.userAgent as string | undefined,
    );

    // Handle event: Send welcome email
    if (this.config.sendWelcomeEmail !== false) {
      const emailHandler = new SendWelcomeEmailHandler(
        {
          sendWelcomeEmail: async (to: string, emailData: WelcomeEmailData): Promise<void> => {
            console.warn(`Sending welcome email to ${to}`, emailData);
            await Promise.resolve();
          },
          sendVerificationEmail: async (
            to: string,
            emailData: VerificationEmailData,
          ): Promise<void> => {
            console.warn(`Sending verification email to ${to}`, emailData);
            await Promise.resolve();
          },
        },
        env.APP_NAME,
        env.API_URL,
      );
      await emailHandler.handle(event);
    }

    // Handle event: Log registration activity
    if (this.config.logRegistrationActivity !== false) {
      const logHandler = new LogRegistrationActivityHandler({
        logActivity: async (activityData: ActivityLogData): Promise<void> => {
          const typedActivityData = activityData as unknown as { userId: string };
          const safeUserId = String(typedActivityData.userId ?? '');
          console.warn(`Logging registration activity for user ${safeUserId}`, activityData);
          await Promise.resolve();
        },
      });
      await logHandler.handle(event);
    }

    const fetchedUser = await this.userRepository.findById(result.id);
    if (!fetchedUser) {
      throw new Error('User not found after registration mapping');
    }

    // Map to response DTO
    const response = UserMapper.toRegisterResponse(
      fetchedUser,
      result.requiresVerification,
      result.verificationToken,
    );

    return response;
  }

  /*
   * TODO: Login method (to be implemented)
   */
  // public async login(data: LoginDto): Promise<LoginResponseDto> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Logout method (to be implemented)
   */
  // public async logout(data: LogoutDto): Promise<LogoutResponseDto> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Refresh token method (to be implemented)
   */
  // public async refreshToken(data: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Verify email method (to be implemented)
   */
  // public async verifyEmail(data: VerifyEmailDto): Promise<VerifyEmailResponseDto> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Resend verification method (to be implemented)
   */
  // public async resendVerification(data: ResendVerificationDto): Promise<ResendVerificationResponseDto> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Forgot password method (to be implemented)
   */
  // public async forgotPassword(data: ForgotPasswordDto): Promise<ForgotPasswordResponseDto> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Reset password method (to be implemented)
   */
  // public async resetPassword(data: ResetPasswordDto): Promise<ResetPasswordResponseDto> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Change password method (to be implemented)
   */
  // public async changePassword(data: ChangePasswordDto, userId: string): Promise<ChangePasswordResponseDto> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Update profile method (to be implemented)
   */
  // public async updateProfile(data: UpdateProfileDto, userId: string): Promise<UpdateProfileResponseDto> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Get user sessions method (to be implemented)
   */
  // public async getUserSessions(userId: string): Promise<UserSessionDto[]> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Revoke session method (to be implemented)
   */
  // public async revokeSession(sessionId: string, userId: string): Promise<void> {
  //   // Implementation will be added later
  // }

  /*
   * TODO: Get user activities method (to be implemented)
   */
  // public async getUserActivities(userId: string, limit?: number): Promise<UserActivityDto[]> {
  //   // Implementation will be added later
  // }

  /**
   * Helper method to validate email before registration
   */
  private async validateEmail(email: string): Promise<void> {
    // Validate email format
    if (!this.emailValidator.isValid(email)) {
      throw new Error('Invalid email format');
    }

    // Check if email is disposable
    if (this.config.blockDisposableEmails !== false && this.emailValidator.isDisposable(email)) {
      throw new Error('Disposable email addresses are not allowed');
    }

    // Check if email is from allowed domains
    if (this.config.allowedDomains && this.config.allowedDomains.length > 0) {
      if (!this.emailValidator.isFromAllowedDomains(email, this.config.allowedDomains)) {
        throw new Error('Email domain is not allowed');
      }
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(
      this.emailValidator.normalize(email),
    );
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
  }

  /**
   * Helper method to generate username
   */
  private async generateUsername(email: string): Promise<string> {
    const localPart = this.emailValidator.getLocalPart(email) || email.split('@')[0];
    let username = localPart
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase()
      .slice(0, 20);

    // Check if username is available
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      const randomSuffix = Math.floor(Math.random() * 1000);
      username = `${username}${randomSuffix}`;
    }

    return username;
  }
}

export class AuthServiceImplFactory {
  public static create(
    userRepository: UserRepository,
    passwordHasher: PasswordHasher,
    emailValidator: EmailValidator,
    config?: AuthServiceConfig,
  ): AuthServiceImpl {
    return new AuthServiceImpl(userRepository, passwordHasher, emailValidator, config);
  }
}
