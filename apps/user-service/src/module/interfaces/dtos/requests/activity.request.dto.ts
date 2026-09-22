import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ListActivityRequestDto {
  @ApiPropertyOptional({ default: 50 })
  limit?: number;
}

export class GetUserStatsRequestDto {
  @ApiProperty()
  userId!: string;
}
