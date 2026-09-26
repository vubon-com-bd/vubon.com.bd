/**
 * RegisterResponseDTO
 * @module auth-service/application/dtos/responses
 */
import type { UserResponseDTO } from './user-response.dto';

export interface RegisterResponseDTO {
  readonly user: UserResponseDTO;
  readonly verificationSent: boolean;
  readonly nextStep: 'verify_email' | 'verify_phone' | 'complete_profile' | 'none';
}
