import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PublicUserResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiProperty()
  createdAt!: string;
}
