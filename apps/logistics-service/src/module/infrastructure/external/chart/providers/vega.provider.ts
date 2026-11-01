/**
 * VegaProvider — placeholder
 */
import { Injectable, Logger } from '@nestjs/common';
import type { ChartProvider, ChartRenderInput, ChartRenderResult } from '../chart.types.js';

@Injectable()
export class VegaProvider implements ChartProvider {
  readonly name = 'vega';
  private readonly logger = new Logger(VegaProvider.name);

  async render(input: ChartRenderInput): Promise<ChartRenderResult> {
    this.logger.log(`[Vega] ${input.type} "${input.title}"`);
    return { success: true, provider: this.name, contentType: 'image/svg+xml' };
  }
}
