/**
 * SendChatMessageRequestDTO
 * @module support-service/interfaces/dtos/requests/live-chat
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SendChatMessageRequestDTO {
  @ApiProperty() @IsString() @MinLength(1) @MaxLength(10000) content!: string;

  @ApiPropertyOptional({ example: 'customer' })
  @IsOptional()
  @IsString()
  senderType?: string;
}
