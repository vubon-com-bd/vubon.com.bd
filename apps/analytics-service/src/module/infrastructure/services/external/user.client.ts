/**
 * User Service Client
 * @module analytics-service/infrastructure/services/external
 *
 * HTTP client for user-service (analytics needs user attributes only)।
 * Business Rule:
 * - Fetch user metadata for analytics enrichment
 * - Never embed user entity — only reference IDs
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface UserDTO {
  readonly id: string;
  readonly email?: string;
  readonly name?: string;
  readonly role?: string;
  readonly type?: string;
  readonly country?: string;
  readonly createdAt: string;
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

  async getById(userId: string): Promise<UserDTO | null> {
    try {
      const url = `${this.baseUrl}/users/${userId}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as UserDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`User fetch failed (${userId}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async getByIds(userIds: readonly string[]): Promise<readonly UserDTO[]> {
    if (userIds.length === 0) return [];
    try {
      const url = `${this.baseUrl}/users/batch`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: userIds }),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as readonly UserDTO[];
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`User batch fetch failed: ${msg.slice(0, 100)}`);
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
