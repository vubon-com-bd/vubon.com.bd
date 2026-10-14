import type {
  ChartProviderAdapter,
  ChartProvider,
  ChartRenderRequest,
  ChartRenderResult,
} from '../chart.types.js';

export class ChartJsProvider implements ChartProviderAdapter {
  readonly provider: ChartProvider = 'chartjs';

  supports(type: string): boolean {
    return ['line', 'bar', 'pie', 'donut', 'area', 'scatter'].includes(type);
  }

  async render(request: ChartRenderRequest): Promise<ChartRenderResult> {
    return {
      data: `<svg width="${request.width ?? 800}" height="${request.height ?? 400}"></svg>`,
      format: request.format ?? 'svg',
      width: request.width ?? 800,
      height: request.height ?? 400,
      provider: 'chartjs',
    };
  }
}
