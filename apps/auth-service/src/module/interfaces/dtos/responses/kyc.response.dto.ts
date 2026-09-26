/**
 * KycResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class KycResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty({ enum: ['not_submitted', 'pending', 'approved', 'rejected'] })
  status!: string;
  @ApiProperty({ enum: ['nid', 'passport', 'driving_license', 'birth_certificate'] })
  documentType!: string;
  @ApiProperty({ example: '****1234' }) documentNumberMasked!: string;
  @ApiPropertyOptional() submittedAt?: string;
  @ApiPropertyOptional() reviewedAt?: string;
  @ApiPropertyOptional() rejectionReason?: string;
}
