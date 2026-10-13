/**
 * Chart Types
 * @module product-service/infrastructure/external/chart
 */
export type ChartProvider = 'chartjs' | 'echarts' | 'vega';
export type ChartFormat = 'png' | 'svg' | 'html' | 'json';

export interface ChartDataset {
  readonly label: string;
  readonly data: readonly number[];
  readonly backgroundColor?: string | readonly string[];
  readonly borderColor?: string;
}

export interface ChartRenderRequest {
  readonly type: 'line' | 'bar' | 'column' | 'pie' | 'donut' | 'area' | 'scatter';
  readonly title?: string;
  readonly labels: readonly string[];
  readonly datasets: readonly ChartDataset[];
  readonly width?: number;
  readonly height?: number;
  readonly format?: ChartFormat;
}

export interface ChartRenderResult {
  readonly data: Buffer | string;
  readonly format: ChartFormat;
  readonly width: number;
  readonly height: number;
  readonly provider: ChartProvider;
}

export interface ChartProviderAdapter {
  readonly provider: ChartProvider;
  render(request: ChartRenderRequest): Promise<ChartRenderResult>;
  supports(type: string): boolean;
}
