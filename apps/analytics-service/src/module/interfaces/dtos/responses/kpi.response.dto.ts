/**
 * KPI Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { KpiResponseData } from '../../../application/dtos/responses/kpi-response.dto.js';
import type { KpiResultResponseData } from '../../../application/dtos/responses/kpi-result-response.dto.js';

export class KpiResponseDto implements KpiResponseData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  metric!: string;

  @ApiProperty()
  target!: number;

  @ApiProperty()
  thresholdPercent!: number;

  @ApiProperty()
  higherIsBetter!: boolean;

  @ApiProperty()
  isActive!: boolean;

  @ApiPropertyOptional()
  lastActualValue?: number;

  @ApiPropertyOptional()
  lastEvaluatedAt?: string;
}

export class KpiResultResponseDto implements KpiResultResponseData {
  @ApiProperty()
  kpiId!: string;

  @ApiProperty()
  kpiName!: string;

  @ApiProperty()
  actual!: number;

  @ApiProperty()
  target!: number;

  @ApiProperty({ example: 87.5 })
  achievementPercent!: number;

  @ApiProperty({ example: 'on_track' })
  status!: string;

  @ApiProperty({ example: false })
  requiresAlert!: boolean;

  @ApiProperty()
  evaluatedAt!: string;
}
