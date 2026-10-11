/**
 * PushProviderModule — wires push provider adapters
 * @module notification-service/infrastructure/providers/push
 */
import { Global, Module } from '@nestjs/common';
import { PUSH_CONFIG } from '@vubon/shared-config/platform/notification';
import { FcmPushProvider } from './fcm.provider.js';
import { WebPushProvider } from './webpush.provider.js';
import {
  PushProviderResolver,
  PUSH_PROVIDER_RESOLVER,
  PUSH_DEFAULT_PROVIDER,
} from './push-provider.resolver.js';

@Global()
@Module({
  providers: [
    FcmPushProvider,
    WebPushProvider,
    { provide: PUSH_DEFAULT_PROVIDER, useValue: PUSH_CONFIG.provider },
    PushProviderResolver,
    { provide: PUSH_PROVIDER_RESOLVER, useExisting: PushProviderResolver },
  ],
  exports: [
    FcmPushProvider,
    WebPushProvider,
    PushProviderResolver,
    PUSH_PROVIDER_RESOLVER,
  ],
})
export class PushProviderModule {}
