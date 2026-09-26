/**
 * SendChatbotMessageRequestDTO — HTTP layer
 * @module support-service/interfaces/dtos/requests/chatbot
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SendChatbotMessageRequestDTO {
  @ApiProperty({ example: 'How do I track my order?' })
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  message!: string;

  @ApiPropertyOptional({ example: 'session-uuid' })
  @IsOptional()
  @IsString()
  sessionId?: string;
}
