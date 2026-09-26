import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const VALID_PERIODS = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'] as const;

export class CreateCohortRequestDTO {
  @ApiProperty({ example: 'September Signups' })
  name!: string;

  @ApiProperty({ enum: VALID_PERIODS, example: 'weekly' })
  period!: string;

  @ApiProperty({ example: '2026-09-01T00:00:00Z' })
  fromDate!: string;

  @ApiProperty({ example: '2026-09-30T23:59:59Z' })
  toDate!: string;

  @ApiProperty({ example: ['user-1', 'user-2'], isArray: true })
  userIds!: string[];
}

export class AnalyzeCohortRequestDTO {
  @ApiPropertyOptional({ example: 30 })
  periods?: number;
}

export class CreateFunnelRequestDTO {
  @ApiProperty({ example: 'Signup Funnel' })
  name!: string;

  @ApiProperty({
    example: ['visit', 'signup', 'verify_email', 'first_purchase'],
    isArray: true,
  })
  steps!: string[];

  @ApiProperty({ example: 'user-123' })
  ownerId!: string;
}

export class AnalyzeFunnelRequestDTO {
  @ApiProperty({ example: '2026-09-01T00:00:00Z' })
  fromDate!: string;

  @ApiProperty({ example: '2026-09-30T23:59:59Z' })
  toDate!: string;
}
