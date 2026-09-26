import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  visibility!: string;

  @ApiPropertyOptional()
  avatarUrl?: string;

  @ApiPropertyOptional()
  bio?: string;

  @ApiProperty()
  updatedAt!: string;
}
