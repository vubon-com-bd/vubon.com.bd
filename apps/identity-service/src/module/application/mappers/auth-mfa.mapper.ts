import type { MfaEntity } from '../../domain/entities/mfa.entity.js';
import type { MfaResponseDTO } from '../dtos/responses/mfa-response.dto.js';

export class AuthMfaMapper {
  static toDTO(entity: MfaEntity): MfaResponseDTO {
    return {
      success: true,
      enabled: entity.isEnabledAndVerified(),
      primaryMethod: entity.method.value,
    };
  }
}
