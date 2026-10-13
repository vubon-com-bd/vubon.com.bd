/**
 * EChartsProvider
 * @module product-service/infrastructure/external/chart/providers
 */
import type {
  ChartProvider,
  ChartProviderAdapter,
  ChartRenderRequest,
  ChartRenderResult,
} from '../chart.types.js';

const SUPPORTED = new Set(['line', 'bar', 'column', 'pie', 'area', 'scatter']);

export class EChartsProvider implements ChartProviderAdapter {
  readonly provider: ChartProvider = 'echarts';

  supports(type: string): boolean {
    return SUPPORTED.has(type);
  }

  async render(request: ChartRenderRequest): Promise<ChartRenderResult> {
    const width = request.width ?? 800;
    const height = request.height ?? 400;
    return {
      data: JSON.stringify({
        type: request.type,
        labels: request.labels,
        datasets: request.datasets,
      }),
      format: request.format ?? 'json',
      width,
      height,
      provider: this.provider,
    };
  }
}
