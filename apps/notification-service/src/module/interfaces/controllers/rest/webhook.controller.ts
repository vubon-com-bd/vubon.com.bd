/**
 * WebhookController — REST endpoints for outbound webhooks
 * @module notification-service/interfaces/controllers/rest
 */
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateWebhookCommand } from '../../../application/commands/webhook/create-webhook.command.js';
import { UpdateWebhookCommand } from '../../../application/commands/webhook/update-webhook.command.js';
import { ActivateWebhookCommand } from '../../../application/commands/webhook/activate-webhook.command.js';
import { DeactivateWebhookCommand } from '../../../application/commands/webhook/deactivate-webhook.command.js';
import { DisableWebhookCommand } from '../../../application/commands/webhook/disable-webhook.command.js';
import { TestWebhookCommand } from '../../../application/commands/webhook/test-webhook.command.js';
import { RetryWebhookDeliveryCommand } from '../../../application/commands/webhook/retry-webhook-delivery.command.js';

import { GetWebhookQuery } from '../../../application/queries/webhook/get-webhook.query.js';
import { ListWebhooksQuery } from '../../../application/queries/webhook/list-webhooks.query.js';
import { ListWebhookDeliveriesQuery } from '../../../application/queries/webhook/list-webhook-deliveries.query.js';

import {
  CreateWebhookHttpDTO,
  UpdateWebhookHttpDTO,
  DeactivateWebhookHttpDTO,
  DisableWebhookHttpDTO,
  TestWebhookHttpDTO,
  ListWebhooksHttpQueryDTO,
  ListWebhookDeliveriesHttpQueryDTO,
} from '../../dtos/requests/webhook/webhook.http-dto.js';

@ApiTags('webhooks')
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
  @ApiOperation({ summary: 'Create an outbound webhook' })
  async create(
    @Body() dto: CreateWebhookHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new CreateWebhookCommand(dto as never, user.userId));
  }

  @Get()
  @ApiOperation({ summary: 'List webhooks (paginated)' })
  async list(@Query() q: ListWebhooksHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new ListWebhooksQuery({
        page: q.page ?? 1,
        limit: q.limit ?? 20,
        sortBy: q.sortBy as never,
        sortDir: q.sortDir,
        filter: { status: q.status, event: q.event, search: q.search },
      }),
    );
  }

  @Get(':webhookId')
  @ApiOperation({ summary: 'Get webhook by id' })
  async getById(@Param('webhookId') webhookId: string): Promise<unknown> {
    return this.queryBus.execute(new GetWebhookQuery(webhookId));
  }

  @Get(':webhookId/deliveries')
  @ApiOperation({ summary: 'List webhook deliveries (paginated)' })
  async listDeliveries(
    @Param('webhookId') webhookId: string,
    @Query() q: ListWebhookDeliveriesHttpQueryDTO,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListWebhookDeliveriesQuery({
        webhookId,
        page: q.page ?? 1,
        limit: q.limit ?? 20,
        filter: { status: q.status, event: q.event, fromDate: q.fromDate, toDate: q.toDate },
      }),
    );
  }

  @Patch(':webhookId')
  @ApiOperation({ summary: 'Update a webhook' })
  async update(
    @Param('webhookId') webhookId: string,
    @Body() dto: UpdateWebhookHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateWebhookCommand({ ...dto, webhookId } as never, user.userId),
    );
  }

  @Post(':webhookId/activate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Activate a webhook' })
  async activate(
    @Param('webhookId') webhookId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ActivateWebhookCommand({ webhookId }, user.userId),
    );
  }

  @Post(':webhookId/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate a webhook' })
  async deactivate(
    @Param('webhookId') webhookId: string,
    @Body() dto: DeactivateWebhookHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new DeactivateWebhookCommand({ webhookId, reason: dto.reason }, user.userId),
    );
  }

  @Post(':webhookId/disable')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Disable a webhook' })
  async disable(
    @Param('webhookId') webhookId: string,
    @Body() dto: DisableWebhookHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new DisableWebhookCommand({ webhookId, reason: dto.reason }, user.userId),
    );
  }

  @Post(':webhookId/test')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a test event to a webhook' })
  async test(
    @Param('webhookId') webhookId: string,
    @Body() dto: TestWebhookHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new TestWebhookCommand({ webhookId, event: dto.event as never, payload: dto.payload }, user.userId),
    );
  }

  @Post('deliveries/:deliveryId/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retry a webhook delivery' })
  async retryDelivery(
    @Param('deliveryId') deliveryId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RetryWebhookDeliveryCommand({ deliveryId }, user.userId),
    );
  }
}
