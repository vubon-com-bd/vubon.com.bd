/**
 * TrainIntentRequestDTO
 * @module support-service/interfaces/dtos/requests/chatbot
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class TrainIntentRequestDTO {
  @ApiProperty({ example: 'greeting' })
  @IsString()
  intent!: string;

  @ApiProperty({ type: [String], example: ['Hi', 'Hello'] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  responses!: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @ApiPropertyOptional({ example: 0.7, minimum: 0, maximum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  confidence?: number;
}
