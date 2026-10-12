/**
 * Vega-Lite Provider
 */
import { Injectable, Logger } from '@nestjs/common';
import type {
  ChartProvider,
  ChartProviderAdapter,
  ChartRenderRequest,
  ChartRenderResult,
} from '../chart.types.js';

@Injectable()
export class VegaProvider implements ChartProviderAdapter {
  readonly provider: ChartProvider = 'vega';
  private readonly logger = new Logger(VegaProvider.name);

  supports(type: string): boolean {
    return ['line', 'bar', 'column', 'area', 'scatter'].includes(type);
  }

  async render(request: ChartRenderRequest): Promise<ChartRenderResult> {
    const width = request.width ?? 800;
    const height = request.height ?? 400;

    // Vega-Lite spec generation
    const values: Array<{ label: string; value: number; series: string }> = [];
    request.datasets.forEach((ds) => {
      request.labels.forEach((label, i) => {
        values.push({ label, value: ds.data[i] ?? 0, series: ds.label });
      });
    });

    const spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      width,
      height,
      title: request.title,
      data: { values },
      mark: request.type === 'column' ? 'bar' : request.type,
      encoding: {
        x: { field: 'label', type: 'nominal' },
        y: { field: 'value', type: 'quantitative' },
        color: { field: 'series', type: 'nominal' },
      },
    };

    return {
      data: JSON.stringify(spec),
      format: 'json',
      width,
      height,
      provider: this.provider,
    };
  }
}
