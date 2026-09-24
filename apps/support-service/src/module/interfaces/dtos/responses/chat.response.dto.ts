import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiPropertyOptional()
  agentId?: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  startedAt!: string;

  @ApiPropertyOptional()
  endedAt?: string;
}
