import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConversationResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiPropertyOptional()
  agentId?: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  startedAt!: string;

  @ApiPropertyOptional()
  endedAt?: string;
}
