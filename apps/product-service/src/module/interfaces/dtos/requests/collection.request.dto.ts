/**
 * Collection Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { COLLECTION_TYPE } from '@vubon/shared-constants/business/product';

export class CreateCollectionRequestDTO {
  @ApiProperty({ example: 'Summer Sale 2024' })
  readonly name!: string;

  @ApiProperty({ example: 'summer-sale-2024' })
  readonly slug!: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiProperty({ enum: Object.values(COLLECTION_TYPE), example: 'seasonal' })
  readonly type!: string;

  @ApiPropertyOptional()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  readonly isFeatured?: boolean;
}

export class UpdateCollectionRequestDTO {
  @ApiProperty()
  readonly collectionId!: string;

  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  readonly isFeatured?: boolean;

  @ApiPropertyOptional()
  readonly sortOrder?: number;
}

export class AddProductToCollectionRequestDTO {
  @ApiProperty()
  readonly collectionId!: string;

  @ApiProperty()
  readonly productId!: string;

  @ApiProperty()
  readonly addedBy!: string;
}
