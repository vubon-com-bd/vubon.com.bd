import type {
  ChartProviderAdapter,
  ChartProvider,
  ChartRenderRequest,
  ChartRenderResult,
} from '../chart.types.js';

export class VegaProvider implements ChartProviderAdapter {
  readonly provider: ChartProvider = 'vega';

  supports(_type: string): boolean {
    return true;
  }

  async render(request: ChartRenderRequest): Promise<ChartRenderResult> {
    return {
      data: JSON.stringify({ type: request.type, data: request.datasets }),
      format: request.format ?? 'json',
      width: request.width ?? 800,
      height: request.height ?? 400,
      provider: 'vega',
    };
  }
}
