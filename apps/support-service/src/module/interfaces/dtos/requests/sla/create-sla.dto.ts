/**
 * CreateSlaRequestDTO — HTTP layer
 * @module support-service/interfaces/dtos/requests/sla
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateSlaRequestDTO {
  @ApiProperty({ example: 'ticket-uuid' })
  @IsString()
  ticketId!: string;

  @ApiProperty({ example: 'resolution' })
  @IsString()
  metric!: string;

  @ApiProperty({ example: 120, minimum: 1 })
  @IsInt()
  @Min(1)
  targetMinutes!: number;

  @ApiProperty({ example: 'high' })
  @IsString()
  priority!: string;

  @ApiPropertyOptional({ example: 80, minimum: 0, maximum: 100 })
  @IsOptional()
  @IsInt()
  warningThresholdPercent?: number;
}
