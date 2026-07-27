/**
 * Register User Command
 * CQRS command for user registration
 * Immutable class that encapsulates registration data
 */

import { RegisterDto } from '../../dtos/auth/register.dto.js';

export class RegisterUserCommand {
  public readonly email: string;
  public readonly password: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly phone?: string | null;

  constructor(dto: RegisterDto) {
    // Validate DTO before creating command
    dto.validate();

    this.email = dto.email;
    this.password = dto.password;
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.phone = dto.phone || null;

    // Freeze the object to make it immutable
    Object.freeze(this);
  }

  /**
   * Create command from RegisterDto
   */
  static fromDto(dto: RegisterDto): RegisterUserCommand {
    return new RegisterUserCommand(dto);
  }

  /**
   * Check if command has phone number
   */
  hasPhone(): boolean {
    return !!this.phone;
  }

  /**
   * Get full name
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
