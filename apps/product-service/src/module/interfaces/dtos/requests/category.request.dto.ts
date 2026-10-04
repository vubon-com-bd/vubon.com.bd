/**
 * Category Request DTOs
 * @module product-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryRequestDTO {
  @ApiProperty({ example: 'Electronics' })
  readonly name!: string;

  @ApiProperty({ example: 'electronics' })
  readonly slug!: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly parentId?: string;

  @ApiPropertyOptional()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  readonly sortOrder?: number;
}

export class UpdateCategoryRequestDTO {
  @ApiProperty()
  readonly categoryId!: string;

  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  readonly sortOrder?: number;

  @ApiPropertyOptional()
  readonly isFeatured?: boolean;

  @ApiProperty()
  readonly actorId!: string;
}

export class MoveCategoryRequestDTO {
  @ApiProperty()
  readonly categoryId!: string;

  @ApiPropertyOptional({ nullable: true })
  readonly newParentId?: string | null;

  @ApiProperty()
  readonly actorId!: string;
}
