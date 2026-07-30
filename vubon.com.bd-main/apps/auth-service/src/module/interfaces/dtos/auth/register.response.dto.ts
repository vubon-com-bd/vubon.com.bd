/**
 * Register Response DTO
 * HTTP response DTO for user registration
 * Excludes sensitive data like password hash
 */

export class RegisterResponseDto {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  role?: string;
  status?: string;

  constructor(data: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    message?: string;
    role?: string;
    status?: string;
  }) {
    this.userId = data.userId;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.message = data.message || 'Registration successful';
    this.role = data.role;
    this.status = data.status;
  }

  /**
   * Create a success response
   */
  static success(data: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
    status?: string;
  }): RegisterResponseDto {
    return new RegisterResponseDto({
      ...data,
      message: 'Registration successful. Please verify your email.',
    });
  }

  /**
   * Create an error response
   */
  static error(message: string): RegisterResponseDto {
    return new RegisterResponseDto({
      userId: '',
      email: '',
      firstName: '',
      lastName: '',
      message: message,
    });
  }
}
