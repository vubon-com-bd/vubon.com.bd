/**
 * Command handler for user registration
 * Handles the registration of new users
 */

import { randomBytes } from 'node:crypto';

import { DEFAULT_ROLES } from '@vubon/auth-shared-constants';

import { User } from '../../../domain/entities/user.entity';
import type { EmailValidator } from '../../../domain/ports/email-validator.port';
import type { PasswordHasher } from '../../../domain/ports/password-hasher.port';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import {
  RegisterUserCommand,
  RegisterUserCommandResult,
  RegisterUserWithSocialCommand,
} from './register-user.command';

export class RegisterUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly emailValidator: EmailValidator,
  ) {}

  public async execute(
    command: RegisterUserCommand,
  ): Promise<RegisterUserCommandResult> {
    // Validate the command
    command.validate();

    // Validate email format
    if (!this.emailValidator.isValid(command.email)) {
      throw new Error('Invalid email format');
    }

    // Check if email is disposable
    if (this.emailValidator.isDisposable(command.email)) {
      throw new Error('Disposable email addresses are not allowed');
    }

    // Normalize email
    const normalizedEmail = this.emailValidator.normalize(command.email);

    // Check if user already exists with this email
    const existingUser = await this.userRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Check if username is provided and validate
    let username = command.username;
    if (!username) {
      // Generate username from email
      const localPart = this.emailValidator.getLocalPart(normalizedEmail);
      username = localPart || normalizedEmail.split('@')[0];
    }

    // Check if username is already taken
    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingUsername) {
      // If username is taken, append a random number
      const randomSuffix = Math.floor(Math.random() * 1000);
      username = `${username}${randomSuffix}`;
    }

    // Hash the password
    const hashedPassword = this.passwordHasher.hashSync(command.password);

    // Create the user entity
    const user = User.create({
      email: normalizedEmail,
      username,
      passwordHash: hashedPassword.hash,
      salt: hashedPassword.salt,
      firstName: command.firstName,
      lastName: command.lastName,
      role: DEFAULT_ROLES.CUSTOMER,
    });

    // Save the user
    const savedUser = await this.userRepository.save(user);

    // Generate verification token if needed
    let verificationToken: string | undefined;
    let requiresVerification = true;

    // Check if email verification is required
    const emailVerificationRequired = true;

    if (emailVerificationRequired) {
      // Generate a verification token
      const token = this.generateVerificationToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      savedUser.assignVerificationToken(token, expiresAt);
      await this.userRepository.save(savedUser);
      verificationToken = token;
    } else {
      // If no verification required, mark as verified
      savedUser.verify();
      await this.userRepository.save(savedUser);
      requiresVerification = false;
    }

    // Return the result
    return new RegisterUserCommandResult({
      id: savedUser.id,
      email: savedUser.email,
      username: savedUser.username,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      role: savedUser.role,
      status: savedUser.status,
      isVerified: savedUser.isVerified,
      createdAt: savedUser.createdAt,
      requiresVerification,
      verificationToken,
    });
  }

  private generateVerificationToken(): string {
    return randomBytes(32).toString('hex');
  }
}

export class RegisterUserWithSocialHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly emailValidator: EmailValidator,
  ) {}

  public async execute(
    command: RegisterUserWithSocialCommand,
  ): Promise<RegisterUserCommandResult> {
    // Validate the command
    command.validate();

    // Validate email format
    if (!this.emailValidator.isValid(command.email)) {
      throw new Error('Invalid email format');
    }

    // Normalize email
    const normalizedEmail = this.emailValidator.normalize(command.email);

    // Check if user already exists with this email
    const existingUser = await this.userRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Generate a random password for social login users
    const randomPassword = this.generateRandomPassword();
    const hashedPassword = this.passwordHasher.hashSync(randomPassword);

    // Generate username
    let username = command.firstName
      ? this.sanitizeUsername(command.firstName.toLowerCase())
      : this.generateUsername(normalizedEmail);

    // Check if username is already taken
    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingUsername) {
      const randomSuffix = Math.floor(Math.random() * 1000);
      username = `${username}${randomSuffix}`;
    }

    // Create the user entity
    const user = User.create({
      email: normalizedEmail,
      username,
      passwordHash: hashedPassword.hash,
      salt: hashedPassword.salt,
      firstName: command.firstName,
      lastName: command.lastName,
      role: DEFAULT_ROLES.CUSTOMER,
    });

    // Social login users are automatically verified
    user.verify();

    // Save the user
    const savedUser = await this.userRepository.save(user);

    // Return the result
    return new RegisterUserCommandResult({
      id: savedUser.id,
      email: savedUser.email,
      username: savedUser.username,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      role: savedUser.role,
      status: savedUser.status,
      isVerified: savedUser.isVerified,
      createdAt: savedUser.createdAt,
      requiresVerification: false,
    });
  }

  private generateRandomPassword(): string {
    return randomBytes(32).toString('base64');
  }

  private generateUsername(email: string): string {
    const localPart = email.split('@')[0];
    const sanitized = localPart.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return sanitized.slice(0, 20);
  }

  private sanitizeUsername(username: string): string {
    return username
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase()
      .slice(0, 20);
  }
}
