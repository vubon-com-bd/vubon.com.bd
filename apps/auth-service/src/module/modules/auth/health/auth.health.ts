import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthHealthIndicator {
  async isHealthy(key: string): Promise<{ [k: string]: { status: string } }> {
    return { [key]: { status: 'up' } };
  }
}
