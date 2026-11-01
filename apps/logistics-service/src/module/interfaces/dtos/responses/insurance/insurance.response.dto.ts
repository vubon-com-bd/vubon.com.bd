/**
 * Insurance HTTP Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InsuranceClaimHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly claimNumber!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly reason!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiPropertyOptional({ type: [String] }) readonly images?: readonly string[];
  @ApiProperty() readonly amount!: number;
  @ApiPropertyOptional() readonly approvedAmount?: number;
  @ApiProperty() readonly submittedAt!: string;
  @ApiPropertyOptional() readonly reviewedAt?: string;
  @ApiPropertyOptional() readonly approvedAt?: string;
  @ApiPropertyOptional() readonly rejectedAt?: string;
  @ApiPropertyOptional() readonly rejectionReason?: string;
  @ApiPropertyOptional() readonly paidAt?: string;
}

export class InsuranceHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly policyNumber!: string;
  @ApiPropertyOptional() readonly shipmentId?: string;
  @ApiPropertyOptional() readonly orderId?: string;
  @ApiPropertyOptional() readonly userId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty({ type: [String] }) readonly coverages!: readonly string[];
  @ApiProperty() readonly declaredValue!: number;
  @ApiProperty() readonly premium!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly startsAt!: string;
  @ApiProperty() readonly expiresAt!: string;
  @ApiProperty() readonly isClaimed!: boolean;
  @ApiPropertyOptional() readonly provider?: string;
  @ApiPropertyOptional() readonly notes?: string;
  @ApiProperty({ type: [InsuranceClaimHttpResponseDTO] })
  readonly claims!: readonly InsuranceClaimHttpResponseDTO[];
  @ApiPropertyOptional() readonly activatedAt?: string;
  @ApiPropertyOptional() readonly expiredAt?: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiPropertyOptional() readonly cancelReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class InsuranceSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly policyNumber!: string;
  @ApiPropertyOptional() readonly shipmentId?: string;
  @ApiPropertyOptional() readonly orderId?: string;
  @ApiPropertyOptional() readonly userId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly declaredValue!: number;
  @ApiProperty() readonly premium!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly isClaimed!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

export class InsuranceListHttpResponseDTO {
  @ApiProperty({ type: [InsuranceSummaryHttpResponseDTO] })
  readonly items!: readonly InsuranceSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class InsuranceStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly claimedCount!: number;
  @ApiProperty() readonly totalPremium!: number;
  @ApiProperty() readonly totalClaimsPaid!: number;
  @ApiProperty() readonly currency!: string;
}

export class InsuranceInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly insuranceId!: string;
  @ApiProperty() readonly policyNumber!: string;
  @ApiProperty() readonly status!: string;
}
