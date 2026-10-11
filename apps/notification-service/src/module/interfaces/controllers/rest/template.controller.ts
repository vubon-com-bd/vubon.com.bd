/**
 * TemplateController — REST endpoints for notification templates
 * @module notification-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Delete,
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateTemplateCommand } from '../../../application/commands/template/create-template.command.js';
import { UpdateTemplateCommand } from '../../../application/commands/template/update-template.command.js';
import { ActivateTemplateCommand } from '../../../application/commands/template/activate-template.command.js';
import { DeactivateTemplateCommand } from '../../../application/commands/template/deactivate-template.command.js';
import { DeprecateTemplateCommand } from '../../../application/commands/template/deprecate-template.command.js';
import { ArchiveTemplateCommand } from '../../../application/commands/template/archive-template.command.js';
import { CreateTemplateVersionCommand } from '../../../application/commands/template/create-template-version.command.js';
import { RenderTemplateCommand } from '../../../application/commands/template/render-template.command.js';

import { GetTemplateQuery } from '../../../application/queries/template/get-template.query.js';
import { GetTemplateBySlugQuery } from '../../../application/queries/template/get-template-by-slug.query.js';
import { GetTemplatePublicQuery } from '../../../application/queries/template/get-template-public.query.js';
import { ListTemplatesQuery } from '../../../application/queries/template/list-templates.query.js';
import { PreviewTemplateQuery } from '../../../application/queries/template/preview-template.query.js';

import {
  CreateTemplateHttpDTO,
  UpdateTemplateHttpDTO,
  RenderTemplateHttpDTO,
  PreviewTemplateHttpDTO,
  ListTemplatesHttpQueryDTO,
  GetTemplateBySlugHttpQueryDTO,
  DeactivateTemplateHttpDTO,
  DeprecateTemplateHttpDTO,
} from '../../dtos/requests/template/template.http-dto.js';
import { TemplateControllerMapper } from '../../mappers/template.controller.mapper.js';

@ApiTags('templates')
@ApiBearerAuth('bearer')
@Controller('templates')
@UseGuards(JwtAuthGuard)
export class TemplateController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a notification template' })
  async create(
    @Body() dto: CreateTemplateHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const appDto = TemplateControllerMapper.toCreateAppDto(dto);
    return this.commandBus.execute(new CreateTemplateCommand(appDto, user.userId));
  }

  @Get()
  @ApiOperation({ summary: 'List templates (paginated)' })
  async list(@Query() q: ListTemplatesHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new ListTemplatesQuery(TemplateControllerMapper.toListAppDto(q)),
    );
  }

  @Get('by-slug/:slug')
  @ApiOperation({ summary: 'Get template by slug' })
  async getBySlug(
    @Param('slug') slug: string,
    @Query() q: GetTemplateBySlugHttpQueryDTO,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetTemplateBySlugQuery(slug, q.locale));
  }

  @Get(':templateId')
  @ApiOperation({ summary: 'Get template by id' })
  async getById(@Param('templateId') templateId: string): Promise<unknown> {
    return this.queryBus.execute(new GetTemplateQuery(templateId));
  }

  @Get(':templateId/public')
  @ApiOperation({ summary: 'Get public template view' })
  async getPublic(@Param('templateId') templateId: string): Promise<unknown> {
    return this.queryBus.execute(new GetTemplatePublicQuery(templateId));
  }

  @Patch(':templateId')
  @ApiOperation({ summary: 'Update a draft/inactive template' })
  async update(
    @Param('templateId') templateId: string,
    @Body() dto: UpdateTemplateHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateTemplateCommand(TemplateControllerMapper.toUpdateAppDto(templateId, dto), user.userId),
    );
  }

  @Post(':templateId/activate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Activate a template' })
  async activate(
    @Param('templateId') templateId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ActivateTemplateCommand({ templateId }, user.userId),
    );
  }

  @Post(':templateId/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate a template' })
  async deactivate(
    @Param('templateId') templateId: string,
    @Body() dto: DeactivateTemplateHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new DeactivateTemplateCommand(TemplateControllerMapper.toDeactivateAppDto(templateId, dto), user.userId),
    );
  }

  @Post(':templateId/deprecate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deprecate a template' })
  async deprecate(
    @Param('templateId') templateId: string,
    @Body() dto: DeprecateTemplateHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new DeprecateTemplateCommand(TemplateControllerMapper.toDeprecateAppDto(templateId, dto), user.userId),
    );
  }

  @Post(':templateId/archive')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Archive a template' })
  async archive(
    @Param('templateId') templateId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ArchiveTemplateCommand({ templateId }, user.userId),
    );
  }

  @Post(':templateId/versions')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new version of a template' })
  async createVersion(
    @Param('templateId') templateId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateTemplateVersionCommand({ templateId }, user.userId),
    );
  }

  @Post(':templateId/render')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Render a template with data' })
  async render(
    @Param('templateId') templateId: string,
    @Body() dto: RenderTemplateHttpDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RenderTemplateCommand(TemplateControllerMapper.toRenderAppDto(templateId, dto)),
    );
  }

  @Get(':templateId/preview')
  @ApiOperation({ summary: 'Preview a template (with sample data)' })
  async preview(
    @Param('templateId') templateId: string,
    @Query() q: PreviewTemplateHttpDTO,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new PreviewTemplateQuery(TemplateControllerMapper.toPreviewAppDto(templateId, q)),
    );
  }
}
