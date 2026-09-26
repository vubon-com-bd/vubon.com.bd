import { Injectable } from '@nestjs/common';

@Injectable()
export class ShipmentHealthIndicator {
  async isHealthy(key: string): Promise<{ [k: string]: { status: string } }> {
    return { [key]: { status: 'up' } };
  }
}
