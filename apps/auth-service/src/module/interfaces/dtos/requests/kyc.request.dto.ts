/**
 * KycRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitKycRequestDTO {
  @ApiProperty({ enum: ['nid', 'passport', 'driving_license', 'birth_certificate'] })
  documentType!: string;

  @ApiProperty()
  documentNumber!: string;

  @ApiProperty({ format: 'url' })
  frontImageUrl!: string;

  @ApiPropertyOptional({ format: 'url' })
  backImageUrl?: string;
}

export class VerifyKycRequestDTO {
  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiPropertyOptional()
  note?: string;
}

export class RejectKycRequestDTO {
  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiProperty({ minLength: 3, maxLength: 500 })
  reason!: string;
}
