/**
 * Commission HTTP Response DTOs
 * @module vendor-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommissionHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly vendorId!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly rate!: number;
  @ApiPropertyOptional() readonly fixedAmount?: number;
  @ApiPropertyOptional() readonly minAmount?: number;
  @ApiPropertyOptional() readonly maxAmount?: number;
  @ApiProperty() readonly effectiveFrom!: string;
  @ApiPropertyOptional() readonly effectiveTo?: string;
  @ApiProperty() readonly isActive!: boolean;
  @ApiProperty() readonly isCurrentlyActive!: boolean;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class CommissionCalculationHttpResponseDTO {
  @ApiProperty() readonly orderAmount!: number;
  @ApiProperty() readonly taxableAmount!: number;
  @ApiProperty() readonly commissionType!: string;
  @ApiPropertyOptional({ nullable: true }) readonly commissionRate?: number | null;
  @ApiProperty() readonly commissionAmount!: number;
  @ApiProperty() readonly vatAmount!: number;
  @ApiProperty() readonly totalDeduction!: number;
  @ApiProperty() readonly netPayout!: number;
  @ApiProperty({ type: [String] })
  readonly appliedConstraints!: readonly string[];
}

export class CommissionListHttpResponseDTO {
  @ApiProperty({ type: [CommissionHttpResponseDTO] })
  readonly items!: readonly CommissionHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
