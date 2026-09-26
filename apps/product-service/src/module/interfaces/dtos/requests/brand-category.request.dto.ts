import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBrandHttpDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiPropertyOptional()
  logo?: string;
}

export class UpdateBrandHttpDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional({ nullable: true })
  logo?: string | null;
}

export class CreateCategoryHttpDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  slug!: string;

  @ApiPropertyOptional({ nullable: true })
  parentId?: string | null;
}

export class UpdateCategoryHttpDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional({ nullable: true })
  parentId?: string | null;
}
