/**
 * Dashboard Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type {
  CreateDashboardDto,
  UpdateDashboardDto,
  AddWidgetDto,
  RemoveWidgetDto,
} from '../../../application/dtos/requests/dashboard/index.js';

export class CreateDashboardRequestDto implements CreateDashboardDto {
  @ApiProperty({ example: 'Revenue Overview Q1' })
  name!: string;

  @ApiProperty({ example: 'grid', enum: ['grid', 'masonry', 'flex', 'freeform'] })
  layout!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional({ default: false })
  isPublic?: boolean;

  @ApiPropertyOptional({ type: [String] })
  tags?: string[];
}

export class UpdateDashboardRequestDto implements UpdateDashboardDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  layout?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  isPublic?: boolean;
}

export class AddWidgetRequestDto implements AddWidgetDto {
  @ApiProperty({ example: 'chart', enum: ['chart', 'table', 'metric', 'text', 'funnel', 'heatmap', 'gauge'] })
  type!: string;

  @ApiProperty({ example: 'Revenue Over Time' })
  title!: string;

  @ApiPropertyOptional({ type: Object, default: {} })
  config?: Record<string, unknown>;

  @ApiProperty({
    description: 'Grid position',
    example: { x: 0, y: 0, w: 6, h: 4 },
  })
  position!: { x: number; y: number; w: number; h: number };

  @ApiPropertyOptional({ type: [String] })
  metrics?: string[];
}

export class RemoveWidgetRequestDto implements RemoveWidgetDto {
  @ApiProperty()
  widgetId!: string;
}
