/**
 * ChartJSProvider — placeholder for server-side chartjs rendering
 * @module logistics-service/infrastructure/external/chart/providers
 */
import { Injectable, Logger } from '@nestjs/common';
import type { ChartProvider, ChartRenderInput, ChartRenderResult } from '../chart.types.js';

@Injectable()
export class ChartJSProvider implements ChartProvider {
  readonly name = 'chartjs';
  private readonly logger = new Logger(ChartJSProvider.name);

  async render(input: ChartRenderInput): Promise<ChartRenderResult> {
    this.logger.log(`[ChartJS] ${input.type} "${input.title}" — ${input.series.length} series`);
    // Placeholder — actual SVG/PNG generation would go here
    return { success: true, provider: this.name, contentType: 'image/svg+xml' };
  }
}
