/**
 * TransferChatRequestDTO
 * @module support-service/interfaces/dtos/requests/live-chat
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TransferChatRequestDTO {
  @ApiProperty() @IsString() toAgentId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}
