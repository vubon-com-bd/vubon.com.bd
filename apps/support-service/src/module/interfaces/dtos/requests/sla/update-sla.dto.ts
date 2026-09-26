/**
 * UpdateSlaRequestDTO
 * @module support-service/interfaces/dtos/requests/sla
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateSlaRequestDTO {
  @ApiPropertyOptional({ example: 90, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  targetMinutes?: number;

  @ApiPropertyOptional({ example: 80, minimum: 0, maximum: 100 })
  @IsOptional()
  @IsInt()
  warningThresholdPercent?: number;
}
