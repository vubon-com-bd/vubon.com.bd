import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SemanticSearchRequestDTO {
  @ApiProperty({ example: 'wireless headphones' })
  query!: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  model?: string;

  @ApiPropertyOptional({ example: 20 })
  limit?: number;

  @ApiPropertyOptional({ example: 0.7 })
  threshold?: number;
}

export class HybridSearchRequestDTO {
  @ApiProperty()
  query!: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional({ example: 0.7 })
  semanticWeight?: number;

  @ApiPropertyOptional({ example: 20 })
  limit?: number;
}

export class AutocompleteRequestDTO {
  @ApiProperty()
  prefix!: string;

  @ApiPropertyOptional({ example: 10 })
  limit?: number;
}
