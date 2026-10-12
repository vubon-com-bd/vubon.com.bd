import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { StartTrackingCommand } from '../../../application/commands/tracking/start-tracking.command.js';
import { RecordTrackingEventCommand } from '../../../application/commands/tracking/record-tracking-event.command.js';
import { UpdateTrackingEtaCommand } from '../../../application/commands/tracking/update-tracking-eta.command.js';
import { GetTrackingQuery } from '../../../application/queries/tracking/get-tracking.query.js';
import { GetTrackingByNumberQuery } from '../../../application/queries/tracking/get-tracking-by-number.query.js';
import { GetPublicTrackingQuery } from '../../../application/queries/tracking/get-public-tracking.query.js';
import { ListTrackingQuery } from '../../../application/queries/tracking/list-tracking.query.js';
import {
  StartTrackingHttpDTO, RecordTrackingEventHttpDTO, UpdateTrackingEtaHttpDTO, ListTrackingHttpQueryDTO,
} from '../../dtos/requests/tracking.request.dto.js';
import { TrackingControllerMapper } from '../../mappers/tracking.controller.mapper.js';
import type { TrackingResponseDTO, TrackingListResponseDTO, TrackingPublicResponseDTO } from '../../../application/dtos/responses/tracking/tracking-response.dto.js';

@ApiTags('tracking')
@ApiBearerAuth('bearer')
@Controller('logistics/tracking')
@UseGuards(JwtAuthGuard)
export class TrackingController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Start tracking for a shipment' })
  async start(@Body() dto: StartTrackingHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<TrackingResponseDTO> {
    return this.commandBus.execute(new StartTrackingCommand(TrackingControllerMapper.toStartDto(dto), user.userId));
  }
  @Post(':id/event') @ApiOperation({ summary: 'Record a tracking event' })
  async recordEvent(@Param('id') id: string, @Body() dto: RecordTrackingEventHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<TrackingResponseDTO> {
    return this.commandBus.execute(new RecordTrackingEventCommand(TrackingControllerMapper.toRecordDto(id, dto), user.userId));
  }
  @Patch(':id/eta') @ApiOperation({ summary: 'Update estimated delivery time' })
  async updateEta(@Param('id') id: string, @Body() dto: UpdateTrackingEtaHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<TrackingResponseDTO> {
    return this.commandBus.execute(new UpdateTrackingEtaCommand(TrackingControllerMapper.toUpdateEtaDto(id, dto), user.userId));
  }
  @Get() @ApiOperation({ summary: 'List tracking entries' })
  async list(@Query() q: ListTrackingHttpQueryDTO): Promise<TrackingListResponseDTO> {
    return this.queryBus.execute(new ListTrackingQuery(TrackingControllerMapper.toListOptions(q)));
  }
  @Get('by-number/:trackingNumber') @ApiOperation({ summary: 'Get tracking by tracking number' })
  async getByNumber(@Param('trackingNumber') tn: string): Promise<TrackingResponseDTO> {
    return this.queryBus.execute(new GetTrackingByNumberQuery(tn));
  }
  @Get('public/:trackingNumber') @ApiOperation({ summary: 'Public tracking lookup (no auth)' })
  async getPublic(@Param('trackingNumber') tn: string): Promise<TrackingPublicResponseDTO> {
    return this.queryBus.execute(new GetPublicTrackingQuery(tn));
  }
  @Get(':id') @ApiOperation({ summary: 'Get tracking by id' })
  async getById(@Param('id') id: string): Promise<TrackingResponseDTO> {
    return this.queryBus.execute(new GetTrackingQuery(id));
  }
}
