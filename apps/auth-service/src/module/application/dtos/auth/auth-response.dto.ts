/**
 * Auth Response DTO
 * Used for authentication responses
 */

export class AuthResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  phone?: string | null;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;

  constructor(data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    phone?: string | null;
    message?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
  }) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.status = data.status;
    this.isEmailVerified = data.isEmailVerified;
    this.isPhoneVerified = data.isPhoneVerified;
    this.phone = data.phone || null;
    this.message = data.message;
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.expiresIn = data.expiresIn;
  }

  /**
   * Create a registration response
   */
  static fromRegistration(data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    phone?: string | null;
  }): AuthResponseDto {
    return new AuthResponseDto({
      ...data,
      message: 'Registration successful. Please verify your email.',
    });
  }

  /**
   * Create a login response
   */
  static fromLogin(data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    phone?: string | null;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }): AuthResponseDto {
    return new AuthResponseDto({
      ...data,
      message: 'Login successful',
    });
  }

  /**
   * Create an error response
   */
  static error(message: string): AuthResponseDto {
    const dto = new AuthResponseDto({
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      status: '',
      isEmailVerified: false,
      isPhoneVerified: false,
    });
    dto.message = message;
    return dto;
  }
}
