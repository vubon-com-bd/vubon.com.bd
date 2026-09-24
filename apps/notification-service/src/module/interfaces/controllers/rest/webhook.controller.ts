import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateWebhookCommand } from '../../../application/commands/webhook/create-webhook.command';
import { UpdateWebhookCommand } from '../../../application/commands/webhook/update-webhook.command';
import { TestWebhookCommand } from '../../../application/commands/webhook/test-webhook.command';
import { ListWebhooksQuery } from '../../../application/queries/webhook/list-webhooks.query';
import { GetWebhookQuery } from '../../../application/queries/webhook/get-webhook.query';

interface CreateWebhookBody {
  webhookType: string;
  url: string;
  events: readonly string[];
  secret?: string;
}

interface UpdateWebhookBody {
  url?: string;
  secret?: string;
  events?: readonly string[];
  status?: string;
}

@Controller('notifications/webhooks')
@UseGuards(JwtAuthGuard)
export class WebhookController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: CreateWebhookBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateWebhookCommand(
        user.userId,
        body.webhookType,
        body.url,
        body.events,
        body.secret,
      ),
    );
  }

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListWebhooksQuery(user.userId));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetWebhookQuery(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateWebhookBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateWebhookCommand(
        id,
        body.url,
        body.secret,
        body.events,
        body.status,
      ),
    );
  }

  @Post(':id/test')
  @HttpCode(HttpStatus.OK)
  async test(
    @Param('id') id: string,
    @Body() body: { event: string; data?: Record<string, unknown> },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new TestWebhookCommand(id, body.event, body.data),
    );
  }
}
