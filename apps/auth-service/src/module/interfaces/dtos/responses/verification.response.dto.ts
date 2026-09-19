import { ApiProperty } from '@nestjs/swagger';
import type { UserVerificationResponseDTO } from '../../../application/dtos/responses/user-verification-response.dto';

export class VerificationResponseDTO implements UserVerificationResponseDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  verificationCount!: number;

  @ApiProperty()
  isFullyVerified!: boolean;
}
