/**
 * Analytics Response DTOs — cohort, funnel, session, traffic, attribution, time-series
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CohortResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() period!: string;
  @ApiProperty() fromDate!: string;
  @ApiProperty() toDate!: string;
  @ApiProperty() isActive!: boolean;
  @ApiProperty() bucketCount!: number;
  @ApiPropertyOptional() cohortSize?: number;
  @ApiPropertyOptional() lastAnalyzedAt?: string;
}

export class CohortAnalysisResponseDto {
  @ApiProperty() cohortId!: string;
  @ApiProperty() cohortSize!: number;
  @ApiProperty({ type: [Number] }) retentionRates!: number[];
  @ApiProperty() retention1!: number;
  @ApiProperty() retention7!: number;
  @ApiProperty() retention30!: number;
  @ApiProperty() decayRate!: number;
  @ApiProperty() longTermRetention!: number;
  @ApiProperty() isHealthy!: boolean;
}

export class FunnelStepResponseDto {
  @ApiProperty() stepName!: string;
  @ApiProperty() stepOrder!: number;
  @ApiProperty() userCount!: number;
  @ApiProperty() dropOff!: number;
  @ApiProperty() dropOffRate!: number;
  @ApiProperty() conversionRate!: number;
}

export class FunnelResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() stepCount!: number;
  @ApiProperty() isActive!: boolean;
  @ApiPropertyOptional() lastAnalyzedAt?: string;
  @ApiPropertyOptional({ type: [FunnelStepResponseDto] }) steps?: FunnelStepResponseDto[];
}

export class FunnelAnalysisResponseDto {
  @ApiProperty() funnelId!: string;
  @ApiProperty({ type: [Number] }) stepCounts!: number[];
  @ApiProperty() entryCount!: number;
  @ApiProperty() finalCount!: number;
  @ApiProperty() overallConversionRate!: number;
  @ApiProperty() averageStepConversion!: number;
  @ApiProperty() biggestDropOffStep!: number;
  @ApiProperty({ type: [String] }) criticalSteps!: string[];
  @ApiProperty({ type: [String] }) recommendations!: string[];
}

export class SessionResponseDto {
  @ApiProperty() id!: string;
  @ApiPropertyOptional() userId?: string;
  @ApiPropertyOptional() device?: string;
  @ApiProperty() startedAt!: string;
  @ApiPropertyOptional() endedAt?: string;
  @ApiProperty() durationSeconds!: number;
  @ApiProperty() eventCount!: number;
  @ApiProperty() pageViewCount!: number;
  @ApiProperty() isBounce!: boolean;
  @ApiProperty() isEngaged!: boolean;
  @ApiProperty() isAnonymous!: boolean;
}

export class TimeSeriesPointDto {
  @ApiProperty() timestamp!: number;
  @ApiProperty() value!: number;
}

export class TimeSeriesResponseDto {
  @ApiProperty() metric!: string;
  @ApiProperty() aggregation!: string;
  @ApiProperty() granularity!: string;
  @ApiProperty() fromDate!: string;
  @ApiProperty() toDate!: string;
  @ApiProperty({ type: [TimeSeriesPointDto] }) points!: TimeSeriesPointDto[];
  @ApiProperty() total!: number;
  @ApiProperty() average!: number;
}
