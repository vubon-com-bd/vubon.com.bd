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
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CreateBroadcastCommand } from '../../../application/commands/broadcast/create-broadcast.command';
import { StartBroadcastCommand } from '../../../application/commands/broadcast/start-broadcast.command';
import { CancelBroadcastCommand } from '../../../application/commands/broadcast/cancel-broadcast.command';
import { ListBroadcastsQuery } from '../../../application/queries/broadcast/list-broadcasts.query';
import { GetBroadcastStatsQuery } from '../../../application/queries/broadcast/get-broadcast-stats.query';

interface CreateBroadcastBody {
  broadcastType: string;
  target: string;
  content: string;
  templateId?: string;
  subject?: string;
  scheduledAt?: string;
}

@Controller('notifications/broadcasts')
@UseGuards(JwtAuthGuard)
export class BroadcastController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateBroadcastBody): Promise<unknown> {
    return this.commandBus.execute(
      new CreateBroadcastCommand(
        body.broadcastType,
        body.target,
        body.content,
        body.templateId,
        body.subject,
        body.scheduledAt,
      ),
    );
  }

  @Get()
  async list(@Query('status') status?: string): Promise<unknown> {
    return this.queryBus.execute(new ListBroadcastsQuery(status));
  }

  @Post(':id/start')
  @HttpCode(HttpStatus.OK)
  async start(@Param('id') id: string): Promise<unknown> {
    return this.commandBus.execute(new StartBroadcastCommand(id));
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancel(
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ): Promise<void> {
    await this.commandBus.execute(new CancelBroadcastCommand(id, body.reason));
  }

  @Get(':id/stats')
  async stats(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetBroadcastStatsQuery(id));
  }
}
