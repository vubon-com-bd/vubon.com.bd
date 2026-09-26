import { ApiProperty } from '@nestjs/swagger';

export class CohortResponseDTO {
  @ApiProperty()
  cohortId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  period!: string;

  @ApiProperty()
  startDate!: string;

  @ApiProperty()
  endDate!: string;

  @ApiProperty()
  size!: number;

  @ApiProperty()
  bucketKey!: string;

  @ApiProperty()
  durationDays!: number;
}

export class CohortAnalysisResponseDTO {
  @ApiProperty()
  cohortId!: string;

  @ApiProperty()
  initialSize!: number;

  @ApiProperty({ type: [Number] })
  retainedSizes!: number[];

  @ApiProperty({ type: [Number] })
  retentionRates!: number[];

  @ApiProperty()
  day1Retention!: number;

  @ApiProperty()
  day7Retention!: number;

  @ApiProperty()
  day30Retention!: number;

  @ApiProperty()
  isHealthy!: boolean;
}

export class FunnelResponseDTO {
  @ApiProperty()
  funnelId!: string;

  @ApiProperty({ type: [String] })
  steps!: string[];

  @ApiProperty()
  stepCount!: number;

  @ApiProperty()
  createdAt!: string;
}

export class FunnelAnalysisResponseDTO {
  @ApiProperty()
  funnelId!: string;

  @ApiProperty({ type: [String] })
  steps!: string[];

  @ApiProperty({ type: [Number] })
  counts!: number[];

  @ApiProperty({ type: [Number] })
  conversionRates!: number[];

  @ApiProperty({ type: [Number] })
  dropOffRates!: number[];

  @ApiProperty()
  initialCount!: number;

  @ApiProperty()
  finalCount!: number;

  @ApiProperty()
  overallConversionRate!: number;

  @ApiProperty()
  biggestDropOffStepIndex!: number;
}
