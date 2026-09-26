import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateModelRequestDTO {
  @ApiProperty({ example: 'product-recommendation-v1' })
  name!: string;

  @ApiProperty({ example: 'recommendation' })
  type!: string;

  @ApiProperty({ example: 'a1b2c3d4-0000-0000-0000-000000000000' })
  providerId!: string;

  @ApiPropertyOptional({ example: '1.0.0' })
  version?: string;

  @ApiPropertyOptional({ example: 'https://api.openai.com/v1' })
  endpoint?: string | null;

  @ApiPropertyOptional({ example: 'Recommendation model' })
  description?: string | null;
}

export class UpdateModelRequestDTO {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  version?: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  type?: string;

  @ApiPropertyOptional()
  endpoint?: string | null;

  @ApiPropertyOptional()
  description?: string | null;
}

export class DeployModelRequestDTO {
  @ApiProperty()
  modelId!: string;

  @ApiPropertyOptional({ example: 'production' })
  environment?: string;
}

export class DeprecateModelRequestDTO {
  @ApiProperty()
  modelId!: string;

  @ApiProperty()
  reason!: string;

  @ApiPropertyOptional()
  replacementModelId?: string;
}

export class TestModelRequestDTO {
  @ApiProperty()
  modelId!: string;

  @ApiProperty({ type: [Object] })
  inputs!: readonly Record<string, unknown>[];
}
