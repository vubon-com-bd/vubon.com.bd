/**
 * Collection Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CollectionResponseDTO {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly slug!: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiProperty()
  readonly type!: string;

  @ApiProperty()
  readonly status!: string;

  @ApiPropertyOptional()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  readonly bannerUrl?: string;

  @ApiProperty({ type: [String] })
  readonly productIds!: readonly string[];

  @ApiProperty()
  readonly productCount!: number;

  @ApiProperty()
  readonly isFeatured!: boolean;

  @ApiProperty()
  readonly sortOrder!: number;

  @ApiPropertyOptional()
  readonly startAt?: string;

  @ApiPropertyOptional()
  readonly endAt?: string;

  @ApiProperty()
  readonly createdAt!: string;

  @ApiProperty()
  readonly updatedAt!: string;
}
