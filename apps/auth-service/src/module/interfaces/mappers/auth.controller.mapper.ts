/**
 * AuthControllerMapper — Application DTO → Interface DTO
 * @module auth-service/interfaces/mappers
 *
 * Interface DTO is a Swagger-annotated class but structurally identical
 * to the application response DTO. This mapper is intentionally thin
 * to guarantee the HTTP contract matches the app contract.
 */
import { Injectable } from '@nestjs/common';
import type {
  LoginResponseDTO,
  LoginMfaRequiredResponseDTO,
} from '../../application/dtos/responses/login-response.dto';
import type { RegisterResponseDTO } from '../../application/dtos/responses/register-response.dto';
import type { AuthResponseDTO } from '../dtos/responses/auth.response.dto';

@Injectable()
export class AuthControllerMapper {
  toLoginResponse(
    source: LoginResponseDTO | LoginMfaRequiredResponseDTO,
  ): AuthResponseDTO {
    // If MFA-required flow, the response shape is narrow — normalise.
    if ('requiresMfa' in source && source.requiresMfa === true) {
      return {
        success: true,
        user: source as never,
        session: source as never,
        accessToken: '',
        refreshToken: '',
        tokenType: 'Bearer',
        expiresAt: 0,
        requiresMfa: true,
        challengeId: source.challengeId,
      };
    }

    const login = source as LoginResponseDTO;
    return {
      success: true,
      user: login.user as never,
      session: login.session as never,
      accessToken: login.accessToken,
      refreshToken: login.refreshToken,
      tokenType: login.tokenType,
      expiresAt: login.expiresAt,
      requiresMfa: login.requiresMfa,
      requiresVerification: login.requiresVerification,
      challengeId: login.challengeId,
    };
  }

  toRegisterResponse(source: RegisterResponseDTO): {
    user: unknown;
    verificationSent: boolean;
    nextStep: string;
  } {
    return {
      user: source.user,
      verificationSent: source.verificationSent,
      nextStep: source.nextStep,
    };
  }
}
