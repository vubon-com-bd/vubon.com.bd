import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const FORECAST_QUEUE_NAME = 'ai-forecast';

export interface ForecastJobPayload {
  readonly target: string;
  readonly model: string;
  readonly horizonDays: number;
}

@Injectable()
export class ForecastQueue {
  readonly name = FORECAST_QUEUE_NAME;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: ForecastJobPayload): Promise<string> {
    return this.queueService.enqueue(this.name, 'generate', payload, {
      priority: QUEUE_PRIORITY.LOW,
    });
  }
}
