/**
 * SocialIntegrationModule — isolates social OAuth cross-dependencies
 * @module identity-service/modules/social-integration
 *
 * Breaks circular dependency between UserModule and AuthModule.
 * Both imported via forwardRef, SocialUserResolverImpl lives here.
 */
import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module.js';
import { AuthModule } from '../auth/auth.module.js';

import { SocialUserResolverImpl } from '../../application/services/impl/social-user-resolver.service.js';
import { SocialSessionIssuerImpl } from '../../application/services/impl/social-session-issuer.service.js';
import { SOCIAL_USER_RESOLVER, SOCIAL_SESSION_ISSUER } from '../../application/services/impl/auth-social.service.js';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  providers: [
    SocialUserResolverImpl,
    { provide: SOCIAL_USER_RESOLVER, useExisting: SocialUserResolverImpl },
    SocialSessionIssuerImpl,
    { provide: SOCIAL_SESSION_ISSUER, useExisting: SocialSessionIssuerImpl },
  ],
  exports: [
    SOCIAL_USER_RESOLVER,
    SocialUserResolverImpl,
    SOCIAL_SESSION_ISSUER,
    SocialSessionIssuerImpl,
  ],
})
export class SocialIntegrationModule {}
