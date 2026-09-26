/**
 * UpdateTemplateRequestDTO
 * @module support-service/interfaces/dtos/requests/template
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTemplateRequestDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  subject?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  body?: string;
}
