/**
 * Category Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryResponseDTO {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly slug!: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly parentId?: string;

  @ApiProperty({ type: [String] })
  readonly path!: readonly string[];

  @ApiProperty()
  readonly depth!: number;

  @ApiProperty()
  readonly status!: string;

  @ApiPropertyOptional()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  readonly iconUrl?: string;

  @ApiProperty()
  readonly sortOrder!: number;

  @ApiProperty()
  readonly productCount!: number;

  @ApiProperty()
  readonly isFeatured!: boolean;

  @ApiProperty()
  readonly hasChildren!: boolean;

  @ApiProperty()
  readonly createdAt!: string;

  @ApiProperty()
  readonly updatedAt!: string;
}

export class CategoryTreeResponseDTO extends CategoryResponseDTO {
  @ApiProperty({ type: () => [CategoryTreeResponseDTO] })
  readonly children!: readonly CategoryTreeResponseDTO[];
}
