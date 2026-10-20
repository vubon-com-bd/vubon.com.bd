/**
 * UserClient — HTTP client for user-service
 * @module order-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface UserDTO {
  readonly id: string;
  readonly email?: string;
  readonly name?: string;
  readonly status?: string;
}

@Injectable()
export class UserClient {
  private readonly logger = new Logger(UserClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('USER_SERVICE_URL', 'http://localhost:3001');
    this.timeout = Number(getOptionalEnv('USER_SERVICE_TIMEOUT', '5000'));
  }

  async getById(id: string): Promise<UserDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/users/${id}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as UserDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Fetch failed (${id}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
