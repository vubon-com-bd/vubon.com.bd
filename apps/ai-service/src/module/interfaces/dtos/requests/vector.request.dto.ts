import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IndexVectorRequestDTO {
  @ApiProperty()
  vectorId!: string;

  @ApiProperty()
  indexId!: string;

  @ApiPropertyOptional()
  metadata?: Record<string, string | number | boolean>;
}

export class SearchVectorRequestDTO {
  @ApiProperty()
  indexId!: string;

  @ApiProperty({ type: [Number] })
  vector!: readonly number[];

  @ApiPropertyOptional({ example: 10 })
  topK?: number;

  @ApiPropertyOptional({ example: 'cosine' })
  metric?: string;

  @ApiPropertyOptional({ example: 0.7 })
  threshold?: number;
}

export class RebuildIndexRequestDTO {
  @ApiProperty()
  indexId!: string;

  @ApiPropertyOptional({ example: false })
  force?: boolean;
}
