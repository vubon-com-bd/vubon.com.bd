/**
 * Auth Mapper
 * Maps between HTTP DTOs and Application DTOs
 */

import { RegisterRequestDto } from '../dtos/auth/register.request.dto.js';
import { RegisterDto } from '../../application/dtos/auth/register.dto.js';
import { RegisterResponseDto } from '../dtos/auth/register.response.dto.js';
import { AuthResponseDto } from '../../application/dtos/auth/auth-response.dto.js';

export class AuthMapper {
  /**
   * Map HTTP RegisterRequestDto to Application RegisterDto
   */
  static toRegisterDto(requestDto: RegisterRequestDto): RegisterDto {
    const dto = new RegisterDto();
    dto.email = requestDto.email;
    dto.password = requestDto.password;
    dto.firstName = requestDto.firstName;
    dto.lastName = requestDto.lastName;
    dto.phone = requestDto.phone || null;
    return dto;
  }

  /**
   * Map Application AuthResponseDto to HTTP RegisterResponseDto
   */
  static toRegisterResponseDto(authResponse: AuthResponseDto): RegisterResponseDto {
    return new RegisterResponseDto({
      userId: authResponse.id,
      email: authResponse.email,
      firstName: authResponse.firstName,
      lastName: authResponse.lastName,
      message: authResponse.message || 'Registration successful',
      role: authResponse.role,
      status: authResponse.status,
    });
  }
}
