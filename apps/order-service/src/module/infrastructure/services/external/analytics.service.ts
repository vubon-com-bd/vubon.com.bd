import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  async track(_eventType: string, _payload: Record<string, unknown>): Promise<void> {
    // TODO: integrate analytics provider
  }
}
