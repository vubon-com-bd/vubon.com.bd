import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class UpdateSettingsHttpDTO {
  @ApiPropertyOptional({ example: 'dark' })
  @IsOptional() @IsString() @MaxLength(20) theme?: string;
  @ApiPropertyOptional({ example: 'en' })
  @IsOptional() @IsString() @MaxLength(10) language?: string;
  @ApiPropertyOptional({ example: 'en-US' })
  @IsOptional() @IsString() @MaxLength(20) locale?: string;
  @ApiPropertyOptional({ example: 'Asia/Dhaka' })
  @IsOptional() @IsString() @MaxLength(64) timezone?: string;
  @ApiPropertyOptional({ example: 'BDT' })
  @IsOptional() @IsString() @MaxLength(3) currency?: string;
  @ApiPropertyOptional()
  @IsOptional() @IsInt() @Min(5) @Max(200) itemsPerPage?: number;
  @ApiPropertyOptional()
  @IsOptional() @IsBoolean() notifications?: boolean;
  @ApiPropertyOptional()
  @IsOptional() @IsBoolean() twoFactor?: boolean;
}
