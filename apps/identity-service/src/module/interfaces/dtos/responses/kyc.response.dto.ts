import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class KycDocumentHttpResponseDTO {
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly number!: string;
  @ApiProperty() readonly frontUrl!: string;
  @ApiPropertyOptional() readonly backUrl?: string;
  @ApiPropertyOptional() readonly selfieUrl?: string;
  @ApiProperty() readonly verified!: boolean;
}

export class KycHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly level!: number;
  @ApiProperty({ type: [KycDocumentHttpResponseDTO] })
  readonly documents!: readonly KycDocumentHttpResponseDTO[];
  @ApiPropertyOptional() readonly submittedAt?: string;
  @ApiPropertyOptional() readonly verifiedAt?: string;
  @ApiPropertyOptional() readonly rejectionReason?: string;
  @ApiProperty() readonly updatedAt!: string;
}
