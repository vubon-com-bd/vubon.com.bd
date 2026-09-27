import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthSocialController } from '../../interfaces/controllers/rest/auth-social.controller.js';
import { AuthSocialService } from '../../application/services/impl/auth-social.service.js';
import { SocialLoginHandler } from '../../application/commands/auth/social-login.handler.js';
import { SocialCallbackHandler } from '../../application/commands/auth/social-callback.handler.js';
import { LinkSocialHandler } from '../../application/commands/auth/link-social.handler.js';
import { UnlinkSocialHandler } from '../../application/commands/auth/unlink-social.handler.js';
import { AuthSocialSaga } from '../../application/sagas/auth-social.saga.js';
import { AuthSocialPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-social.prisma.repository.js';
import { UserPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/user.prisma.repository.js';
import { AuthSessionModule } from '../auth-session/auth-session.module.js';
import { AuthTokenModule } from '../auth-token/auth-token.module.js';
import {
  AUTH_SOCIAL_REPO,
  AUTH_SOCIAL_SERVICE,
  USER_REPO,
} from '../../application/services/tokens.js';

const TOKEN_BINDINGS = [
  { provide: AUTH_SOCIAL_REPO, useExisting: AuthSocialPrismaRepository },
  { provide: AUTH_SOCIAL_SERVICE, useExisting: AuthSocialService },
  { provide: USER_REPO, useExisting: UserPrismaRepository },
];

@Module({
  imports: [CqrsModule, AuthSessionModule, AuthTokenModule],
  controllers: [AuthSocialController],
  providers: [
    AuthSocialService,
    AuthSocialPrismaRepository,
    UserPrismaRepository,
    AuthSocialSaga,
    SocialLoginHandler,
    SocialCallbackHandler,
    LinkSocialHandler,
    UnlinkSocialHandler,
    ...TOKEN_BINDINGS,
  ],
  exports: [
    AuthSocialService,
    AuthSocialPrismaRepository,
    ...TOKEN_BINDINGS.map((b) => b.provide),
  ],
})
export class AuthSocialModule {}
