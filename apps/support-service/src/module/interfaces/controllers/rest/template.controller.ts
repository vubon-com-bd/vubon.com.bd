/**
 * TemplateController — HTTP adapter
 * @module support-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, CurrentUser } from '@vubon/shared-kernel/interfaces';

import { CreateTemplateCommand } from '../../../application/commands/template/create-template.command';
import { UpdateTemplateCommand } from '../../../application/commands/template/update-template.command';
import { RenderTemplateCommand } from '../../../application/commands/template/render-template.command';
import { GetTemplateQuery } from '../../../application/queries/template/get-template.query';
import { ListTemplatesQuery } from '../../../application/queries/template/list-templates.query';

import { CreateTemplateRequestDTO } from '../../dtos/requests/template/create-template.dto';
import { UpdateTemplateRequestDTO } from '../../dtos/requests/template/update-template.dto';
import { TemplateResponseDTO } from '../../dtos/responses/template-response.dto';
import { TemplateControllerMapper } from '../../mappers/template.controller.mapper';

@ApiTags('Templates')
@ApiBearerAuth()
@Controller({ path: 'templates', version: '1' })
export class TemplateController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: TemplateControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateTemplateRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<TemplateResponseDTO> {
    const result = await this.commandBus.execute(
      new CreateTemplateCommand({
        name: body.name,
        slug: body.slug,
        type: body.type as never,
        locale: body.locale,
        subject: body.subject,
        body: body.body,
        variables: body.variables?.map((v) => ({
          name: v.name,
          type: v.type as never,
          required: v.required,
          defaultValue: v.defaultValue,
          description: v.description,
        })),
        createdBy: userId,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<TemplateResponseDTO> {
    const result = await this.queryBus.execute(new GetTemplateQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<readonly TemplateResponseDTO[]> {
    const result = await this.queryBus.execute(new ListTemplatesQuery(1, 20));
    return result.map((item: never) => this.mapper.toResponse(item));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTemplateRequestDTO,
  ): Promise<TemplateResponseDTO> {
    const result = await this.commandBus.execute(
      new UpdateTemplateCommand({
        templateId: id,
        name: body.name,
        subject: body.subject,
        body: body.body,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/render')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async render(
    @Param('id') id: string,
    @Body() body: { values: Record<string, string | number> },
  ): Promise<{ templateId: string; text: string }> {
    return this.commandBus.execute(
      new RenderTemplateCommand(id, body.values),
    );
  }
}
