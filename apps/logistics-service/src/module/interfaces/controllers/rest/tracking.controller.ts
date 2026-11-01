/**
 * TrackingController — REST endpoints
 * @module logistics-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param,
  Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateTrackingCommand } from '@application/commands/tracking/create-tracking.command.js';
import { ActivateTrackingCommand } from '@application/commands/tracking/activate-tracking.command.js';
import { CompleteTrackingCommand } from '@application/commands/tracking/complete-tracking.command.js';
import { FailTrackingCommand } from '@application/commands/tracking/fail-tracking.command.js';
import { ExpireTrackingCommand } from '@application/commands/tracking/expire-tracking.command.js';
import { AddTrackingEventCommand } from '@application/commands/tracking/add-tracking-event.command.js';

import { GetTrackingQuery } from '@application/queries/tracking/get-tracking.query.js';
import { GetTrackingByNumberQuery } from '@application/queries/tracking/get-tracking-by-number.query.js';
import { GetTrackingStatsQuery } from '@application/queries/tracking/get-tracking-stats.query.js';
import { ListTrackingsQuery } from '@application/queries/tracking/list-trackings.query.js';

import {
  CreateTrackingHttpDTO,
  AddTrackingEventHttpDTO,
  TrackingReasonHttpDTO,
  ListTrackingsHttpQueryDTO,
} from '../../dtos/requests/tracking/tracking.request.dto.js';
import type {
  TrackingHttpResponseDTO,
  TrackingPublicHttpResponseDTO,
  TrackingListHttpResponseDTO,
  TrackingStatsHttpResponseDTO,
  TrackingInitiateHttpResponseDTO,
} from '../../dtos/responses/tracking/tracking.response.dto.js';

import { TrackingControllerMapper } from '../../mappers/tracking.controller.mapper.js';
import { TrackingHttpValidator } from '../../validators/tracking.validator.js';
import { TrackingLoggingInterceptor } from '../../interceptors/tracking-logging.interceptor.js';
import { TrackingTimeoutInterceptor } from '../../interceptors/tracking-timeout.interceptor.js';
import {
  ApiCreateTracking,
  ApiGetTracking,
  ApiGetTrackingPublic,
  ApiListTrackings,
  ApiGetTrackingStats,
  ApiTrackingTransition,
  ApiTrackingTag,
} from '../../swagger/tracking.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiTrackingTag()
@ApiBearerAuth('bearer')
@Controller('trackings')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TrackingLoggingInterceptor, TrackingTimeoutInterceptor)
export class TrackingController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  // ═══ Create ═══
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateTracking()
  async create(
    @Body() body: CreateTrackingHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<TrackingInitiateHttpResponseDTO> {
    TrackingHttpValidator.validateCreate(body);
    const appDto = TrackingControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateTrackingCommand,
      { readonly id: string; readonly trackingNumber: string; readonly status: string }
    >(new CreateTrackingCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      trackingId: result.id,
      trackingNumber: result.trackingNumber,
      status: result.status,
    };
  }

  // ═══ State transitions ═══
  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiTrackingTransition('activate')
  async activate(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<TrackingHttpResponseDTO> {
    const result = await this.commandBus.execute<
      ActivateTrackingCommand,
      Parameters<typeof TrackingControllerMapper.toHttpResponse>[0]
    >(new ActivateTrackingCommand({ trackingId: id } as never, this.getActorId(user)));
    return TrackingControllerMapper.toHttpResponse(result);
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiTrackingTransition('complete')
  async complete(
    @Param('id') id: string,
    @Body() body: TrackingReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<TrackingHttpResponseDTO> {
    const result = await this.commandBus.execute<
      CompleteTrackingCommand,
      Parameters<typeof TrackingControllerMapper.toHttpResponse>[0]
    >(new CompleteTrackingCommand({ trackingId: id, reason: body.reason } as never, this.getActorId(user)));
    return TrackingControllerMapper.toHttpResponse(result);
  }

  @Post(':id/fail')
  @HttpCode(HttpStatus.OK)
  @ApiTrackingTransition('fail')
  async fail(
    @Param('id') id: string,
    @Body() body: TrackingReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<TrackingHttpResponseDTO> {
    const result = await this.commandBus.execute<
      FailTrackingCommand,
      Parameters<typeof TrackingControllerMapper.toHttpResponse>[0]
    >(new FailTrackingCommand({ trackingId: id, reason: body.reason } as never, this.getActorId(user)));
    return TrackingControllerMapper.toHttpResponse(result);
  }

  @Post(':id/expire')
  @HttpCode(HttpStatus.OK)
  @ApiTrackingTransition('expire')
  async expire(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<TrackingHttpResponseDTO> {
    const result = await this.commandBus.execute<
      ExpireTrackingCommand,
      Parameters<typeof TrackingControllerMapper.toHttpResponse>[0]
    >(new ExpireTrackingCommand({ trackingId: id } as never, this.getActorId(user)));
    return TrackingControllerMapper.toHttpResponse(result);
  }

  @Post(':id/events')
  @HttpCode(HttpStatus.CREATED)
  @ApiTrackingTransition('add event')
  async addEvent(
    @Param('id') id: string,
    @Body() body: AddTrackingEventHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<TrackingHttpResponseDTO> {
    TrackingHttpValidator.validateAddEvent({ trackingId: id, ...body });
    const appDto = TrackingControllerMapper.toAddEventAppDto(id, body);
    const result = await this.commandBus.execute<
      AddTrackingEventCommand,
      Parameters<typeof TrackingControllerMapper.toHttpResponse>[0]
    >(new AddTrackingEventCommand(appDto, this.getActorId(user)));
    return TrackingControllerMapper.toHttpResponse(result);
  }

  // ═══ Read ═══
  @Get('stats')
  @ApiGetTrackingStats()
  async getStats(): Promise<TrackingStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetTrackingStatsQuery,
      Parameters<typeof TrackingControllerMapper.toStatsHttp>[0]
    >(new GetTrackingStatsQuery());
    return TrackingControllerMapper.toStatsHttp(appDto);
  }

  @Get('number/:trackingNumber')
  @ApiGetTrackingPublic()
  async getByNumber(@Param('trackingNumber') trackingNumber: string): Promise<TrackingPublicHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetTrackingByNumberQuery,
      Parameters<typeof TrackingControllerMapper.toPublicHttpResponse>[0]
    >(new GetTrackingByNumberQuery(trackingNumber));
    return TrackingControllerMapper.toPublicHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetTracking()
  async getById(@Param('id') id: string): Promise<TrackingHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetTrackingQuery,
      Parameters<typeof TrackingControllerMapper.toHttpResponse>[0]
    >(new GetTrackingQuery(id));
    return TrackingControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListTrackings()
  async list(@Query() query: ListTrackingsHttpQueryDTO): Promise<TrackingListHttpResponseDTO> {
    const options = TrackingControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<
      ListTrackingsQuery,
      Parameters<typeof TrackingControllerMapper.toListHttp>[0]
    >(new ListTrackingsQuery(options as never));
    return TrackingControllerMapper.toListHttp(appDto);
  }
}
