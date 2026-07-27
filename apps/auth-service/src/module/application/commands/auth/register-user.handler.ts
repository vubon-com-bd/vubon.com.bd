/**
 * Register User Command Handler
 */

import { Injectable, Inject, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RegisterUserCommand } from './register-user.command.js';
import { User } from '../../../domain/entities/user.entity.js';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { IPasswordHasher } from '../../../domain/ports/password-hasher.port.js';
import { IEmailValidator } from '../../../domain/ports/email-validator.port.js';
import { ITokenGenerator } from '../../../domain/ports/token-generator.port.js';
import { AuthResponseDto } from '../../dtos/auth/auth-response.dto.js';
import { UserRegisteredEvent } from '../../events/user-registered.event.js';

@Injectable()
export class RegisterUserHandler {
  private readonly logger = new Logger(RegisterUserHandler.name);

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
    @Inject('IEmailValidator')
    private readonly emailValidator: IEmailValidator,
    @Inject('ITokenGenerator')
    private readonly tokenGenerator: ITokenGenerator,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async execute(command: RegisterUserCommand): Promise<AuthResponseDto> {
    const { email, password, firstName, lastName, phone } = command;

    this.logger.log(`Processing registration for email: ${email}`);

    try {
      if (!this.emailValidator.isValid(email)) {
        throw new Error('Invalid email address format');
      }

      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        this.logger.warn(`Registration attempt with existing email: ${email}`);
        throw new Error('User with this email already exists');
      }

      if (phone) {
        const existingPhone = await this.userRepository.findByPhone(phone);
        if (existingPhone) {
          this.logger.warn(`Registration attempt with existing phone: ${phone}`);
          throw new Error('User with this phone number already exists');
        }
      }

      const passwordHash = await this.passwordHasher.hash(password);
      this.logger.debug('Password hashed successfully');

      const user = User.register(email, passwordHash, firstName, lastName, phone);
      this.logger.debug(`User entity created with ID: ${user.id}`);

      const savedUser = await this.userRepository.save(user);
      this.logger.log(`User saved successfully with ID: ${savedUser.id}`);

      const accessToken = this.tokenGenerator.generateJWT(
        {
          sub: savedUser.id,
          email: savedUser.email,
          role: savedUser.role,
        },
        '7d'
      );

      const refreshToken = this.tokenGenerator.generateRefreshToken(savedUser.id);

      const event = new UserRegisteredEvent(
        savedUser.id,
        savedUser.email,
        savedUser.firstName,
        savedUser.lastName,
        savedUser.phone
      );
      await this.eventEmitter.emitAsync('user.registered', event);
      this.logger.debug(`UserRegisteredEvent published for ID: ${savedUser.id}`);

      const response = AuthResponseDto.fromRegistration({
        id: savedUser.id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        role: savedUser.role,
        status: savedUser.status,
        isEmailVerified: savedUser.isEmailVerified,
        isPhoneVerified: savedUser.isPhoneVerified,
        phone: savedUser.phone,
      });

      response.accessToken = accessToken;
      response.refreshToken = refreshToken;
      response.expiresIn = 7 * 24 * 60 * 60;

      this.logger.log(`Registration completed successfully for: ${email}`);

      return response;
    } catch (error) {
      this.logger.error(
        `Registration failed for ${email}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }
}
