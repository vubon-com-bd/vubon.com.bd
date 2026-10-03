/**
 * Settings Request DTOs
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsInt, Min, Max, Length } from 'class-validator';

export class UpdateSettingsRequestDto {
  @ApiPropertyOptional({ example: 'dark' }) @IsOptional() @IsString()
  theme?: string;

  @ApiPropertyOptional({ example: 'bn' }) @IsOptional() @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 'bn-BD' }) @IsOptional() @IsString()
  locale?: string;

  @ApiPropertyOptional({ example: 'Asia/Dhaka' }) @IsOptional() @IsString()
  timezone?: string;

  @ApiPropertyOptional({ example: 'BDT' }) @IsOptional() @IsString() @Length(3, 3)
  currency?: string;

  @ApiPropertyOptional({ example: 'DD/MM/YYYY' }) @IsOptional() @IsString()
  dateFormat?: string;

  @ApiPropertyOptional({ example: '24h' }) @IsOptional() @IsString()
  timeFormat?: string;

  @ApiPropertyOptional({ example: 20 }) @IsOptional() @IsInt() @Min(5) @Max(200)
  itemsPerPage?: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  notifications?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  twoFactor?: boolean;
}
