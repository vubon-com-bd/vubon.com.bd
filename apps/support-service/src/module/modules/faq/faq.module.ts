import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FaqController } from '../../interfaces/controllers/rest/faq.controller';
import { GetFaqHandler } from '../../application/queries/faq/get-faq.handler';
import { ListPublishedFaqsHandler } from '../../application/queries/faq/list-published-faqs.handler';
import { FaqService } from '../../application/services/impl/faq.service';

@Module({
  imports: [CqrsModule],
  controllers: [FaqController],
  providers: [GetFaqHandler, ListPublishedFaqsHandler, FaqService],
  exports: [FaqService],
})
export class FaqModule {}
