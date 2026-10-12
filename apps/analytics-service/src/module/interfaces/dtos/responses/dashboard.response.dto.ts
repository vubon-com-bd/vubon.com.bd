/**
 * Dashboard Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { DashboardResponseData } from '../../../application/dtos/responses/dashboard-response.dto.js';
import type { WidgetResponseData } from '../../../application/dtos/responses/widget-response.dto.js';

export class DashboardResponseDto implements DashboardResponseData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ example: 'grid' })
  layout!: string;

  @ApiProperty()
  ownerId!: string;

  @ApiProperty()
  widgetCount!: number;

  @ApiProperty()
  isPublic!: boolean;

  @ApiProperty()
  isArchived!: boolean;

  @ApiProperty()
  createdAt!: string;
}

export class WidgetResponseDto implements WidgetResponseData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  dashboardId!: string;

  @ApiProperty({ example: 'chart' })
  type!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty({ example: { x: 0, y: 0, w: 6, h: 4 } })
  position!: { x: number; y: number; w: number; h: number };

  @ApiPropertyOptional()
  data?: unknown;

  @ApiProperty()
  hasError!: boolean;

  @ApiPropertyOptional()
  error?: string;
}
