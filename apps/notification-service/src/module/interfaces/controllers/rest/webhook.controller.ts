/**
 * WebhookController
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

import { CreateWebhookCommand } from '@application/commands/webhook/create-webhook.command.js';
import { UpdateWebhookCommand } from '@application/commands/webhook/update-webhook.command.js';
import { TestWebhookCommand } from '@application/commands/webhook/test-webhook.command.js';
import { GetWebhookQuery } from '@application/queries/webhook/get-webhook.query.js';
import { ListWebhooksQuery } from '@application/queries/webhook/list-webhooks.query.js';

import {
  CreateWebhookHttpDTO,
  UpdateWebhookHttpDTO,
  TestWebhookHttpDTO,
  ListWebhooksHttpQueryDTO,
} from '@interfaces/dtos/requests/webhook.request.dto.js';
import type {
  WebhookHttpResponseDTO,
  WebhookListHttpResponseDTO,
  WebhookDeliveryHttpResponseDTO,
} from '@interfaces/dtos/responses/webhook.response.dto.js';

import { WebhookControllerMapper } from '@interfaces/mappers/webhook.controller.mapper.js';
import { WebhookHttpValidator } from '@interfaces/validators/webhook.validator.js';
import { AdminOnlyGuard } from '@interfaces/guards/admin-only.guard.js';
import {
  ApiWebhookTag,
  ApiCreateWebhook,
  ApiUpdateWebhook,
  ApiTestWebhook,
  ApiGetWebhook,
  ApiListWebhooks,
} from '@interfaces/swagger/webhook.swagger.js';

@ApiWebhookTag()
@ApiBearerAuth('bearer')
@Controller('webhooks')
@UseGuards(JwtAuthGuard)
export class WebhookController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminOnlyGuard)
  @ApiCreateWebhook()
  async create(
    @Body() dto: CreateWebhookHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<WebhookHttpResponseDTO> {
    WebhookHttpValidator.validateCreate(dto);
    const appDto = WebhookControllerMapper.toCreateRequestDTO(dto);
    const result = await this.commandBus.execute(
      new CreateWebhookCommand(appDto as never, user.userId),
    );
    return WebhookControllerMapper.toHttpResponse(result);
  }

  @Put(':id')
  @UseGuards(AdminOnlyGuard)
  @ApiUpdateWebhook()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWebhookHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<WebhookHttpResponseDTO> {
    WebhookHttpValidator.validateUpdate(dto);
    const appDto = WebhookControllerMapper.toUpdateRequestDTO(id, dto);
    const result = await this.commandBus.execute(
      new UpdateWebhookCommand(appDto as never, user.userId),
    );
    return WebhookControllerMapper.toHttpResponse(result);
  }

  @Post(':id/test')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminOnlyGuard)
  @ApiTestWebhook()
  async test(
    @Param('id') id: string,
    @Body() dto: TestWebhookHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<WebhookDeliveryHttpResponseDTO> {
    WebhookHttpValidator.validateTest(dto);
    const appDto = WebhookControllerMapper.toTestRequestDTO(id, dto);
    const result = await this.commandBus.execute(
      new TestWebhookCommand(appDto as never, user.userId),
    );
    return WebhookControllerMapper.toDeliveryHttp(result);
  }

  @Get()
  @ApiListWebhooks()
  async list(
    @Query() q: ListWebhooksHttpQueryDTO,
  ): Promise<WebhookListHttpResponseDTO> {
    const options = WebhookControllerMapper.toListOptions(q);
    const result = await this.queryBus.execute(
      new ListWebhooksQuery(options),
    );
    return WebhookControllerMapper.toListHttp(result);
  }

  @Get(':id')
  @ApiGetWebhook()
  async getById(@Param('id') id: string): Promise<WebhookHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new GetWebhookQuery(id),
    );
    return WebhookControllerMapper.toHttpResponse(result);
  }
}
