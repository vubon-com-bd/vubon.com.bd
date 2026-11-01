/**
 * Collection HTTP Response DTOs
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CollectionHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiPropertyOptional() readonly bannerUrl?: string;
  @ApiProperty({ type: [String] }) readonly productIds!: readonly string[];
  @ApiProperty() readonly productCount!: number;
  @ApiProperty() readonly isFeatured!: boolean;
  @ApiProperty() readonly sortOrder!: number;
  @ApiPropertyOptional() readonly startAt?: string;
  @ApiPropertyOptional() readonly endAt?: string;
  @ApiProperty() readonly isActive!: boolean;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class CollectionListHttpResponseDTO {
  @ApiProperty({ type: [CollectionHttpResponseDTO] })
  readonly items!: readonly CollectionHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class CollectionStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly featuredCount!: number;
  @ApiProperty() readonly totalProductRefs!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
}
