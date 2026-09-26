import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  value!: string;

  @ApiProperty()
  verified!: boolean;

  @ApiPropertyOptional()
  label?: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
