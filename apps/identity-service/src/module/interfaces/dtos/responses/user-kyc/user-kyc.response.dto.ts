import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class KycDocumentHttpResponseDTO {
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly number!: string;
  @ApiProperty() readonly verified!: boolean;
}

export class UserKycHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty({ type: [KycDocumentHttpResponseDTO] })
  readonly documents!: readonly KycDocumentHttpResponseDTO[];
  @ApiPropertyOptional() readonly submittedAt?: string;
  @ApiPropertyOptional() readonly verifiedAt?: string;
  @ApiPropertyOptional() readonly rejectedAt?: string;
  @ApiPropertyOptional() readonly rejectionReason?: string;
  @ApiPropertyOptional() readonly expiresAt?: string;
  @ApiProperty() readonly updatedAt!: string;
}
