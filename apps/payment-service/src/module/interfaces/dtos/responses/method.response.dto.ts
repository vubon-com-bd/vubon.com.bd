import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MethodResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  type!: string;

  @ApiPropertyOptional()
  provider?: string | null;

  @ApiPropertyOptional()
  cardLast4?: string | null;

  @ApiPropertyOptional()
  cardBrand?: string | null;

  @ApiProperty()
  isDefault!: boolean;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  createdAt!: string;
}
