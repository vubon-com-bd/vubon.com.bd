/**
 * Activity Request DTOs
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListActivityQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @IsString()
  limit?: string;

  @ApiPropertyOptional({ example: 'login' })
  @IsOptional()
  @IsString()
  type?: string;
}
