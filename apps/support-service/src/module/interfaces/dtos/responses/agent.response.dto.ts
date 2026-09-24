import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AgentResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiPropertyOptional()
  teamId?: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty({ type: [String] })
  skills!: string[];

  @ApiProperty()
  currentLoad!: number;

  @ApiProperty()
  maxLoad!: number;
}
