/**
 * Apache ECharts Provider
 */
import { Injectable, Logger } from '@nestjs/common';
import type {
  ChartProvider,
  ChartProviderAdapter,
  ChartRenderRequest,
  ChartRenderResult,
} from '../chart.types.js';

@Injectable()
export class EChartsProvider implements ChartProviderAdapter {
  readonly provider: ChartProvider = 'echarts';
  private readonly logger = new Logger(EChartsProvider.name);

  supports(type: string): boolean {
    const supported = ['line', 'bar', 'column', 'pie', 'donut', 'area', 'scatter'];
    return supported.includes(type);
  }

  async render(request: ChartRenderRequest): Promise<ChartRenderResult> {
    const width = request.width ?? 800;
    const height = request.height ?? 400;
    const format = request.format ?? 'json';

    // ECharts renders via JSON option spec (consumed by frontend)
    const option = {
      title: { text: request.title ?? '' },
      xAxis: { type: 'category', data: request.labels },
      yAxis: { type: 'value' },
      series: request.datasets.map((ds) => ({
        type: request.type === 'column' ? 'bar' : request.type,
        name: ds.label,
        data: ds.data,
      })),
    };

    return {
      data: JSON.stringify(option),
      format: 'json',
      width,
      height,
      provider: this.provider,
    };
  }
}
