/**
 * Register User Command Handler
 * Handles the user registration use case
 */

import { RegisterUserCommand } from './register-user.command.js';
import { AuthResponseDto } from '../../dtos/auth/auth-response.dto.js';
import { User } from '../../../domain/entities/user.entity.js';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { IPasswordHasher } from '../../../domain/ports/password-hasher.port.js';
import { IEmailValidator } from '../../../domain/ports/email-validator.port.js';
import { ITokenGenerator } from '../../../domain/ports/token-generator.port.js';
import { INotificationSender } from '../../../domain/ports/notification-sender.port.js';
import { UserRegisteredEvent } from '../../events/user-registered.event.js';
import { DomainEventBus } from '../../../infrastructure/events/domain-event-bus.js';

export class RegisterUserHandler {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly emailValidator: IEmailValidator,
    private readonly tokenGenerator: ITokenGenerator,
    private readonly notificationSender: INotificationSender,
    private readonly eventBus: DomainEventBus
  ) {}

  /**
   * Handle the register user command
   */
  async execute(command: RegisterUserCommand): Promise<AuthResponseDto> {
    const { email, password, firstName, lastName, phone } = command;

    // 1. Validate email
    const emailValidation = this.emailValidator.validateWithDetails(email);
    if (!emailValidation.isValid) {
      throw new Error(
        `Invalid email: ${emailValidation.errors?.join(', ')}`
      );
    }

    const normalizedEmail = emailValidation.normalized || email;

    // 2. Check for duplicate email
    const existingUser = await this.userRepository.findByEmailCaseInsensitive(
      normalizedEmail
    );
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // 3. Check for duplicate phone (if provided)
    if (phone) {
      const existingPhone = await this.userRepository.findByPhone(phone);
      if (existingPhone) {
        throw new Error('User with this phone number already exists');
      }
    }

    // 4. Hash the password
    const passwordHash = await this.passwordHasher.hash(password);

    // 5. Create user entity
    const user = User.register(
      normalizedEmail,
      passwordHash,
      firstName,
      lastName,
      phone
    );

    // 6. Save user
    await this.userRepository.save(user);

    // 7. Generate verification token
    const verificationToken = this.tokenGenerator.generateEmailVerificationToken(
      user.id,
      '7d'
    );

    // 8. Create and publish event
    const event = new UserRegisteredEvent(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.phone,
      verificationToken
    );
    await this.eventBus.publish(event);

    // 9. Return response
    return new AuthResponseDto({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      phone: user.phone,
      message: 'Registration successful. Please verify your email.',
    });
  }
}
