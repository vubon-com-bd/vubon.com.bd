import { Injectable } from '@nestjs/common';
import type { MfaResponseDTO } from '../../application/dtos/responses/mfa-response.dto';
import type { MfaSetupResponseDTO } from '../dtos/responses/mfa.response.dto';

@Injectable()
export class MfaControllerMapper {
  toMfaResponse(dto: MfaResponseDTO): MfaSetupResponseDTO {
    return {
      success: dto.success,
      method: dto.method,
      secret: dto.secret,
      qrCodeUrl: dto.qrCodeUrl,
      otpauthUrl: dto.otpauthUrl,
      backupCodes: [...dto.backupCodes],
      setupAt: dto.setupAt,
    };
  }
}
