import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TicketResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  number!: string;

  @ApiProperty()
  subject!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  priority!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  channel!: string;

  @ApiProperty()
  userId!: string;

  @ApiPropertyOptional()
  assignedAgentId?: string;

  @ApiProperty({ type: [String] })
  tags!: string[];

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiPropertyOptional()
  resolvedAt?: string;

  @ApiPropertyOptional()
  closedAt?: string;
}

export class TicketPublicResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  number!: string;

  @ApiProperty()
  subject!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  priority!: string;

  @ApiProperty()
  createdAt!: string;
}
