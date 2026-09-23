import { Injectable } from '@nestjs/common';

@Injectable()
export class LogisticsHealthIndicator {
  async isHealthy(key: string): Promise<{ [k: string]: { status: string } }> {
    return { [key]: { status: 'up' } };
  }
}
