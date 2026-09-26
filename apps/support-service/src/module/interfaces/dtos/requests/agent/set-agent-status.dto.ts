/**
 * SetAgentStatusRequestDTO
 * @module support-service/interfaces/dtos/requests/agent
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SetAgentStatusRequestDTO {
  @ApiProperty({ example: 'online' })
  @IsString()
  status!: string;
}
