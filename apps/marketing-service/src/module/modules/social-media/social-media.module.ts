import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { SocialMediaService } from '../../application/services/impl/social-media.service';
import { SocialPostService } from '../../application/services/impl/social-post.service';

import {
  CreateSocialPostHandler,
  ScheduleSocialPostHandler,
  PublishSocialPostHandler,
} from '../../application/commands/social-media';

import { SocialMediaPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/social-media.prisma.repository';
import { SocialPostPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/social-post.prisma.repository';

import { SocialMediaController } from '../../interfaces/controllers/rest/social-media.controller';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [SocialMediaController],
  providers: [
    SocialMediaService,
    SocialPostService,

    { provide: 'SocialMediaRepository', useClass: SocialMediaPrismaRepository },
    { provide: 'SocialPostRepository', useClass: SocialPostPrismaRepository },

    CreateSocialPostHandler,
    ScheduleSocialPostHandler,
    PublishSocialPostHandler,
  ],
  exports: [SocialMediaService, 'SocialMediaRepository'],
})
export class SocialMediaModule {}
