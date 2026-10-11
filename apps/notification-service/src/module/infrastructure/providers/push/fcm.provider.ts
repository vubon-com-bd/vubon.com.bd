/**
 * FcmPushProvider — push notifications via Firebase Cloud Messaging
 * @module notification-service/infrastructure/providers/push
 */
import { Injectable, Optional } from '@nestjs/common';
import { createSign } from 'node:crypto';
import { FCM_CONFIG } from '@vubon/shared-config/platform/notification';
import { BaseHttpProvider } from '../base/http-provider.base.js';
import type { ProviderHealthStatus, ProviderSendResult } from '../base/provider.types.js';
import type { IPushProvider, PushSendPayload } from '../base/provider.interface.js';

type FcmConfig = typeof FCM_CONFIG;

interface ServiceAccount {
  readonly project_id: string;
  readonly client_email: string;
  readonly private_key: string;
  readonly token_uri: string;
}

interface AccessTokenCache {
  token: string;
  expiresAtMs: number;
}

@Injectable()
export class FcmPushProvider extends BaseHttpProvider implements IPushProvider {
  readonly channel = 'push' as const;
  private readonly cfg: FcmConfig;
  private cachedToken: AccessTokenCache | null = null;

  constructor(@Optional() config?: Partial<FcmConfig>) {
    super({
      name: 'fcm',
      channel: 'push',
      timeoutMs: FCM_CONFIG.timeoutMs ?? 15_000,
      maxRetries: FCM_CONFIG.maxRetries ?? 3,
      perSecond: 500,
      perDay: 1_000_000,
    });
    this.cfg = { ...FCM_CONFIG, ...(config ?? {}) } as FcmConfig;
  }

  isEnabled(): boolean {
    return Boolean(this.cfg.enabled && this.loadServiceAccount());
  }

  async health(): Promise<ProviderHealthStatus> {
    if (!this.isEnabled()) {
      return { healthy: false, enabled: false, reason: 'Not configured' };
    }
    try {
      await this.getAccessToken();
      return { healthy: true, enabled: true };
    } catch (err) {
      return { healthy: false, enabled: true, reason: err instanceof Error ? err.message : 'Unknown' };
    }
  }

  async send(payload: PushSendPayload): Promise<ProviderSendResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'FCM disabled', errorCode: 'PROVIDER_DISABLED' };
    }
    try {
      const account = this.loadServiceAccount()!;
      const accessToken = await this.getAccessToken();
      const body = {
        message: {
          token: payload.token,
          notification: { title: payload.title, body: payload.body, image: payload.imageUrl },
          data: payload.data
            ? Object.fromEntries(Object.entries(payload.data).map(([k, v]) => [k, String(v)]))
            : undefined,
          android:
            payload.platform === 'android' || !payload.platform
              ? { priority: payload.silent ? 'normal' : 'high', ttl: payload.ttl ? `${payload.ttl}s` : undefined }
              : undefined,
          apns: payload.platform === 'ios'
            ? {
                headers: { 'apns-priority': payload.silent ? '5' : '10' },
                payload: { aps: { 'content-available': payload.silent ? 1 : undefined } },
              }
            : undefined,
        },
      };
      const response = await this.httpRequest<{ name: string }>({
        method: 'POST',
        url: `https://fcm.googleapis.com/v1/projects/${account.project_id}/messages:send`,
        headers: { Authorization: `Bearer ${accessToken}` },
        body,
      });
      this.logger.log(`FCM sent → ${payload.token.slice(0, 12)}...`);
      return { success: true, providerMessageId: response.body.name };
    } catch (err) {
      return this.mapError(err);
    }
  }

  private async getAccessToken(): Promise<string> {
    if (this.cachedToken && this.cachedToken.expiresAtMs > Date.now() + 60_000) {
      return this.cachedToken.token;
    }
    const account = this.loadServiceAccount();
    if (!account) throw new Error('FCM service account not configured');

    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + 3600;
    const header = { alg: 'RS256', typ: 'JWT' };
    const claim = {
      iss: account.client_email,
      scope: 'https://www.googleapis.com/auth/firebase.messaging',
      aud: account.token_uri,
      iat: issuedAt,
      exp: expiresAt,
    };
    const encode = (obj: unknown) => Buffer.from(JSON.stringify(obj)).toString('base64url');
    const signingInput = `${encode(header)}.${encode(claim)}`;
    const signer = createSign('RSA-SHA256');
    signer.update(signingInput);
    signer.end();
    const signature = signer.sign(account.private_key).toString('base64url');
    const jwt = `${signingInput}.${signature}`;

    const form = new URLSearchParams();
    form.set('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
    form.set('assertion', jwt);

    const response = await this.httpRequest<{ access_token: string; expires_in: number }>({
      method: 'POST',
      url: account.token_uri,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      bodyRaw: form.toString(),
    });
    this.cachedToken = {
      token: response.body.access_token,
      expiresAtMs: Date.now() + response.body.expires_in * 1000,
    };
    return this.cachedToken.token;
  }

  private loadServiceAccount(): ServiceAccount | null {
    if (this.cfg.serviceAccountJson) {
      try {
        return JSON.parse(this.cfg.serviceAccountJson) as ServiceAccount;
      } catch {
        return null;
      }
    }
    if (this.cfg.projectId && this.cfg.clientEmail && this.cfg.privateKey) {
      return {
        project_id: this.cfg.projectId,
        client_email: this.cfg.clientEmail,
        private_key: this.cfg.privateKey.replace(/\\n/g, '\n'),
        token_uri: 'https://oauth2.googleapis.com/token',
      };
    }
    return null;
  }

  private mapError(err: unknown): ProviderSendResult {
    if (err && typeof err === 'object' && 'retryable' in err) {
      const pe = err as { message: string; code?: string; retryable: boolean };
      const invalid = /UNREGISTERED|INVALID_ARGUMENT|NOT_FOUND/.test(pe.message);
      return {
        success: false,
        error: pe.message,
        errorCode: pe.code ?? (invalid ? 'INVALID_TOKEN' : 'PROVIDER_ERROR'),
        retryable: invalid ? false : pe.retryable,
      };
    }
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
      errorCode: 'UNKNOWN_ERROR',
      retryable: false,
    };
  }
}
