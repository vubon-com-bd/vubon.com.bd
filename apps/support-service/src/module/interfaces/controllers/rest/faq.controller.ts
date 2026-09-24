import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces';
import { GetFaqQuery } from '../../../application/queries/faq/get-faq.query';
import { ListPublishedFaqsQuery } from '../../../application/queries/faq/list-published-faqs.query';

@ApiTags('FAQ')
@Controller('faqs')
export class FaqController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get()
  async list(@Query('q') q?: string): Promise<unknown> {
    return this.queryBus.execute(new ListPublishedFaqsQuery());
    void q;
  }

  @Public()
  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetFaqQuery(id));
  }
}
