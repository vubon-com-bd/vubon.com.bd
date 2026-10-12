/**
 * MFA Disable Response DTO
 * @module identity-service/interfaces/dtos/responses/mfa
 */
import { ApiProperty } from '@nestjs/swagger';

export class MfaDisableHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ example: false }) readonly enabled!: boolean;
  @ApiProperty({ example: 'MFA disabled' }) readonly message!: string;
}
