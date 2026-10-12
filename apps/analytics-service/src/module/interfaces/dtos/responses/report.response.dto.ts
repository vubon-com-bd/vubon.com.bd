/**
 * Report Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { ReportResponseData } from '../../../application/dtos/responses/report-response.dto.js';

export class ReportResponseDto implements ReportResponseData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  format!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  frequency!: string;

  @ApiProperty()
  ownerId!: string;

  @ApiPropertyOptional({ nullable: true })
  nextRunAt?: string | null;

  @ApiPropertyOptional({ nullable: true })
  lastRunAt?: string | null;

  @ApiPropertyOptional({ nullable: true })
  outputUrl?: string | null;

  @ApiPropertyOptional()
  rowCount?: number;

  @ApiProperty()
  createdAt!: string;
}
