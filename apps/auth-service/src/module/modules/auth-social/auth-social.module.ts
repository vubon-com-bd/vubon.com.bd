import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';
import { PrismaModule, RedisModule } from '@vubon/shared-kernel/infrastructure';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthSocialController } from '../../interfaces/controllers/rest/auth-social.controller';
import { AuthSocialService } from '../../application/services/impl/auth-social.service';
import { SocialLoginHandler } from '../../application/commands/auth/social-login.handler';
import { SocialCallbackHandler } from '../../application/commands/auth/social-callback.handler';
import { LinkSocialHandler } from '../../application/commands/auth/link-social.handler';
import { UnlinkSocialHandler } from '../../application/commands/auth/unlink-social.handler';
import { AuthSocialSaga } from '../../application/sagas/auth-social.saga';
import { AuthSocialPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/auth-social.prisma.repository';
import { SocialValidatorService } from '../../infrastructure/services/internal/social-validator.service';

@Module({
  imports: [CqrsModule, PrismaModule, RedisModule],
  controllers: [AuthSocialController],
  providers: [PrismaService, { provide: 'PrismaService', useClass: PrismaService },
    { provide: 'AuthSocialRepository', useExisting: AuthSocialPrismaRepository },
    { provide: 'SocialValidatorService', useExisting: SocialValidatorService },
    { provide: 'AuthSocialService', useExisting: AuthSocialService },

    AuthSocialPrismaRepository,
    SocialValidatorService,
    AuthSocialService,
    SocialLoginHandler,
    SocialCallbackHandler,
    LinkSocialHandler,
    UnlinkSocialHandler,
    AuthSocialSaga,
  ],
  exports: [AuthSocialService, AuthSocialPrismaRepository],
})
export class AuthSocialModule {}
