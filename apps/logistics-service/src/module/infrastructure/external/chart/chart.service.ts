/**
 * ChartService — orchestrates providers
 * @module logistics-service/infrastructure/external/chart
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';
import { ChartJSProvider } from './providers/chartjs.provider.js';
import { EChartsProvider } from './providers/echarts.provider.js';
import { VegaProvider } from './providers/vega.provider.js';
import type { ChartProvider, ChartRenderInput, ChartRenderResult } from './chart.types.js';

@Injectable()
export class ChartService {
  private readonly logger = new Logger(ChartService.name);
  private readonly activeProvider: string;

  constructor(
    private readonly chartjs: ChartJSProvider,
    private readonly echarts: EChartsProvider,
    private readonly vega: VegaProvider,
  ) {
    this.activeProvider = getOptionalEnv('CHART_PROVIDER', 'chartjs');
  }

  private get provider(): ChartProvider {
    switch (this.activeProvider) {
      case 'echarts': return this.echarts;
      case 'vega': return this.vega;
      default: return this.chartjs;
    }
  }

  async render(input: ChartRenderInput): Promise<ChartRenderResult> {
    return this.provider.render(input);
  }
}
