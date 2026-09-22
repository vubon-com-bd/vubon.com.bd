import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PublicProductHttpResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional({ nullable: true })
  brandId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  categoryId?: string | null;
}
