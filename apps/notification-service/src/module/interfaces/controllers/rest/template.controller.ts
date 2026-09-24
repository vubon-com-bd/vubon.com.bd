import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CreateTemplateCommand } from '../../../application/commands/template/create-template.command';
import { UpdateTemplateCommand } from '../../../application/commands/template/update-template.command';
import { GetTemplateQuery } from '../../../application/queries/template/get-template.query';
import { GetTemplateByNameQuery } from '../../../application/queries/template/get-template-by-name.query';

interface CreateTemplateBody {
  name: string;
  slug: string;
  templateType: string;
  category: string;
  body: string;
  locale?: string;
  subject?: string;
  bodyHtml?: string;
}

interface UpdateTemplateBody {
  subject?: string;
  body?: string;
  bodyHtml?: string;
  status?: string;
}

@Controller('notifications/templates')
@UseGuards(JwtAuthGuard)
export class TemplateController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateTemplateBody): Promise<unknown> {
    return this.commandBus.execute(
      new CreateTemplateCommand(
        body.name,
        body.slug,
        body.templateType,
        body.category,
        body.body,
        body.locale,
        body.subject,
        body.bodyHtml,
      ),
    );
  }

  @Get()
  async list(): Promise<unknown> {
    return [];
  }

  @Get('by-name')
  async getByName(
    @Query('name') name: string,
    @Query('locale') locale?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetTemplateByNameQuery(name, locale));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetTemplateQuery(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTemplateBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateTemplateCommand(
        id,
        body.subject,
        body.body,
        body.bodyHtml,
        body.status,
      ),
    );
  }
}
