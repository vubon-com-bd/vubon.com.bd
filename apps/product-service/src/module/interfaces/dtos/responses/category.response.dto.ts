/**
 * Category HTTP Response DTOs
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiPropertyOptional() readonly parentId?: string;
  @ApiProperty({ type: [String] }) readonly path!: readonly string[];
  @ApiProperty() readonly depth!: number;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiPropertyOptional() readonly iconUrl?: string;
  @ApiProperty() readonly sortOrder!: number;
  @ApiProperty() readonly productCount!: number;
  @ApiProperty() readonly isFeatured!: boolean;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class CategoryPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiPropertyOptional() readonly parentId?: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiProperty() readonly productCount!: number;
}

export class CategorySummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiProperty() readonly depth!: number;
  @ApiProperty() readonly productCount!: number;
}

export class CategoryListHttpResponseDTO {
  @ApiProperty({ type: [CategorySummaryHttpResponseDTO] })
  readonly items!: readonly CategorySummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class CategoryTreeNodeHttpDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiProperty() readonly productCount!: number;
  @ApiProperty({ type: () => [CategoryTreeNodeHttpDTO] })
  readonly children!: readonly CategoryTreeNodeHttpDTO[];
}

export class CategoryTreeHttpResponseDTO {
  @ApiProperty({ type: [CategoryTreeNodeHttpDTO] })
  readonly roots!: readonly CategoryTreeNodeHttpDTO[];
  @ApiProperty() readonly totalNodes!: number;
  @ApiProperty() readonly maxDepth!: number;
}

export class CategoryStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly rootCount!: number;
  @ApiProperty() readonly maxDepth!: number;
  @ApiProperty() readonly totalProducts!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byDepth!: Readonly<Record<number, number>>;
}
