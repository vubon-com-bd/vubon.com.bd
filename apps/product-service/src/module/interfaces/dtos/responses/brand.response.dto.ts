/**
 * Brand Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BrandResponseDTO {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly slug!: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly logoUrl?: string;

  @ApiPropertyOptional()
  readonly bannerUrl?: string;

  @ApiPropertyOptional()
  readonly website?: string;

  @ApiProperty()
  readonly status!: string;

  @ApiProperty()
  readonly isFeatured!: boolean;

  @ApiProperty()
  readonly productCount!: number;

  @ApiPropertyOptional()
  readonly country?: string;

  @ApiProperty()
  readonly createdAt!: string;

  @ApiProperty()
  readonly updatedAt!: string;
}
