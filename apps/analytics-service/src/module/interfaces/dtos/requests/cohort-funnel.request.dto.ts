/**
 * Cohort + Funnel Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type {
  CreateCohortDto,
  AnalyzeCohortDto,
} from '../../../application/dtos/requests/cohort/index.js';
import type {
  CreateFunnelDto,
  AnalyzeFunnelDto,
} from '../../../application/dtos/requests/funnel/index.js';

export class CreateCohortRequestDto implements CreateCohortDto {
  @ApiProperty({ example: 'January 2026 Signups' })
  name!: string;

  @ApiProperty({ example: 'month', enum: ['day', 'week', 'month', 'quarter', 'year'] })
  period!: string;

  @ApiProperty({ example: '2026-01-01T00:00:00Z' })
  fromDate!: string;

  @ApiProperty({ example: '2026-02-01T00:00:00Z' })
  toDate!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  acquisitionEvent?: string;
}

export class AnalyzeCohortRequestDto implements AnalyzeCohortDto {
  @ApiPropertyOptional({ default: 12, description: 'Max retention periods' })
  maxPeriods?: number;

  @ApiPropertyOptional({ default: 10, description: 'Min cohort size for privacy' })
  minCohortSize?: number;
}

export class CreateFunnelRequestDto implements CreateFunnelDto {
  @ApiProperty({ example: 'Checkout Funnel' })
  name!: string;

  @ApiProperty({
    description: 'Funnel steps (2-20)',
    example: [
      { order: 1, name: 'View Product' },
      { order: 2, name: 'Add to Cart' },
      { order: 3, name: 'Begin Checkout' },
      { order: 4, name: 'Purchase' },
    ],
  })
  steps!: { order: number; name: string }[];

  @ApiPropertyOptional()
  fromDate?: string;

  @ApiPropertyOptional()
  toDate?: string;

  @ApiPropertyOptional({ default: 1440, description: 'Session window (minutes)' })
  windowMinutes?: number;

  @ApiPropertyOptional()
  stage?: string;
}

export class AnalyzeFunnelRequestDto implements AnalyzeFunnelDto {
  @ApiPropertyOptional()
  fromDate?: string;

  @ApiPropertyOptional()
  toDate?: string;

  @ApiPropertyOptional({ enum: ['none', 'device', 'source', 'country'], default: 'none' })
  breakdownBy?: 'none' | 'device' | 'source' | 'country';
}
