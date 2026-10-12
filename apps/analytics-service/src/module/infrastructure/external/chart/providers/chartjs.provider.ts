/**
 * Chart.js Provider
 * @module analytics-service/infrastructure/external/chart/providers
 */
import { Injectable, Logger } from '@nestjs/common';
import type {
  ChartProvider,
  ChartProviderAdapter,
  ChartRenderRequest,
  ChartRenderResult,
} from '../chart.types.js';

@Injectable()
export class ChartJsProvider implements ChartProviderAdapter {
  readonly provider: ChartProvider = 'chartjs';
  private readonly logger = new Logger(ChartJsProvider.name);

  supports(type: string): boolean {
    const supported = ['line', 'bar', 'column', 'pie', 'donut', 'area', 'scatter'];
    return supported.includes(type);
  }

  async render(request: ChartRenderRequest): Promise<ChartRenderResult> {
    const width = request.width ?? 800;
    const height = request.height ?? 400;
    const format = request.format ?? 'png';

    // Degraded: return a JSON config describing the chart (no canvas in Termux)
    if (format === 'json') {
      return {
        data: JSON.stringify({
          type: request.type,
          data: {
            labels: request.labels,
            datasets: request.datasets,
          },
          options: {
            responsive: false,
            plugins: { title: { display: !!request.title, text: request.title ?? '' } },
          },
        }),
        format,
        width,
        height,
        provider: this.provider,
      };
    }

    // Attempt native canvas render — degrades to placeholder SVG
    return this.renderPlaceholder(request, width, height, format);
  }

  private renderPlaceholder(
    request: ChartRenderRequest,
    width: number,
    height: number,
    format: string
  ): ChartRenderResult {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="#f5f5f5"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#666">${request.title ?? request.type} chart</text>
    </svg>`;
    return {
      data: svg,
      format: format as never,
      width,
      height,
      provider: this.provider,
    };
  }
}
