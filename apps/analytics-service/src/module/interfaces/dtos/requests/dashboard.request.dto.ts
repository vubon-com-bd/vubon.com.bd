import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const VALID_LAYOUTS = ['grid', 'masonry', 'flex', 'freeform'] as const;
const VALID_WIDGET_TYPES = [
  'chart', 'table', 'metric', 'text', 'funnel', 'heatmap', 'gauge',
] as const;

export class CreateDashboardRequestDTO {
  @ApiProperty({ example: 'Sales Dashboard' })
  name!: string;

  @ApiPropertyOptional({ enum: VALID_LAYOUTS, example: 'grid' })
  layout?: string;

  @ApiProperty({ example: 'user-123' })
  ownerId!: string;
}

export class UpdateDashboardRequestDTO {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional({ enum: VALID_LAYOUTS })
  layout?: string;
}

export class AddWidgetRequestDTO {
  @ApiProperty({ enum: VALID_WIDGET_TYPES, example: 'chart' })
  widgetType!: string;

  @ApiProperty({ example: 'revenue' })
  metricName!: string;

  @ApiPropertyOptional({ example: { chartType: 'line' } })
  config?: Record<string, unknown>;

  @ApiPropertyOptional({ example: 0 })
  position?: number;
}
