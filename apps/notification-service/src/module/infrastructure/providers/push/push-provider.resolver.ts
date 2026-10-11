/**
 * PushProviderResolver — picks active push provider by platform
 * @module notification-service/infrastructure/providers/push
 */
import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { PUSH_CONFIG } from '@vubon/shared-config/platform/notification';
import type { IPushProvider, PushSendPayload } from '../base/provider.interface.js';
import type { ProviderSendResult } from '../base/provider.types.js';
import { FcmPushProvider } from './fcm.provider.js';
import { WebPushProvider } from './webpush.provider.js';

export const PUSH_PROVIDER_RESOLVER = Symbol('PUSH_PROVIDER_RESOLVER');
export const PUSH_DEFAULT_PROVIDER = Symbol('PUSH_DEFAULT_PROVIDER');

export interface IPushProviderResolver {
  resolve(preferredName?: string, platform?: string): IPushProvider | null;
  list(): readonly IPushProvider[];
  send(payload: PushSendPayload, preferredName?: string): Promise<ProviderSendResult>;
}

@Injectable()
export class PushProviderResolver implements IPushProviderResolver {
  private readonly logger = new Logger(PushProviderResolver.name);
  private readonly defaultProvider: string | undefined;

  constructor(
    private readonly fcm: FcmPushProvider,
    private readonly webpush: WebPushProvider,
    @Optional() @Inject(PUSH_DEFAULT_PROVIDER) defaultProvider?: string,
  ) {
    this.defaultProvider = defaultProvider ?? PUSH_CONFIG.provider;
  }

  list(): readonly IPushProvider[] {
    return [this.fcm, this.webpush].filter((p) => p.isEnabled());
  }

  resolve(preferredName?: string, platform?: string): IPushProvider | null {
    if (preferredName) {
      const found = this.list().find((p) => p.name === preferredName);
      if (found) return found;
    }
    if (platform === 'web' && this.webpush.isEnabled()) return this.webpush;
    if ((platform === 'android' || platform === 'ios') && this.fcm.isEnabled()) return this.fcm;
    if (this.defaultProvider) {
      const found = this.list().find((p) => p.name === this.defaultProvider);
      if (found) return found;
    }
    return this.list()[0] ?? null;
  }

  async send(payload: PushSendPayload, preferredName?: string): Promise<ProviderSendResult> {
    const provider = this.resolve(preferredName, payload.platform);
    if (!provider) {
      return { success: false, error: 'No push provider available', errorCode: 'NO_PROVIDER' };
    }
    return provider.send(payload);
  }
}
