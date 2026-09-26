import { Injectable } from '@nestjs/common';

@Injectable()
export class CartHealthIndicator {
  async isHealthy(key: string): Promise<Record<string, { status: string }>> {
    return { [key]: { status: 'up' } };
  }
}
