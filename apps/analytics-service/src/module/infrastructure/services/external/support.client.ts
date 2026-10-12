/**
 * Support Service Client
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface TicketDTO {
  readonly id: string;
  readonly userId: string;
  readonly status: string;
  readonly priority: string;
  readonly createdAt: string;
}

@Injectable()
export class SupportClient {
  private readonly logger = new Logger(SupportClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('SUPPORT_SERVICE_URL', 'http://localhost:3010');
    this.timeout = Number(getOptionalEnv('SUPPORT_SERVICE_TIMEOUT', '3000'));
  }

  async getByUser(userId: string): Promise<readonly TicketDTO[]> {
    try {
      const res = await fetch(`${this.baseUrl}/tickets?userId=${userId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly TicketDTO[];
    } catch {
      return [];
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { signal: AbortSignal.timeout(2000) });
      return res.ok;
    } catch {
      return false;
    }
  }
}
