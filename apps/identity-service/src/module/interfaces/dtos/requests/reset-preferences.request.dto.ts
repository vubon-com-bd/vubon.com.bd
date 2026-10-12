import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class ResetPreferencesHttpDTO {
  @ApiPropertyOptional({ enum: ['all', 'marketing', 'promotions'] })
  @IsOptional()
  @IsEnum(['all', 'marketing', 'promotions'])
  scope?: 'all' | 'marketing' | 'promotions';
}
