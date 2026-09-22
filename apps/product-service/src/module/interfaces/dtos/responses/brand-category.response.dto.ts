import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BrandHttpResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiPropertyOptional({ nullable: true })
  logo?: string | null;
}

export class CategoryHttpResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  path!: string;

  @ApiPropertyOptional({ nullable: true })
  parentId?: string | null;
}
