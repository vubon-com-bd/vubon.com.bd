/**
 * Verification HTTP Response DTOs
 * @module payment-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VerificationHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly paymentId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly method!: string;
  @ApiProperty() readonly attempts!: number;
  @ApiProperty() readonly expiresAt!: string;
  @ApiPropertyOptional() readonly verifiedAt?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class VerificationInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly verificationId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly expiresAt!: string;
}
