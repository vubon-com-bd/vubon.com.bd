import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StartTrainingRequestDTO {
  @ApiProperty()
  modelId!: string;

  @ApiProperty()
  datasetId!: string;

  @ApiPropertyOptional({ example: 10 })
  epochs?: number;

  @ApiPropertyOptional({ example: 32 })
  batchSize?: number;

  @ApiPropertyOptional({ example: 0.001 })
  learningRate?: number;

  @ApiPropertyOptional({ example: 0.2 })
  validationSplit?: number;

  @ApiPropertyOptional()
  hyperparameters?: Record<string, string | number | boolean>;
}

export class EvaluateModelRequestDTO {
  @ApiProperty()
  modelId!: string;

  @ApiProperty()
  testDatasetId!: string;

  @ApiPropertyOptional({ type: [String] })
  metrics?: readonly string[];
}
