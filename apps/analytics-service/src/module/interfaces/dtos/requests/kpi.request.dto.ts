/**
 * KPI Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type {
  CreateKpiDto,
  UpdateKpiDto,
  EvaluateKpiDto,
} from '../../../application/dtos/requests/kpi/index.js';

export class CreateKpiRequestDto implements CreateKpiDto {
  @ApiProperty({ example: 'Monthly Revenue Target', minLength: 3, maxLength: 150 })
  name!: string;

  @ApiProperty({ example: 'revenue' })
  metric!: string;

  @ApiProperty({ example: 100000, description: 'Target value' })
  target!: number;

  @ApiPropertyOptional({ example: 80, description: 'Warning threshold %' })
  thresholdPercent?: number;

  @ApiPropertyOptional({ example: true, description: 'Higher is better' })
  higherIsBetter?: boolean;

  @ApiPropertyOptional({ example: 'Q1 2026 revenue goal', maxLength: 500 })
  description?: string;

  @ApiPropertyOptional({ type: [String] })
  tags?: string[];
}

export class UpdateKpiRequestDto implements UpdateKpiDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  target?: number;

  @ApiPropertyOptional()
  thresholdPercent?: number;

  @ApiPropertyOptional()
  higherIsBetter?: boolean;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  isActive?: boolean;
}

export class EvaluateKpiRequestDto implements EvaluateKpiDto {
  @ApiProperty({ example: 95000, description: 'Current actual value' })
  actual!: number;

  @ApiPropertyOptional({ description: 'Evaluation timestamp' })
  evaluatedAt?: string;
}
