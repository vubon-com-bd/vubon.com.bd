import { ApiProperty } from '@nestjs/swagger';

export class ForecastDataPointResponseDTO {
  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  value!: number;

  @ApiProperty()
  confidenceLower!: number;

  @ApiProperty()
  confidenceUpper!: number;
}

export class ForecastResponseDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  target!: string;

  @ApiProperty()
  model!: string;

  @ApiProperty()
  horizonDays!: number;

  @ApiProperty({ type: [ForecastDataPointResponseDTO] })
  points!: ForecastDataPointResponseDTO[];

  @ApiProperty()
  generatedAt!: string;
}
