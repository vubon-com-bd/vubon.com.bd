import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateEmbeddingRequestDTO {
  @ApiProperty()
  sourceId!: string;

  @ApiProperty()
  sourceType!: string;

  @ApiProperty()
  content!: string;

  @ApiPropertyOptional({ example: 'text' })
  type?: string;

  @ApiPropertyOptional({ example: 1536 })
  dimension?: number;
}

export class BatchEmbeddingRequestDTO {
  @ApiProperty({ type: [Object] })
  items!: readonly {
    sourceId: string;
    sourceType: string;
    content: string;
  }[];
}
