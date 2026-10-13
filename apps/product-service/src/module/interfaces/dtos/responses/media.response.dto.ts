/**
 * Media HTTP Response DTOs
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MediaItemHttpResponseDTO {
  @ApiProperty() readonly url!: string;
  @ApiProperty() readonly type!: 'image' | 'video' | 'document';
  @ApiPropertyOptional() readonly alt?: string;
  @ApiProperty() readonly order!: number;
  @ApiProperty() readonly isPrimary!: boolean;
}

export class MediaHttpResponseDTO {
  @ApiProperty() readonly productId!: string;
  @ApiProperty({ type: [MediaItemHttpResponseDTO] })
  readonly items!: readonly MediaItemHttpResponseDTO[];
  @ApiPropertyOptional() readonly thumbnailUrl?: string;
  @ApiPropertyOptional() readonly videoUrl?: string;
  @ApiProperty() readonly imageCount!: number;
  @ApiProperty() readonly videoCount!: number;
}
