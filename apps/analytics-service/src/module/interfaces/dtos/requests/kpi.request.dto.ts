import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateKpiRequestDTO {
  @ApiProperty({ example: 'Monthly Active Users' })
  name!: string;

  @ApiProperty({ example: 'active_users' })
  metricName!: string;

  @ApiProperty({ example: 100000 })
  target!: number;

  @ApiProperty({ example: 80, description: 'Threshold percentage (0-100)' })
  threshold!: number;

  @ApiProperty({ example: 'user-123' })
  ownerId!: string;
}

export class UpdateKpiRequestDTO {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  target?: number;

  @ApiPropertyOptional()
  threshold?: number;

  @ApiPropertyOptional()
  metricName?: string;
}

export class EvaluateKpiRequestDTO {
  @ApiProperty({ example: 95000 })
  actual!: number;

  @ApiPropertyOptional({ example: '2026-09-24T12:00:00Z' })
  evaluatedAt?: string;
}
