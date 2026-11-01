/**
 * CourierController — REST endpoints (11 routes)
 * @module logistics-service/interfaces/controllers/rest
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

import { CreateCourierCommand } from '@application/commands/courier/create-courier.command.js';
import { UpdateCourierCommand } from '@application/commands/courier/update-courier.command.js';
import { ActivateCourierCommand } from '@application/commands/courier/activate-courier.command.js';
import { DeactivateCourierCommand } from '@application/commands/courier/deactivate-courier.command.js';
import { SuspendCourierCommand } from '@application/commands/courier/suspend-courier.command.js';
import { TerminateCourierCommand } from '@application/commands/courier/terminate-courier.command.js';

import { GetCourierQuery } from '@application/queries/courier/get-courier.query.js';
import { GetCourierByCodeQuery } from '@application/queries/courier/get-courier-by-code.query.js';
import { GetCourierPublicQuery } from '@application/queries/courier/get-courier-public.query.js';
import { GetCourierStatsQuery } from '@application/queries/courier/get-courier-stats.query.js';
import { ListCouriersQuery } from '@application/queries/courier/list-couriers.query.js';
import { GetDefaultCourierQuery } from '@application/queries/courier/get-default-courier.query.js';

import {
  CreateCourierHttpDTO,
  UpdateCourierHttpDTO,
  CourierReasonHttpDTO,
  ListCouriersHttpQueryDTO,
} from '../../dtos/requests/courier/courier.request.dto.js';
import type {
  CourierHttpResponseDTO,
  CourierPublicHttpResponseDTO,
  CourierListHttpResponseDTO,
  CourierStatsHttpResponseDTO,
  CourierInitiateHttpResponseDTO,
} from '../../dtos/responses/courier/courier.response.dto.js';

import { CourierControllerMapper } from '../../mappers/courier.controller.mapper.js';
import { CourierHttpValidator } from '../../validators/courier.validator.js';
import { CourierLoggingInterceptor } from '../../interceptors/courier-logging.interceptor.js';
import { CourierTimeoutInterceptor } from '../../interceptors/courier-timeout.interceptor.js';
import {
  ApiCreateCourier,
  ApiGetCourier,
  ApiListCouriers,
  ApiGetCourierStats,
  ApiCourierTransition,
  ApiCourierTag,
} from '../../swagger/courier.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiCourierTag()
@ApiBearerAuth('bearer')
@Controller('couriers')
@UseGuards(JwtAuthGuard)
@UseInterceptors(CourierLoggingInterceptor, CourierTimeoutInterceptor)
export class CourierController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  // ═══ Create ═══
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateCourier()
  async create(
    @Body() body: CreateCourierHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<CourierInitiateHttpResponseDTO> {
    CourierHttpValidator.validateCreate(body);
    const appDto = CourierControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateCourierCommand,
      { readonly id: string; readonly code: string; readonly status: string }
    >(new CreateCourierCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      courierId: result.id,
      code: result.code,
      status: result.status,
    };
  }

  // ═══ Update ═══
  @Patch(':id')
  @ApiCourierTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCourierHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<CourierHttpResponseDTO> {
    CourierHttpValidator.validateUpdate({ courierId: id, ...body });
    const appDto = CourierControllerMapper.toUpdateAppDto(id, body);
    const result = await this.commandBus.execute<
      UpdateCourierCommand,
      Parameters<typeof CourierControllerMapper.toHttpResponse>[0]
    >(new UpdateCourierCommand(appDto, this.getActorId(user)));
    return CourierControllerMapper.toHttpResponse(result);
  }

  // ═══ State transitions ═══
  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiCourierTransition('activate')
  async activate(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<CourierHttpResponseDTO> {
    const result = await this.commandBus.execute<
      ActivateCourierCommand,
      Parameters<typeof CourierControllerMapper.toHttpResponse>[0]
    >(new ActivateCourierCommand({ courierId: id } as never, this.getActorId(user)));
    return CourierControllerMapper.toHttpResponse(result);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiCourierTransition('deactivate')
  async deactivate(
    @Param('id') id: string,
    @Body() body: CourierReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<CourierHttpResponseDTO> {
    const result = await this.commandBus.execute<
      DeactivateCourierCommand,
      Parameters<typeof CourierControllerMapper.toHttpResponse>[0]
    >(new DeactivateCourierCommand({ courierId: id, reason: body.reason } as never, this.getActorId(user)));
    return CourierControllerMapper.toHttpResponse(result);
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.OK)
  @ApiCourierTransition('suspend')
  async suspend(
    @Param('id') id: string,
    @Body() body: CourierReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<CourierHttpResponseDTO> {
    const result = await this.commandBus.execute<
      SuspendCourierCommand,
      Parameters<typeof CourierControllerMapper.toHttpResponse>[0]
    >(new SuspendCourierCommand({ courierId: id, reason: body.reason } as never, this.getActorId(user)));
    return CourierControllerMapper.toHttpResponse(result);
  }

  @Post(':id/terminate')
  @HttpCode(HttpStatus.OK)
  @ApiCourierTransition('terminate')
  async terminate(
    @Param('id') id: string,
    @Body() body: CourierReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<CourierHttpResponseDTO> {
    const result = await this.commandBus.execute<
      TerminateCourierCommand,
      Parameters<typeof CourierControllerMapper.toHttpResponse>[0]
    >(new TerminateCourierCommand({ courierId: id, reason: body.reason } as never, this.getActorId(user)));
    return CourierControllerMapper.toHttpResponse(result);
  }

  // ═══ Read ═══
  @Get('default')
  @ApiGetCourier()
  async getDefault(): Promise<CourierHttpResponseDTO | null> {
    const appDto = await this.queryBus.execute<
      GetDefaultCourierQuery,
      Parameters<typeof CourierControllerMapper.toHttpResponse>[0] | null
    >(new GetDefaultCourierQuery());
    return appDto ? CourierControllerMapper.toHttpResponse(appDto) : null;
  }

  @Get('stats')
  @ApiGetCourierStats()
  async getStats(): Promise<CourierStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetCourierStatsQuery,
      Parameters<typeof CourierControllerMapper.toStatsHttp>[0]
    >(new GetCourierStatsQuery());
    return CourierControllerMapper.toStatsHttp(appDto);
  }

  @Get('code/:code')
  @ApiGetCourier()
  async getByCode(@Param('code') code: string): Promise<CourierHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetCourierByCodeQuery,
      Parameters<typeof CourierControllerMapper.toHttpResponse>[0]
    >(new GetCourierByCodeQuery(code));
    return CourierControllerMapper.toHttpResponse(appDto);
  }

  @Get('public/:id')
  @ApiGetCourier()
  async getPublic(@Param('id') id: string): Promise<CourierPublicHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetCourierPublicQuery,
      Parameters<typeof CourierControllerMapper.toPublicHttpResponse>[0]
    >(new GetCourierPublicQuery(id));
    return CourierControllerMapper.toPublicHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetCourier()
  async getById(@Param('id') id: string): Promise<CourierHttpResponseDTO> {
    const appDto = await this.queryBus.execute<
      GetCourierQuery,
      Parameters<typeof CourierControllerMapper.toHttpResponse>[0]
    >(new GetCourierQuery(id));
    return CourierControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListCouriers()
  async list(@Query() query: ListCouriersHttpQueryDTO): Promise<CourierListHttpResponseDTO> {
    const options = CourierControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<
      ListCouriersQuery,
      Parameters<typeof CourierControllerMapper.toListHttp>[0]
    >(new ListCouriersQuery(options as never));
    return CourierControllerMapper.toListHttp(appDto);
  }
}
