/**
 * Brand HTTP Response DTOs
 * @module product-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BrandHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiPropertyOptional() readonly description?: string;
  @ApiPropertyOptional() readonly logoUrl?: string;
  @ApiPropertyOptional() readonly bannerUrl?: string;
  @ApiPropertyOptional() readonly website?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly isFeatured!: boolean;
  @ApiProperty() readonly productCount!: number;
  @ApiPropertyOptional() readonly country?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class BrandPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiPropertyOptional() readonly logoUrl?: string;
  @ApiProperty() readonly productCount!: number;
}

export class BrandSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly slug!: string;
  @ApiPropertyOptional() readonly logoUrl?: string;
  @ApiProperty() readonly productCount!: number;
  @ApiProperty() readonly isFeatured!: boolean;
}

export class BrandListHttpResponseDTO {
  @ApiProperty({ type: [BrandSummaryHttpResponseDTO] })
  readonly items!: readonly BrandSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class BrandStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly featuredCount!: number;
  @ApiProperty() readonly totalProducts!: number;
}
