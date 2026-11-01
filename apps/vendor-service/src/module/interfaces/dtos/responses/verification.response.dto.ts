/**
 * Verification HTTP Response DTOs
 * @module vendor-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VerificationHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly vendorId!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly referenceId?: string;
  @ApiProperty() readonly submittedAt!: string;
  @ApiPropertyOptional() readonly reviewedAt?: string;
  @ApiPropertyOptional() readonly reviewedBy?: string;
  @ApiPropertyOptional() readonly expiresAt?: string;
  @ApiPropertyOptional() readonly rejectionReason?: string;
  @ApiProperty() readonly attempts!: number;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class VerificationListHttpResponseDTO {
  @ApiProperty({ type: [VerificationHttpResponseDTO] })
  readonly items!: readonly VerificationHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
