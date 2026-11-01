/**
 * UserClient — HTTP client for identity-service (user details)
 * @module logistics-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface UserDTO {
  readonly id: string;
  readonly email?: string;
  readonly name?: string;
  readonly phone?: string;
  readonly status?: string;
}

const SERVICE_URL_KEY = 'IDENTITY_SERVICE_URL';
const DEFAULT_URL = 'http://localhost:3001';
const DEFAULT_TIMEOUT_MS = 5000;

@Injectable()
export class UserClient {
  private readonly logger = new Logger(UserClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv(SERVICE_URL_KEY, DEFAULT_URL);
    this.timeoutMs = Number(getOptionalEnv('IDENTITY_SERVICE_TIMEOUT_MS', String(DEFAULT_TIMEOUT_MS)));
  }

  async getById(id: string): Promise<UserDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/users/${id}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        this.logger.warn(`User fetch failed (${id}): HTTP ${res.status}`);
        return null;
      }
      const body = (await res.json()) as { data?: UserDTO } | UserDTO;
      return 'data' in body && body.data ? body.data : (body as UserDTO);
    } catch (err) {
      this.logger.warn(`User fetch error (${id}): ${this.errMsg(err)}`);
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

  private errMsg(err: unknown): string {
    return err instanceof Error ? err.message : 'unknown';
  }
}
