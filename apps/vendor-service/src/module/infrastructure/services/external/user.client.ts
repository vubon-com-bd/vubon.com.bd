/**
 * UserClient — HTTP client for identity-service (userId lookups)
 * @module vendor-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface UserSummaryDTO {
  readonly id: string;
  readonly email: string;
  readonly name?: string;
  readonly phone?: string;
  readonly isVerified: boolean;
}

@Injectable()
export class UserClient {
  private readonly logger = new Logger(UserClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv('USER_SERVICE_URL', 'http://localhost:3002');
    this.timeoutMs = Number(getOptionalEnv('USER_SERVICE_TIMEOUT', '5000'));
  }

  async getById(id: string): Promise<UserSummaryDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/users/${id}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as UserSummaryDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Fetch user ${id} failed: ${msg.slice(0, 120)}`);
      return null;
    }
  }

  async getByIds(ids: readonly string[]): Promise<readonly UserSummaryDTO[]> {
    if (ids.length === 0) return [];
    try {
      const res = await fetch(`${this.baseUrl}/users/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly UserSummaryDTO[];
    } catch {
      return [];
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
