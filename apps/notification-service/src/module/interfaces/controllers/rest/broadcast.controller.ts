/**
 * BroadcastController
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

import { CreateBroadcastCommand } from '@application/commands/broadcast/create-broadcast.command.js';
import { StartBroadcastCommand } from '@application/commands/broadcast/start-broadcast.command.js';
import { CancelBroadcastCommand } from '@application/commands/broadcast/cancel-broadcast.command.js';
import { GetBroadcastQuery } from '@application/queries/broadcast/get-broadcast.query.js';
import { GetBroadcastResultQuery } from '@application/queries/broadcast/get-broadcast-result.query.js';
import { ListBroadcastsQuery } from '@application/queries/broadcast/list-broadcasts.query.js';

import type {
  BroadcastHttpResponseDTO,
  BroadcastListHttpResponseDTO,
  BroadcastResultHttpResponseDTO,
} from '@interfaces/dtos/responses/broadcast.response.dto.js';

import {
  BroadcastControllerMapper,
  type CreateBroadcastHttpDTO,
  type StartBroadcastHttpDTO,
  type ListBroadcastsHttpQueryDTO,
} from '@interfaces/mappers/broadcast.controller.mapper.js';
import { AdminOnlyGuard } from '@interfaces/guards/admin-only.guard.js';

@ApiBearerAuth('bearer')
@Controller('broadcasts')
@UseGuards(JwtAuthGuard)
export class BroadcastController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminOnlyGuard)
  async create(
    @Body() dto: CreateBroadcastHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BroadcastHttpResponseDTO> {
    const appDto = BroadcastControllerMapper.toCreateRequestDTO(dto);
    const result = await this.commandBus.execute(
      new CreateBroadcastCommand(appDto as never, user.userId),
    );
    return BroadcastControllerMapper.toHttpResponse(result);
  }

  @Post(':id/start')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminOnlyGuard)
  async start(
    @Param('id') id: string,
    @Body() dto: StartBroadcastHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BroadcastHttpResponseDTO> {
    const appDto = BroadcastControllerMapper.toStartRequestDTO(id, dto);
    const result = await this.commandBus.execute(
      new StartBroadcastCommand(appDto as never, user.userId),
    );
    return BroadcastControllerMapper.toHttpResponse(result);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminOnlyGuard)
  async cancel(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BroadcastHttpResponseDTO> {
    const result = await this.commandBus.execute(
      new CancelBroadcastCommand({ broadcastId: id, reason: undefined }, user.userId),
    );
    return BroadcastControllerMapper.toHttpResponse(result);
  }

  @Get()
  async list(
    @Query() q: ListBroadcastsHttpQueryDTO,
  ): Promise<BroadcastListHttpResponseDTO> {
    const options = BroadcastControllerMapper.toListOptions(q);
    const result = await this.queryBus.execute(
      new ListBroadcastsQuery(options),
    );
    return BroadcastControllerMapper.toListHttp(result);
  }

  @Get(':id/result')
  async getResult(
    @Param('id') id: string,
  ): Promise<BroadcastResultHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new GetBroadcastResultQuery(id),
    );
    return BroadcastControllerMapper.toResultHttp(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<BroadcastHttpResponseDTO> {
    const result = await this.queryBus.execute(
      new GetBroadcastQuery(id),
    );
    return BroadcastControllerMapper.toHttpResponse(result);
  }
}
