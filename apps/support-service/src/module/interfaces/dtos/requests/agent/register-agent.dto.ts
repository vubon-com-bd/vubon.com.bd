/**
 * RegisterAgentRequestDTO
 * @module support-service/interfaces/dtos/requests/agent
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class RegisterAgentRequestDTO {
  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsString()
  email!: string;

  @ApiProperty({ example: 'L1' })
  @IsString()
  level!: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  teamIds?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiPropertyOptional({ example: 5, minimum: 1, maximum: 50 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  maxConcurrentTickets?: number;
}
