import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterAgentRequestDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty({ example: 'l1' })
  type!: string;

  @ApiPropertyOptional()
  teamId?: string;

  @ApiPropertyOptional({ type: [String] })
  skills?: string[];

  @ApiPropertyOptional()
  maxLoad?: number;
}

export class SetAgentStatusRequestDto {
  @ApiProperty({ example: 'online' })
  status!: string;
}
