import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTicketRequestDto {
  @ApiProperty({ example: 'Cannot place order' })
  subject!: string;

  @ApiProperty({ example: 'Detailed description...' })
  description!: string;

  @ApiProperty({ example: 'user-123' })
  userId!: string;

  @ApiPropertyOptional({ example: 'high' })
  priority?: string;

  @ApiPropertyOptional({ example: 'bug_report' })
  type?: string;

  @ApiPropertyOptional({ example: 'web' })
  channel?: string;

  @ApiPropertyOptional({ example: ['order', 'payment'] })
  tags?: string[];
}

export class UpdateTicketRequestDto {
  @ApiPropertyOptional()
  subject?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  priority?: string;

  @ApiPropertyOptional()
  tags?: string[];
}

export class AssignTicketRequestDto {
  @ApiProperty()
  agentId!: string;
}

export class EscalateTicketRequestDto {
  @ApiProperty()
  reason!: string;

  @ApiPropertyOptional({ enum: ['L1', 'L2', 'L3', 'L4'] })
  level?: string;
}

export class RateTicketRequestDto {
  @ApiProperty({ minimum: 1, maximum: 5 })
  score!: number;

  @ApiPropertyOptional()
  comment?: string;
}
