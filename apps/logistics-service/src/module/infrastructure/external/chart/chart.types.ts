/**
 * Chart types — for report rendering
 * @module logistics-service/infrastructure/external/chart
 */
export type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'scatter';

export interface ChartDataSeries {
  readonly label: string;
  readonly values: readonly number[];
}

export interface ChartRenderInput {
  readonly type: ChartType;
  readonly title: string;
  readonly labels: readonly string[];
  readonly series: readonly ChartDataSeries[];
  readonly width?: number;
  readonly height?: number;
}

export interface ChartRenderResult {
  readonly success: boolean;
  readonly buffer?: Buffer;
  readonly contentType?: string;
  readonly provider?: string;
}

export interface ChartProvider {
  readonly name: string;
  render(input: ChartRenderInput): Promise<ChartRenderResult>;
}
