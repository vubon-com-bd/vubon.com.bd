import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ActivityResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  category!: string;

  @ApiProperty()
  occurredAt!: string;

  @ApiPropertyOptional()
  userAgent?: string;

  @ApiPropertyOptional()
  ipAddress?: string;

  @ApiPropertyOptional()
  metadata?: Readonly<Record<string, unknown>>;

  @ApiProperty()
  createdAt!: string;
}
