import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { SocialPostService } from '../../application/services/impl/social-post.service';
import { SocialPostPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/social-post.prisma.repository';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    SocialPostService,
    { provide: 'SocialPostRepository', useClass: SocialPostPrismaRepository },
  ],
  exports: [SocialPostService, 'SocialPostRepository'],
})
export class SocialPostModule {}
