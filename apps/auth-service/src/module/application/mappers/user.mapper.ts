/**
 * User Mapper
 */

import { User } from '../../domain/entities/user.entity.js';
import { AuthResponseDto } from '../dtos/auth/auth-response.dto.js';

export class UserMapper {
  static toResponseDto(user: User): AuthResponseDto {
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
    });
  }

  static toSafeSummary(user: User): Record<string, unknown> {
    return {
      id: user.id,
      email: user.email,
      fullName: user.getFullName(),
      role: user.role,
      status: user.status,
      isVerified: user.isFullyVerified(),
    };
  }
}
