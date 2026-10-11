/**
 * EmailProviderModule — wires email provider adapters
 * @module notification-service/infrastructure/providers/email
 */
import { Global, Module } from '@nestjs/common';
import { EMAIL_CONFIG } from '@vubon/shared-config/platform/notification';
import { ResendEmailProvider } from './resend.provider.js';
import { SmtpEmailProvider } from './smtp.provider.js';
import {
  EmailProviderResolver,
  EMAIL_PROVIDER_RESOLVER,
  EMAIL_DEFAULT_PROVIDER,
} from './email-provider.resolver.js';

@Global()
@Module({
  providers: [
    ResendEmailProvider,
    SmtpEmailProvider,
    {
      provide: EMAIL_DEFAULT_PROVIDER,
      useValue: EMAIL_CONFIG.provider,
    },
    EmailProviderResolver,
    // Symbol alias so `@Inject(EMAIL_PROVIDER_RESOLVER)` works
    {
      provide: EMAIL_PROVIDER_RESOLVER,
      useExisting: EmailProviderResolver,
    },
  ],
  exports: [
    ResendEmailProvider,
    SmtpEmailProvider,
    EmailProviderResolver,
    EMAIL_PROVIDER_RESOLVER,
  ],
})
export class EmailProviderModule {}
