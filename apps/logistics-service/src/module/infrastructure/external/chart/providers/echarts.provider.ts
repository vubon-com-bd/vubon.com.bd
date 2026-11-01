/**
 * EChartsProvider — placeholder
 */
import { Injectable, Logger } from '@nestjs/common';
import type { ChartProvider, ChartRenderInput, ChartRenderResult } from '../chart.types.js';

@Injectable()
export class EChartsProvider implements ChartProvider {
  readonly name = 'echarts';
  private readonly logger = new Logger(EChartsProvider.name);

  async render(input: ChartRenderInput): Promise<ChartRenderResult> {
    this.logger.log(`[ECharts] ${input.type} "${input.title}"`);
    return { success: true, provider: this.name, contentType: 'image/png' };
  }
}
