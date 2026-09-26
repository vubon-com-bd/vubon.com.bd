/**
 * CreateTeamRequestDTO
 * @module support-service/interfaces/dtos/requests/team
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTeamRequestDTO {
  @ApiProperty({ example: 'Tier 1 Support' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ example: 'general' })
  @IsString()
  type!: string;

  @ApiPropertyOptional({ example: 'round_robin' })
  @IsOptional()
  @IsString()
  routing?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  leaderId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];
}
