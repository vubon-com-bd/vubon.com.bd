/**
 * ChartJsProvider
 * @module product-service/infrastructure/external/chart/providers
 */
import type {
  ChartProvider,
  ChartProviderAdapter,
  ChartRenderRequest,
  ChartRenderResult,
} from '../chart.types.js';

const SUPPORTED = new Set(['line', 'bar', 'pie', 'donut', 'area', 'scatter']);

export class ChartJsProvider implements ChartProviderAdapter {
  readonly provider: ChartProvider = 'chartjs';

  supports(type: string): boolean {
    return SUPPORTED.has(type);
  }

  async render(request: ChartRenderRequest): Promise<ChartRenderResult> {
    const width = request.width ?? 800;
    const height = request.height ?? 400;
    return {
      data: `<canvas data-chart="chartjs">${JSON.stringify(request.datasets)}</canvas>`,
      format: request.format ?? 'html',
      width,
      height,
      provider: this.provider,
    };
  }
}
