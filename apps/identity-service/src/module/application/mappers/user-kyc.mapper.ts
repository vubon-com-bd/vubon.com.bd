import type { KycResponseDTO } from '../dtos/responses/kyc-response.dto.js';

export class UserKycMapper {
  static toDTO(entity: unknown): KycResponseDTO {
    return entity as KycResponseDTO;
  }
}
