/**
 * TrainEntityRequestDTO
 * @module support-service/interfaces/dtos/requests/chatbot
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TrainEntityRequestDTO {
  @ApiProperty({ example: 'order_number' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'text' })
  @IsString()
  entityType!: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enumValues?: string[];
}
