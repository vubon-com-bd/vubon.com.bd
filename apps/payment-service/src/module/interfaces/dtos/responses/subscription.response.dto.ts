/**
 * Subscription HTTP Response DTOs
 * @module payment-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubscriptionHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly plan!: string;
  @ApiProperty() readonly interval!: string;
  @ApiProperty() readonly intervalCount!: number;
  @ApiProperty() readonly price!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly startedAt!: string;
  @ApiProperty() readonly currentPeriodStart!: string;
  @ApiProperty() readonly currentPeriodEnd!: string;
  @ApiPropertyOptional() readonly trialEndsAt?: string;
  @ApiPropertyOptional() readonly cancelledAt?: string;
  @ApiProperty() readonly cancelAtPeriodEnd!: boolean;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class SubscriptionSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly plan!: string;
  @ApiProperty() readonly price!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly currentPeriodEnd!: string;
}

export class SubscriptionListHttpResponseDTO {
  @ApiProperty({ type: [SubscriptionSummaryHttpResponseDTO] })
  readonly items!: readonly SubscriptionSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class SubscriptionStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly active!: number;
  @ApiProperty() readonly trialing!: number;
  @ApiProperty() readonly cancelled!: number;
  @ApiProperty() readonly totalMrr!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byPlan!: Readonly<Record<string, number>>;
}
