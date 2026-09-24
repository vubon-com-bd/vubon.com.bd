import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WidgetResponseDTO {
  @ApiProperty()
  widgetId!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  metricName!: string;

  @ApiProperty()
  position!: number;

  @ApiProperty()
  dashboardId!: string;

  @ApiProperty({ example: ['chartType', 'color'] })
  configKeys!: string[];
}

export class DashboardResponseDTO {
  @ApiProperty()
  dashboardId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  layout!: string;

  @ApiProperty()
  ownerId!: string;

  @ApiProperty()
  widgetCount!: number;

  @ApiPropertyOptional({ type: [WidgetResponseDTO] })
  widgets?: WidgetResponseDTO[];

  @ApiProperty()
  createdAt!: string;
}
