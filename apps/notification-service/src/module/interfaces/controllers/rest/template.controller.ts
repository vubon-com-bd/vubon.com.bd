/**
 * TemplateController
 * @module notification-service/interfaces/controllers/rest
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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { CreateTemplateCommand } from '@application/commands/template/create-template.command.js';
import { UpdateTemplateCommand } from '@application/commands/template/update-template.command.js';
import { TestTemplateCommand } from '@application/commands/template/test-template.command.js';
import { GetTemplateQuery } from '@application/queries/template/get-template.query.js';
import { ListTemplatesQuery } from '@application/queries/template/list-templates.query.js';

import {
  CreateTemplateHttpDTO,
  UpdateTemplateHttpDTO,
  TestTemplateHttpDTO,
  ListTemplatesHttpQueryDTO,
} from '@interfaces/dtos/requests/template.request.dto.js';
import type {
  TemplateHttpResponseDTO,
  TemplateListHttpResponseDTO,
  TemplateRenderHttpResponseDTO,
} from '@interfaces/dtos/responses/template.response.dto.js';

import { TemplateControllerMapper } from '@interfaces/mappers/template.controller.mapper.js';
import { TemplateHttpValidator } from '@interfaces/validators/template.validator.js';
import { TemplateOwnerGuard } from '@interfaces/guards/template-owner.guard.js';
import {
  ApiTemplateTag,
  ApiCreateTemplate,
  ApiUpdateTemplate,
  ApiTestTemplate,
  ApiGetTemplate,
  ApiListTemplates,
} from '@interfaces/swagger/template.swagger.js';

@ApiTemplateTag()
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
  @ApiCreateTemplate()
  async create(
    @Body() dto: CreateTemplateHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<TemplateHttpResponseDTO> {
    TemplateHttpValidator.validateCreate(dto);
    const appDto = TemplateControllerMapper.toCreateRequestDTO(dto);
    const result = await this.commandBus.execute(
      new CreateTemplateCommand(appDto as never, user.userId),
    );
    return TemplateControllerMapper.toHttpResponse(result);
  }

  @Put(':id')
  @UseGuards(TemplateOwnerGuard)
  @ApiUpdateTemplate()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTemplateHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<TemplateHttpResponseDTO> {
    TemplateHttpValidator.validateUpdate(dto);
    const appDto = TemplateControllerMapper.toUpdateRequestDTO(id, dto);
    const result = await this.commandBus.execute(
      new UpdateTemplateCommand(appDto as never, user.userId),
    );
    return TemplateControllerMapper.toHttpResponse(result);
  }

  @Post(':id/test')
  @UseGuards(TemplateOwnerGuard)
  @ApiTestTemplate()
  async test(
    @Param('id') id: string,
    @Body() dto: TestTemplateHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<TemplateRenderHttpResponseDTO> {
    TemplateHttpValidator.validateTest(dto);
    const appDto = TemplateControllerMapper.toTestRequestDTO(id, dto);
    const result = await this.commandBus.execute(
      new TestTemplateCommand(appDto as never, user.userId),
    );
    return TemplateControllerMapper.toRenderHttp(result);
  }

  @Get()
  @ApiListTemplates()
  async list(
    @Query() q: ListTemplatesHttpQueryDTO,
  ): Promise<TemplateListHttpResponseDTO> {
    const options = TemplateControllerMapper.toListOptions(q);
    const result = await this.queryBus.execute(
      new ListTemplatesQuery(options),
    );
    return TemplateControllerMapper.toListHttp(result);
  }

  @Get(':id')
  @ApiGetTemplate()
  async getById(@Param('id') id: string): Promise<TemplateHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new GetTemplateQuery(id),
    );
    return TemplateControllerMapper.toHttpResponse(result);
  }
}
