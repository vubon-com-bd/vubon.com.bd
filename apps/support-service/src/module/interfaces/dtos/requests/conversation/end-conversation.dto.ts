/**
 * EndConversationRequestDTO
 * @module support-service/interfaces/dtos/requests/conversation
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class EndConversationRequestDTO {
  @ApiPropertyOptional({ example: 'resolved' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
