/**
 * ReturnReasonController — REST endpoints
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param,
  Patch, Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateReturnReasonCommand } from '@application/commands/return-reason/create-return-reason.command.js';
import { UpdateReturnReasonCommand } from '@application/commands/return-reason/update.command.js';
import { ActivateReturnReasonCommand } from '@application/commands/return-reason/activate.command.js';
import { DeactivateReturnReasonCommand } from '@application/commands/return-reason/deactivate.command.js';

import { GetReturnReasonQuery } from '@application/queries/return-reason/get-return-reason.query.js';
import { GetReturnReasonByCodeQuery } from '@application/queries/return-reason/get-return-reason-by-code.query.js';
import { GetReturnReasonStatsQuery } from '@application/queries/return-reason/get-return-reason-stats.query.js';
import { ListReturnReasonsQuery } from '@application/queries/return-reason/list-return-reasons.query.js';
import { ListActiveReturnReasonsQuery } from '@application/queries/return-reason/list-active-return-reasons.query.js';

import {
  CreateReturnReasonHttpDTO,
  UpdateReturnReasonHttpDTO,
  ReturnReasonDeactivateHttpDTO,
  ListReturnReasonsHttpQueryDTO,
} from '../../dtos/requests/return-reason/return-reason.request.dto.js';
import type {
  ReturnReasonHttpResponseDTO,
  ReturnReasonListHttpResponseDTO,
  ReturnReasonStatsHttpResponseDTO,
  ReturnReasonInitiateHttpResponseDTO,
} from '../../dtos/responses/return-reason/return-reason.response.dto.js';

import { ReturnReasonControllerMapper } from '../../mappers/return-reason.controller.mapper.js';
import { ReturnReasonHttpValidator } from '../../validators/return-reason.validator.js';
import { ReturnReasonLoggingInterceptor } from '../../interceptors/return-reason-logging.interceptor.js';
import { ReturnReasonTimeoutInterceptor } from '../../interceptors/return-reason-timeout.interceptor.js';
import {
  ApiCreateReturnReason,
  ApiGetReturnReason,
  ApiListReturnReasons,
  ApiGetReturnReasonStats,
  ApiReturnReasonTransition,
  ApiReturnReasonTag,
} from '../../swagger/return-reason.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiReturnReasonTag()
@ApiBearerAuth('bearer')
@Controller('return-reasons')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ReturnReasonLoggingInterceptor, ReturnReasonTimeoutInterceptor)
export class ReturnReasonController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateReturnReason()
  async create(
    @Body() body: CreateReturnReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ReturnReasonInitiateHttpResponseDTO> {
    ReturnReasonHttpValidator.validateCreate(body);
    const appDto = ReturnReasonControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateReturnReasonCommand,
      { readonly id: string; readonly code: string; readonly isActive: boolean }
    >(new CreateReturnReasonCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      returnReasonId: result.id,
      code: result.code,
      isActive: result.isActive,
    };
  }

  @Patch(':id')
  @ApiReturnReasonTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateReturnReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ReturnReasonHttpResponseDTO> {
    ReturnReasonHttpValidator.validateUpdate({ returnReasonId: id, ...body });
    const appDto = ReturnReasonControllerMapper.toUpdateAppDto(id, body);
    const r = await this.commandBus.execute<UpdateReturnReasonCommand, Parameters<typeof ReturnReasonControllerMapper.toHttpResponse>[0]>(
      new UpdateReturnReasonCommand(appDto as never, this.getActorId(user))
    );
    return ReturnReasonControllerMapper.toHttpResponse(r);
  }

  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiReturnReasonTransition('activate')
  async activate(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<ReturnReasonHttpResponseDTO> {
    const r = await this.commandBus.execute<ActivateReturnReasonCommand, Parameters<typeof ReturnReasonControllerMapper.toHttpResponse>[0]>(
      new ActivateReturnReasonCommand({ returnReasonId: id } as never, this.getActorId(user))
    );
    return ReturnReasonControllerMapper.toHttpResponse(r);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiReturnReasonTransition('deactivate')
  async deactivate(
    @Param('id') id: string,
    @Body() body: ReturnReasonDeactivateHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ReturnReasonHttpResponseDTO> {
    const appDto = ReturnReasonControllerMapper.toDeactivateAppDto(id, body);
    const r = await this.commandBus.execute<DeactivateReturnReasonCommand, Parameters<typeof ReturnReasonControllerMapper.toHttpResponse>[0]>(
      new DeactivateReturnReasonCommand(appDto as never, this.getActorId(user))
    );
    return ReturnReasonControllerMapper.toHttpResponse(r);
  }

  @Get('stats')
  @ApiGetReturnReasonStats()
  async getStats(): Promise<ReturnReasonStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetReturnReasonStatsQuery, Parameters<typeof ReturnReasonControllerMapper.toStatsHttp>[0]>(
      new GetReturnReasonStatsQuery()
    );
    return ReturnReasonControllerMapper.toStatsHttp(appDto);
  }

  @Get('active')
  @ApiListReturnReasons()
  async listActive(): Promise<ReturnReasonListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListActiveReturnReasonsQuery, Parameters<typeof ReturnReasonControllerMapper.toListHttp>[0]>(
      new ListActiveReturnReasonsQuery()
    );
    return ReturnReasonControllerMapper.toListHttp(appDto);
  }

  @Get('code/:code')
  @ApiGetReturnReason()
  async getByCode(@Param('code') code: string): Promise<ReturnReasonHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetReturnReasonByCodeQuery, Parameters<typeof ReturnReasonControllerMapper.toHttpResponse>[0]>(
      new GetReturnReasonByCodeQuery(code)
    );
    return ReturnReasonControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetReturnReason()
  async getById(@Param('id') id: string): Promise<ReturnReasonHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetReturnReasonQuery, Parameters<typeof ReturnReasonControllerMapper.toHttpResponse>[0]>(
      new GetReturnReasonQuery(id)
    );
    return ReturnReasonControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListReturnReasons()
  async list(@Query() query: ListReturnReasonsHttpQueryDTO): Promise<ReturnReasonListHttpResponseDTO> {
    const options = ReturnReasonControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListReturnReasonsQuery, Parameters<typeof ReturnReasonControllerMapper.toListHttp>[0]>(
      new ListReturnReasonsQuery(options as never)
    );
    return ReturnReasonControllerMapper.toListHttp(appDto);
  }
}
