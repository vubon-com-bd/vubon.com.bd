/**
 * Media Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddMediaRequestDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly productId!: string;

  @ApiProperty({ enum: ['image', 'video', 'document'], example: 'image' })
  readonly type!: 'image' | 'video' | 'document';

  @ApiProperty({ example: 'https://cdn.vubon.com.bd/products/1.jpg' })
  readonly url!: string;

  @ApiPropertyOptional()
  readonly thumbnailUrl?: string;

  @ApiPropertyOptional()
  readonly alt?: string;

  @ApiPropertyOptional()
  readonly sortOrder?: number;

  @ApiPropertyOptional()
  readonly sizeBytes?: number;

  @ApiPropertyOptional()
  readonly mimeType?: string;

  @ApiPropertyOptional()
  readonly width?: number;

  @ApiPropertyOptional()
  readonly height?: number;

  @ApiPropertyOptional({ example: false })
  readonly isPrimary?: boolean;
}

export class ReorderMediaRequestDTO {
  @ApiProperty()
  readonly productId!: string;

  @ApiProperty({ type: [String] })
  readonly orderedIds!: readonly string[];

  @ApiProperty()
  readonly actorId!: string;
}
