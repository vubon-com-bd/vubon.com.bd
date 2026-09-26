import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { EmailSubscriberService } from '../../application/services/impl/email-subscriber.service';
import { EmailSubscriberPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/email-subscriber.prisma.repository';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    EmailSubscriberService,
    { provide: 'EmailSubscriberRepository', useClass: EmailSubscriberPrismaRepository },
  ],
  exports: [EmailSubscriberService, 'EmailSubscriberRepository'],
})
export class EmailSubscriberModule {}
