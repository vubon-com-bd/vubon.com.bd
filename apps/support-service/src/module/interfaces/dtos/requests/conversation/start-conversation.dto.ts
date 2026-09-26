/**
 * StartConversationRequestDTO — HTTP layer
 * @module support-service/interfaces/dtos/requests/conversation
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class StartConversationRequestDTO {
  @ApiPropertyOptional({ example: 'Regarding order #123' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'direct' })
  @IsString()
  type!: string;

  @ApiProperty({ type: [String], example: ['user-1', 'user-2'] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @IsString({ each: true })
  participantIds!: string[];

  @ApiPropertyOptional({ example: 'ticket-abc' })
  @IsOptional()
  @IsString()
  ticketId?: string;
}
