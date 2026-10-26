/**
 * User Service Client
 * @module notification-service/infrastructure/services/external
 *
 * Fetch user profile (email, phone, name, locale) from identity-service।
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface UserProfileDTO {
  readonly id: string;
  readonly email?: string;
  readonly phone?: string;
  readonly name?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly locale?: string;
  readonly timezone?: string;
  readonly isActive: boolean;
}

@Injectable()
export class UserClient {
  private readonly logger = new Logger(UserClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv('IDENTITY_SERVICE_URL', 'http://localhost:3001');
    this.timeoutMs = Number(getOptionalEnv('IDENTITY_SERVICE_TIMEOUT', '5000'));
  }

  async getById(id: string): Promise<UserProfileDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/users/${id}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        // Non-404 — log and return null (graceful degrade for cross-service)
        this.logger.debug(`User service HTTP ${res.status} for id=${id}`);
        return null;
      }
      return (await res.json()) as UserProfileDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Fetch user ${id} failed: ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async getByIds(ids: readonly string[]): Promise<readonly UserProfileDTO[]> {
    if (ids.length === 0) return [];
    try {
      const res = await fetch(`${this.baseUrl}/users/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly UserProfileDTO[];
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
