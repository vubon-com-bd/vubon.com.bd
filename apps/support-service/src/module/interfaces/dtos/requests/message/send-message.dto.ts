/**
 * SendMessageRequestDTO
 * @module support-service/interfaces/dtos/requests/message
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ArrayMaxSize,
} from 'class-validator';

export class SendMessageRequestDTO {
  @ApiProperty({ example: 'Hello, I need help with my order.' })
  @IsString()
  @MinLength(1)
  @MaxLength(10000)
  content!: string;

  @ApiPropertyOptional({ example: 'text' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  attachments?: string[];

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isInternal?: boolean;
}
