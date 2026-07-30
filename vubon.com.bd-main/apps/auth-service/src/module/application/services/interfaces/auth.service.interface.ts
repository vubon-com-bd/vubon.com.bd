/**
 * Auth Service Interface
 * Defines contract for authentication service
 */

import { RegisterDto } from '../../dtos/auth/register.dto.js';
import { AuthResponseDto } from '../../dtos/auth/auth-response.dto.js';

export interface IAuthService {
  /**
   * Register a new user
   * @param dto - Registration data
   * @returns AuthResponseDto with user data and tokens
   * @throws Error if registration fails
   */
  register(dto: RegisterDto): Promise<AuthResponseDto>;

  // Future methods (commented for now)
  // login(loginDto: LoginDto): Promise<AuthResponseDto>;
  // logout(userId: string): Promise<void>;
  // refreshToken(refreshToken: string): Promise<AuthResponseDto>;
  // verifyEmail(token: string): Promise<void>;
  // forgotPassword(email: string): Promise<void>;
  // resetPassword(token: string, password: string): Promise<void>;
}
