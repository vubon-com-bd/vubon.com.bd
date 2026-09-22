import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentHealthIndicator {
  async isHealthy(key: string): Promise<Record<string, { status: string }>> {
    return { [key]: { status: 'up' } };
  }
}
