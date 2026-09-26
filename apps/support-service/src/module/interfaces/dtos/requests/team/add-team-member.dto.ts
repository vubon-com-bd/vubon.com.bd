/**
 * AddTeamMemberRequestDTO
 * @module support-service/interfaces/dtos/requests/team
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AddTeamMemberRequestDTO {
  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isLeader?: boolean;
}
