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
import { TrackEventCommand } from '../../../application/commands/event/track-event.command';
import { BatchTrackEventCommand } from '../../../application/commands/event/batch-track-event.command';
import { GetEventQuery } from '../../../application/queries/event/get-event.query';
import { ListEventsQuery } from '../../../application/queries/event/list-events.query';
import {
  TrackEventRequestDTO,
  BatchTrackEventRequestDTO,
} from '../../dtos/requests';
import { EventSwagger } from '../../swagger/event.swagger';
import { AnalyticsAccessGuard } from '../../guards/analytics-access.guard';

@EventSwagger.Tag()
@Controller('analytics/events')
@UseGuards(JwtAuthGuard, AnalyticsAccessGuard)
export class EventController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('track')
  @HttpCode(HttpStatus.CREATED)
  @EventSwagger.Track()
  async track(@Body() body: TrackEventRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new TrackEventCommand(
        body.name,
        body.source,
        body.payload ?? {},
        body.userId,
        body.sessionId,
        body.occurredAt,
      ),
    );
  }

  @Post('track/batch')
  @HttpCode(HttpStatus.CREATED)
  @EventSwagger.TrackBatch()
  async trackBatch(@Body() body: BatchTrackEventRequestDTO): Promise<unknown> {
    return this.commandBus.execute(new BatchTrackEventCommand(body.events as never));
  }

  @Get()
  @EventSwagger.List()
  async list(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('source') source?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListEventsQuery(
        limit ? Number(limit) : 50,
        offset ? Number(offset) : 0,
        source,
      ),
    );
  }

  @Get(':id')
  @EventSwagger.Get()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetEventQuery(id));
  }
}
