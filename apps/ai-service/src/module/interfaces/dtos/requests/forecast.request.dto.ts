import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateForecastRequestDTO {
  @ApiProperty()
  target!: string;

  @ApiProperty({ type: [Object] })
  historicalData!: readonly {
    timestamp: string;
    value: number;
  }[];

  @ApiProperty({ example: 30 })
  horizonDays!: number;

  @ApiPropertyOptional({ example: 'linear_regression' })
  model?: string;

  @ApiPropertyOptional({ example: 3 })
  windowSize?: number;
}
