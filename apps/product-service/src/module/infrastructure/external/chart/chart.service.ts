/**
 * ChartService — multi-provider dispatcher
 * @module product-service/infrastructure/external/chart
 */
import { Injectable, Logger } from '@nestjs/common';
import { ChartJsProvider } from './providers/chartjs.provider.js';
import { EChartsProvider } from './providers/echarts.provider.js';
import { VegaProvider } from './providers/vega.provider.js';
import type {
  ChartProvider,
  ChartProviderAdapter,
  ChartRenderRequest,
  ChartRenderResult,
} from './chart.types.js';

@Injectable()
export class ChartService {
  private readonly logger = new Logger(ChartService.name);
  private readonly providers: readonly ChartProviderAdapter[];

  constructor() {
    this.providers = [new ChartJsProvider(), new EChartsProvider(), new VegaProvider()];
  }

  async render(
    request: ChartRenderRequest,
    provider?: ChartProvider,
  ): Promise<ChartRenderResult> {
    const selected = provider
      ? this.providers.find((p) => p.provider === provider)
      : this.providers.find((p) => p.supports(request.type));
    if (!selected) throw new Error(`No chart provider supports "${request.type}"`);
    this.logger.debug(`Rendering ${request.type} via ${selected.provider}`);
    return selected.render(request);
  }

  availableProviders(): readonly ChartProvider[] {
    return this.providers.map((p) => p.provider);
  }

  supports(type: string): boolean {
    return this.providers.some((p) => p.supports(type));
  }
}
