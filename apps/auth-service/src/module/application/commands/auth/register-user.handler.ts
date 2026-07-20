/**
 * Command handler for user registration
 * Handles the registration of new users
 */
import { DEFAULT_ROLES } from '@vubon/auth-shared-constants';

import { randomBytes } from 'node:crypto';

import { User } from '../../../domain/entities/user.entity';
import type { EmailValidator } from '../../../domain/ports/email-validator.port';
import type { PasswordHasher } from '../../../domain/ports/password-hasher.port';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';

import type { RegisterUserCommand, RegisterUserWithSocialCommand } from './register-user.command';
import { RegisterUserCommandResult } from './register-user.command';

export class RegisterUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly emailValidator: EmailValidator,
  ) {}

  public async execute(command: RegisterUserCommand): Promise<RegisterUserCommandResult> {
    command.validate();

    if (!this.emailValidator.isValid(command.email)) {
      throw new Error('Invalid email format');
    }

    if (this.emailValidator.isDisposable(command.email)) {
      throw new Error('Disposable email addresses are not allowed');
    }

    const normalizedEmail = this.emailValidator.normalize(command.email);

    const existingUser = await this.userRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    let username = command.username;
    if (!username) {
      const localPart = this.emailValidator.getLocalPart(normalizedEmail);
      username = localPart || normalizedEmail.split('@')[0];
    }

    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingUsername) {
      const randomSuffix = Math.floor(Math.random() * 1000);
      username = `${username}${randomSuffix}`;
    }

    const hashedPassword = this.passwordHasher.hashSync(command.password);

    const user = User.create({
      email: normalizedEmail,
      username,
      passwordHash: hashedPassword.hash,
      salt: hashedPassword.salt,
      firstName: command.firstName,
      lastName: command.lastName,
      role: DEFAULT_ROLES.CUSTOMER,
    });

    const savedUser = await this.userRepository.save(user);

    let verificationToken: string | undefined;
    let requiresVerification = true;
    const emailVerificationRequired = true;

    if (emailVerificationRequired) {
      const token = this.generateVerificationToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      savedUser.assignVerificationToken(token, expiresAt);
      await this.userRepository.save(savedUser);
      verificationToken = token;
    } else {
      savedUser.verify();
      await this.userRepository.save(savedUser);
      requiresVerification = false;
    }

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

  public async execute(command: RegisterUserWithSocialCommand): Promise<RegisterUserCommandResult> {
    command.validate();

    if (!this.emailValidator.isValid(command.email)) {
      throw new Error('Invalid email format');
    }

    const normalizedEmail = this.emailValidator.normalize(command.email);

    const existingUser = await this.userRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const randomPassword = this.generateRandomPassword();
    const hashedPassword = this.passwordHasher.hashSync(randomPassword);

    let username = command.firstName
      ? this.sanitizeUsername(command.firstName.toLowerCase())
      : this.generateUsername(normalizedEmail);

    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingUsername) {
      const randomSuffix = Math.floor(Math.random() * 1000);
      username = `${username}${randomSuffix}`;
    }

    const user = User.create({
      email: normalizedEmail,
      username,
      passwordHash: hashedPassword.hash,
      salt: hashedPassword.salt,
      firstName: command.firstName,
      lastName: command.lastName,
      role: DEFAULT_ROLES.CUSTOMER,
    });

    user.verify();

    const savedUser = await this.userRepository.save(user);

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
