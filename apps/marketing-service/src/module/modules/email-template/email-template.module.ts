import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { EmailTemplateService } from '../../application/services/impl/email-template.service';
import { EmailTemplatePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/email-template.prisma.repository';
import { CreateEmailTemplateHandler } from '../../application/commands/email-marketing';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [
    EmailTemplateService,
    { provide: 'EmailTemplateRepository', useClass: EmailTemplatePrismaRepository },
    CreateEmailTemplateHandler,
  ],
  exports: [EmailTemplateService, 'EmailTemplateRepository'],
})
export class EmailTemplateModule {}
