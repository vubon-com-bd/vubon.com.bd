/**
 * AuthMfaMapper
 * @module auth-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { AuthMfaEntity } from '../../domain/entities/auth-mfa.entity';
import type { MfaResponseDTO } from '../dtos/responses/mfa-response.dto';

export class AuthMfaMapper extends OneWayMapper<AuthMfaEntity, MfaResponseDTO> {
  map(entity: AuthMfaEntity): MfaResponseDTO {
    return {
      enabled: entity.isEnabled(),
      type: entity.type.value,
      enrolledAt: new Date(entity.createdAt).toISOString(),
    };
  }
}
