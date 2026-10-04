/**
 * KYC Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class KycDocumentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() type!: string;
  @ApiPropertyOptional() number?: string;
  @ApiProperty() frontUrl!: string;
  @ApiPropertyOptional() backUrl?: string;
  @ApiPropertyOptional() selfieUrl?: string;
  @ApiProperty() verified!: boolean;
  @ApiProperty() uploadedAt!: string;
}

export class KycResponseDto {
  @ApiProperty() userId!: string;
  @ApiProperty() status!: string;
  @ApiProperty() level!: number;
  @ApiProperty({ type: [KycDocumentResponseDto] })
  documents!: readonly KycDocumentResponseDto[];
  @ApiPropertyOptional() submittedAt?: string;
  @ApiPropertyOptional() reviewedAt?: string;
  @ApiPropertyOptional() reviewedBy?: string;
  @ApiPropertyOptional() rejectionReason?: string;
  @ApiPropertyOptional() expiresAt?: string;
  @ApiProperty() updatedAt!: string;
}

export class KycListResponseDto {
  @ApiProperty({ type: [KycResponseDto] }) items!: readonly KycResponseDto[];
  @ApiProperty() total!: number;
}
