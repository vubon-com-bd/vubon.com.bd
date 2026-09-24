import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces';
import { GetArticleQuery } from '../../../application/queries/knowledge-base/get-article.query';
import { ListPublishedArticlesQuery } from '../../../application/queries/knowledge-base/list-published-articles.query';

@ApiTags('Knowledge Base')
@Controller('knowledge-base')
export class KnowledgeBaseController {
  constructor(private readonly queryBus: QueryBus) {}

  @Public()
  @Get()
  async list(@Query('q') q?: string): Promise<unknown> {
    return this.queryBus.execute(new ListPublishedArticlesQuery());
    void q;
  }

  @Public()
  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetArticleQuery(id));
  }
}
