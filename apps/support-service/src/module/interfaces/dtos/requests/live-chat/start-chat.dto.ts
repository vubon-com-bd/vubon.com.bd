/**
 * StartChatRequestDTO
 * @module support-service/interfaces/dtos/requests/live-chat
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class StartChatRequestDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  visitorId?: string;

  @ApiProperty({ example: 'customer_initiated' })
  @IsString()
  trigger!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  subject?: string;
}
