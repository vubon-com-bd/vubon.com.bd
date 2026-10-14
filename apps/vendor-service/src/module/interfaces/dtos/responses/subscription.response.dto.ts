/**
 * Subscription HTTP Response DTOs
 * @module vendor-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubscriptionHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly vendorId!: string;
  @ApiProperty() readonly plan!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly cycle!: string;
  @ApiProperty() readonly priceAmount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly startedAt!: string;
  @ApiPropertyOptional() readonly trialEndsAt?: string;
  @ApiProperty() readonly currentPeriodStart!: string;
  @ApiProperty() readonly currentPeriodEnd!: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiPropertyOptional() readonly cancellationReason?: string;
  @ApiProperty() readonly cancelAtPeriodEnd!: boolean;
  @ApiProperty() readonly autoRenew!: boolean;
  @ApiPropertyOptional() readonly lastPaymentAt?: string;
  @ApiPropertyOptional() readonly nextPaymentAt?: string;
  @ApiProperty() readonly daysRemainingInPeriod!: number;
  @ApiPropertyOptional({ nullable: true }) readonly trialDaysRemaining?: number | null;
  @ApiProperty() readonly monthlyEquivalent!: number;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class SubscriptionPlanHttpResponseDTO {
  @ApiProperty() readonly plan!: string;
  @ApiProperty() readonly displayName!: string;
  @ApiProperty() readonly priceMonthly!: number;
  @ApiProperty() readonly priceYearly!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ type: [String] })
  readonly features!: readonly string[];
  @ApiPropertyOptional({ nullable: true }) readonly maxProducts?: number | null;
  @ApiProperty() readonly maxTeamMembers!: number;
}

export class SubscriptionPlanListHttpResponseDTO {
  @ApiProperty({ type: [SubscriptionPlanHttpResponseDTO] })
  readonly plans!: readonly SubscriptionPlanHttpResponseDTO[];
}

export class SubscriptionStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly active!: number;
  @ApiProperty() readonly trial!: number;
  @ApiProperty() readonly pastDue!: number;
  @ApiProperty() readonly cancelled!: number;
  @ApiProperty() readonly expired!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byPlan!: Readonly<Record<string, number>>;
  @ApiProperty() readonly monthlyRevenue!: number;
}
