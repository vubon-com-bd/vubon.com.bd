/**
 * WebhookController — inbound webhook receiver (public endpoint)
 * @module payment-service/interfaces/controllers/rest
 *
 * NOTE: This endpoint is intentionally PUBLIC — gateways do not send JWTs.
 * Signature verification is performed inside WebhookService.
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { ProcessWebhookCommand } from '../../../application/commands/webhook/process-webhook.command.js';
import { GetWebhookQuery } from '../../../application/queries/webhook/get-webhook.query.js';
import { ListWebhookEventsQuery } from '../../../application/queries/webhook/list-webhook-events.query.js';

import {
  ProcessWebhookHttpDTO,
  ListWebhookEventsHttpQueryDTO,
} from '../../dtos/requests/webhook.request.dto.js';
import { WebhookControllerMapper } from '../../mappers/webhook.controller.mapper.js';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhookController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Public()
  @Post(':gateway')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive a gateway webhook' })
  async receive(
    @Param('gateway') gateway: string,
    @Body() body: Record<string, unknown>,
  ): Promise<unknown> {
    const gatewayEventId =
      (body['id'] as string | undefined) ??
      (body['event_id'] as string | undefined) ??
      (body['eventId'] as string | undefined) ??
      `${gateway}-${Date.now()}`;
    const eventType =
      (body['type'] as string | undefined) ??
      (body['event_type'] as string | undefined) ??
      (body['eventType'] as string | undefined) ??
      'unknown';
    const signature =
      (body['signature'] as string | undefined) ??
      (body['sig'] as string | undefined);

    const dto: ProcessWebhookHttpDTO = {
      gateway,
      gatewayEventId,
      eventType,
      payload: body,
      signature,
      receivedAt: new Date().toISOString(),
    };
    return this.commandBus.execute(new ProcessWebhookCommand(dto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List webhook events (paginated)' })
  async list(@Query() q: ListWebhookEventsHttpQueryDTO): Promise<unknown> {
    const appDto = WebhookControllerMapper.toListAppDto(q);
    return this.queryBus.execute(new ListWebhookEventsQuery(appDto));
  }

  @Get(':webhookId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get webhook event by id' })
  async getById(@Param('webhookId') webhookId: string): Promise<unknown> {
    return this.queryBus.execute(new GetWebhookQuery(webhookId));
  }
}
