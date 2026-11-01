/**
 * ShippingMethodController — REST endpoints
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

import { CreateShippingMethodCommand } from '@application/commands/shipping-method/create-shipping-method.command.js';
import { UpdateShippingMethodCommand } from '@application/commands/shipping-method/update.command.js';
import { ActivateShippingMethodCommand } from '@application/commands/shipping-method/activate.command.js';
import { DeactivateShippingMethodCommand } from '@application/commands/shipping-method/deactivate.command.js';
import { SuspendShippingMethodCommand } from '@application/commands/shipping-method/suspend.command.js';

import { GetShippingMethodQuery } from '@application/queries/shipping-method/get-shipping-method.query.js';
import { GetShippingMethodByCodeQuery } from '@application/queries/shipping-method/get-shipping-method-by-code.query.js';
import { GetShippingMethodStatsQuery } from '@application/queries/shipping-method/get-shipping-method-stats.query.js';
import { ListShippingMethodsQuery } from '@application/queries/shipping-method/list-shipping-methods.query.js';
import { GetDefaultShippingMethodQuery } from '@application/queries/shipping-method/get-default-shipping-method.query.js';
import { ListUsableShippingMethodsQuery } from '@application/queries/shipping-method/list-usable-shipping-methods.query.js';

import {
  CreateShippingMethodHttpDTO,
  UpdateShippingMethodHttpDTO,
  ShippingMethodReasonHttpDTO,
  ListShippingMethodsHttpQueryDTO,
} from '../../dtos/requests/shipping-method/shipping-method.request.dto.js';
import type {
  ShippingMethodHttpResponseDTO,
  ShippingMethodListHttpResponseDTO,
  ShippingMethodStatsHttpResponseDTO,
  ShippingMethodInitiateHttpResponseDTO,
} from '../../dtos/responses/shipping-method/shipping-method.response.dto.js';

import { ShippingMethodControllerMapper } from '../../mappers/shipping-method.controller.mapper.js';
import { ShippingMethodHttpValidator } from '../../validators/shipping-method.validator.js';
import { ShippingMethodLoggingInterceptor } from '../../interceptors/shipping-method-logging.interceptor.js';
import { ShippingMethodTimeoutInterceptor } from '../../interceptors/shipping-method-timeout.interceptor.js';
import {
  ApiCreateShippingMethod,
  ApiGetShippingMethod,
  ApiListShippingMethods,
  ApiGetShippingMethodStats,
  ApiShippingMethodTransition,
  ApiShippingMethodTag,
} from '../../swagger/shipping-method.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiShippingMethodTag()
@ApiBearerAuth('bearer')
@Controller('shipping-methods')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ShippingMethodLoggingInterceptor, ShippingMethodTimeoutInterceptor)
export class ShippingMethodController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateShippingMethod()
  async create(
    @Body() body: CreateShippingMethodHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShippingMethodInitiateHttpResponseDTO> {
    ShippingMethodHttpValidator.validateCreate(body);
    const appDto = ShippingMethodControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateShippingMethodCommand,
      { readonly id: string; readonly code: string; readonly status: string }
    >(new CreateShippingMethodCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      shippingMethodId: result.id,
      code: result.code,
      status: result.status,
    };
  }

  @Patch(':id')
  @ApiShippingMethodTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateShippingMethodHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShippingMethodHttpResponseDTO> {
    ShippingMethodHttpValidator.validateUpdate({ shippingMethodId: id, ...body });
    const appDto = ShippingMethodControllerMapper.toUpdateAppDto(id, body);
    const r = await this.commandBus.execute<UpdateShippingMethodCommand, Parameters<typeof ShippingMethodControllerMapper.toHttpResponse>[0]>(
      new UpdateShippingMethodCommand(appDto as never, this.getActorId(user))
    );
    return ShippingMethodControllerMapper.toHttpResponse(r);
  }

  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiShippingMethodTransition('activate')
  async activate(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<ShippingMethodHttpResponseDTO> {
    const r = await this.commandBus.execute<ActivateShippingMethodCommand, Parameters<typeof ShippingMethodControllerMapper.toHttpResponse>[0]>(
      new ActivateShippingMethodCommand({ shippingMethodId: id } as never, this.getActorId(user))
    );
    return ShippingMethodControllerMapper.toHttpResponse(r);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiShippingMethodTransition('deactivate')
  async deactivate(
    @Param('id') id: string,
    @Body() body: ShippingMethodReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShippingMethodHttpResponseDTO> {
    const appDto = ShippingMethodControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<DeactivateShippingMethodCommand, Parameters<typeof ShippingMethodControllerMapper.toHttpResponse>[0]>(
      new DeactivateShippingMethodCommand(appDto as never, this.getActorId(user))
    );
    return ShippingMethodControllerMapper.toHttpResponse(r);
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.OK)
  @ApiShippingMethodTransition('suspend')
  async suspend(
    @Param('id') id: string,
    @Body() body: ShippingMethodReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<ShippingMethodHttpResponseDTO> {
    const appDto = ShippingMethodControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<SuspendShippingMethodCommand, Parameters<typeof ShippingMethodControllerMapper.toHttpResponse>[0]>(
      new SuspendShippingMethodCommand(appDto as never, this.getActorId(user))
    );
    return ShippingMethodControllerMapper.toHttpResponse(r);
  }

  @Get('stats')
  @ApiGetShippingMethodStats()
  async getStats(): Promise<ShippingMethodStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetShippingMethodStatsQuery, Parameters<typeof ShippingMethodControllerMapper.toStatsHttp>[0]>(
      new GetShippingMethodStatsQuery()
    );
    return ShippingMethodControllerMapper.toStatsHttp(appDto);
  }

  @Get('default')
  @ApiGetShippingMethod()
  async getDefault(): Promise<ShippingMethodHttpResponseDTO | null> {
    const appDto = await this.queryBus.execute<GetDefaultShippingMethodQuery, Parameters<typeof ShippingMethodControllerMapper.toHttpResponse>[0] | null>(
      new GetDefaultShippingMethodQuery()
    );
    return appDto ? ShippingMethodControllerMapper.toHttpResponse(appDto) : null;
  }

  @Get('usable')
  @ApiListShippingMethods()
  async listUsable(): Promise<ShippingMethodListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListUsableShippingMethodsQuery, Parameters<typeof ShippingMethodControllerMapper.toListHttp>[0]>(
      new ListUsableShippingMethodsQuery()
    );
    return ShippingMethodControllerMapper.toListHttp(appDto);
  }

  @Get('code/:code')
  @ApiGetShippingMethod()
  async getByCode(@Param('code') code: string): Promise<ShippingMethodHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetShippingMethodByCodeQuery, Parameters<typeof ShippingMethodControllerMapper.toHttpResponse>[0]>(
      new GetShippingMethodByCodeQuery(code)
    );
    return ShippingMethodControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetShippingMethod()
  async getById(@Param('id') id: string): Promise<ShippingMethodHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetShippingMethodQuery, Parameters<typeof ShippingMethodControllerMapper.toHttpResponse>[0]>(
      new GetShippingMethodQuery(id)
    );
    return ShippingMethodControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListShippingMethods()
  async list(@Query() query: ListShippingMethodsHttpQueryDTO): Promise<ShippingMethodListHttpResponseDTO> {
    const options = ShippingMethodControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListShippingMethodsQuery, Parameters<typeof ShippingMethodControllerMapper.toListHttp>[0]>(
      new ListShippingMethodsQuery(options as never)
    );
    return ShippingMethodControllerMapper.toListHttp(appDto);
  }
}
