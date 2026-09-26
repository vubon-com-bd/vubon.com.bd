import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { FORECAST_QUEUE_NAME, type ForecastJobPayload } from '../queues/forecast.queue';
import { ForecastService } from '../../application/services/impl/forecast.service';

@Injectable()
export class ForecastGeneratorWorker implements OnModuleInit {
  private readonly logger = new Logger(ForecastGeneratorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly forecastService: ForecastService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<ForecastJobPayload>(
      FORECAST_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Forecast: ${payload.target}`);
        try {
          await this.forecastService.generate({
            target: payload.target,
            historicalData: [],
            horizonDays: payload.horizonDays,
            model: 'linear_regression',
          });
        } catch (error) {
          this.logger.warn(`Forecast skipped (no data): ${payload.target}`, error);
        }
      },
      2,
    );
  }
}
