/**
 * IdentityClient — HTTP client for identity-service (auth details)
 * @module logistics-service/infrastructure/services/external
 *
 * ⚠️ Uses native fetch + AbortSignal.timeout (no axios)
 * ⚠️ NEVER throws — returns null on failure (best-effort)
 * ⚠️ Decodes JWT sub + calls /api/v1/users/{id}
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface IdentityDTO {
  readonly id: string;
  readonly email?: string;
  readonly name?: string;
  readonly roles?: readonly string[];
  readonly status?: string;
}

const SERVICE_URL_KEY = 'IDENTITY_SERVICE_URL';
const DEFAULT_URL = 'http://localhost:3001';
const DEFAULT_TIMEOUT_MS = 5000;

@Injectable()
export class IdentityClient {
  private readonly logger = new Logger(IdentityClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv(SERVICE_URL_KEY, DEFAULT_URL);
    this.timeoutMs = Number(getOptionalEnv('IDENTITY_SERVICE_TIMEOUT_MS', String(DEFAULT_TIMEOUT_MS)));
  }

  /**
   * Fetch user details by JWT token (decodes sub + fetches user).
   */
  async getMe(accessToken: string): Promise<IdentityDTO | null> {
    // Decode JWT payload (without verification — token already passed auth guard)
    const userId = this.extractSub(accessToken);
    if (!userId) {
      this.logger.warn('Identity: invalid JWT — missing sub');
      return null;
    }

    try {
      const res = await fetch(`${this.baseUrl}/api/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 404) return null;
        this.logger.warn(`Identity fetch failed (${userId}): HTTP ${res.status}`);
        return null;
      }
      const body = (await res.json()) as { data?: IdentityDTO } | IdentityDTO;
      return 'data' in body && body.data ? body.data : (body as IdentityDTO);
    } catch (err) {
      this.logger.warn(`Identity fetch error (${userId}): ${this.errMsg(err)}`);
      return null;
    }
  }

  /**
   * Fetch user by ID directly (no token required for public profile).
   */
  async getUserById(userId: string, accessToken?: string): Promise<IdentityDTO | null> {
    try {
      const headers: Record<string, string> = {};
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
      const res = await fetch(`${this.baseUrl}/api/v1/users/${userId}`, {
        headers,
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        this.logger.warn(`Identity fetch failed (${userId}): HTTP ${res.status}`);
        return null;
      }
      const body = (await res.json()) as { data?: IdentityDTO } | IdentityDTO;
      return 'data' in body && body.data ? body.data : (body as IdentityDTO);
    } catch (err) {
      this.logger.warn(`Identity fetch error (${userId}): ${this.errMsg(err)}`);
      return null;
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/health`, {
        signal: AbortSignal.timeout(2000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  private extractSub(token: string): string | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payloadB64 = parts[1]!.replace(/-/g, '+').replace(/_/g, '/');
      const payloadJson = Buffer.from(payloadB64, 'base64').toString('utf8');
      const payload = JSON.parse(payloadJson) as { sub?: string };
      return payload.sub ?? null;
    } catch {
      return null;
    }
  }

  private errMsg(err: unknown): string {
    return err instanceof Error ? err.message : 'unknown';
  }
}
