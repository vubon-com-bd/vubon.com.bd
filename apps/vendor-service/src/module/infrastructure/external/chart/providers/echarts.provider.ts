import type {
  ChartProviderAdapter,
  ChartProvider,
  ChartRenderRequest,
  ChartRenderResult,
} from '../chart.types.js';

export class EChartsProvider implements ChartProviderAdapter {
  readonly provider: ChartProvider = 'echarts';

  supports(type: string): boolean {
    return ['line', 'bar', 'column', 'pie', 'area'].includes(type);
  }

  async render(request: ChartRenderRequest): Promise<ChartRenderResult> {
    return {
      data: `<svg width="${request.width ?? 800}" height="${request.height ?? 400}"></svg>`,
      format: request.format ?? 'svg',
      width: request.width ?? 800,
      height: request.height ?? 400,
      provider: 'echarts',
    };
  }
}
