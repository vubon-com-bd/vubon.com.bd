import { ApiProperty } from '@nestjs/swagger';
import type { MfaResponseDTO } from '../../../application/dtos/responses/mfa-response.dto';

export class MfaSetupResponseDTO implements MfaResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty({ example: 'totp' })
  method!: string;

  @ApiProperty()
  secret!: string;

  @ApiProperty()
  qrCodeUrl!: string;

  @ApiProperty()
  otpauthUrl!: string;

  @ApiProperty({ type: [String] })
  backupCodes!: string[];

  @ApiProperty()
  setupAt!: string;
}
