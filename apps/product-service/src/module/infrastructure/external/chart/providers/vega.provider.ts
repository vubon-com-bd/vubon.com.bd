/**
 * VegaProvider
 * @module product-service/infrastructure/external/chart/providers
 */
import type {
  ChartProvider,
  ChartProviderAdapter,
  ChartRenderRequest,
  ChartRenderResult,
} from '../chart.types.js';

const SUPPORTED = new Set(['line', 'bar', 'area', 'scatter', 'column']);

export class VegaProvider implements ChartProviderAdapter {
  readonly provider: ChartProvider = 'vega';

  supports(type: string): boolean {
    return SUPPORTED.has(type);
  }

  async render(request: ChartRenderRequest): Promise<ChartRenderResult> {
    const width = request.width ?? 800;
    const height = request.height ?? 400;
    return {
      data: `<svg width="${width}" height="${height}" data-provider="vega"></svg>`,
      format: request.format ?? 'svg',
      width,
      height,
      provider: this.provider,
    };
  }
}
