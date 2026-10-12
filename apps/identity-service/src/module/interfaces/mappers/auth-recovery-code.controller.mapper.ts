/**
 * AuthRecoveryCodeControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { RecoveryCodesHttpResponseDTO } from '../dtos/responses/recovery-code/recovery-codes.response.dto.js';

export class AuthRecoveryCodeControllerMapper {
  static toGenerateHttpResponse(codes: readonly string[]): RecoveryCodesHttpResponseDTO {
    return {
      success: true,
      codes,
      generatedAt: new Date().toISOString(),
      remainingCount: codes.length,
    };
  }
}
