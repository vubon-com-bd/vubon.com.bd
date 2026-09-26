/**
 * MfaControllerMapper
 * @module auth-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { MfaResponseDTO as AppMfaResponse } from '../../application/dtos/responses/mfa-response.dto';
import type { MfaResponseDTO } from '../dtos/responses/mfa.response.dto';

@Injectable()
export class MfaControllerMapper {
  toResponse(source: AppMfaResponse): MfaResponseDTO {
    return {
      enabled: source.enabled,
      type: source.type,
      enrolledAt: source.enrolledAt,
      verifiedAt: source.verifiedAt,
      backupMethods: source.backupMethods ? [...source.backupMethods] : undefined,
    };
  }
}
