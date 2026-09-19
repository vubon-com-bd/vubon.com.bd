import { Injectable } from '@nestjs/common';
import type { LoginResponseDTO } from '../../application/dtos/responses/login-response.dto';
import type { AuthLoginResponseDTO } from '../dtos/responses/auth.response.dto';

@Injectable()
export class AuthControllerMapper {
  toLoginResponse(dto: LoginResponseDTO): AuthLoginResponseDTO {
    return {
      success: dto.success,
      user: dto.user,
      session: dto.session,
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      expiresAt: dto.expiresAt,
      tokenType: dto.tokenType,
      requiresMfa: dto.requiresMfa,
      requiresVerification: dto.requiresVerification,
      challengeId: dto.challengeId,
    };
  }
}
