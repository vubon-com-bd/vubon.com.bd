/**
 * PackagingController — REST endpoints
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

import { CreatePackagingCommand } from '@application/commands/packaging/create-packaging.command.js';
import { UpdatePackagingCommand } from '@application/commands/packaging/update.command.js';
import { UpdateSizePackagingCommand } from '@application/commands/packaging/update-size.command.js';
import { AddStockPackagingCommand } from '@application/commands/packaging/add-stock.command.js';
import { ConsumeStockPackagingCommand } from '@application/commands/packaging/consume-stock.command.js';
import { ActivatePackagingCommand } from '@application/commands/packaging/activate.command.js';
import { DeactivatePackagingCommand } from '@application/commands/packaging/deactivate.command.js';
import { DiscontinuePackagingCommand } from '@application/commands/packaging/discontinue.command.js';

import { GetPackagingQuery } from '@application/queries/packaging/get-packaging.query.js';
import { GetPackagingByCodeQuery } from '@application/queries/packaging/get-packaging-by-code.query.js';
import { GetPackagingStatsQuery } from '@application/queries/packaging/get-packaging-stats.query.js';
import { ListPackagingsQuery } from '@application/queries/packaging/list-packagings.query.js';
import { ListUsablePackagingsQuery } from '@application/queries/packaging/list-usable-packagings.query.js';
import { ListOutOfStockPackagingsQuery } from '@application/queries/packaging/list-out-of-stock-packagings.query.js';
import { GetDefaultPackagingQuery } from '@application/queries/packaging/get-default-packaging.query.js';

import {
  CreatePackagingHttpDTO,
  UpdatePackagingHttpDTO,
  UpdateSizeHttpDTO,
  AddStockHttpDTO,
  ConsumeStockHttpDTO,
  PackagingReasonHttpDTO,
  ListPackagingsHttpQueryDTO,
} from '../../dtos/requests/packaging/packaging.request.dto.js';
import type {
  PackagingHttpResponseDTO,
  PackagingListHttpResponseDTO,
  PackagingStatsHttpResponseDTO,
  PackagingInitiateHttpResponseDTO,
} from '../../dtos/responses/packaging/packaging.response.dto.js';

import { PackagingControllerMapper } from '../../mappers/packaging.controller.mapper.js';
import { PackagingHttpValidator } from '../../validators/packaging.validator.js';
import { PackagingLoggingInterceptor } from '../../interceptors/packaging-logging.interceptor.js';
import { PackagingTimeoutInterceptor } from '../../interceptors/packaging-timeout.interceptor.js';
import {
  ApiCreatePackaging,
  ApiGetPackaging,
  ApiListPackagings,
  ApiGetPackagingStats,
  ApiPackagingTransition,
  ApiPackagingTag,
} from '../../swagger/packaging.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiPackagingTag()
@ApiBearerAuth('bearer')
@Controller('packagings')
@UseGuards(JwtAuthGuard)
@UseInterceptors(PackagingLoggingInterceptor, PackagingTimeoutInterceptor)
export class PackagingController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  private getActorId(user: CurrentUserLike): string {
    return user.sub ?? user.userId ?? 'system';
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatePackaging()
  async create(
    @Body() body: CreatePackagingHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<PackagingInitiateHttpResponseDTO> {
    PackagingHttpValidator.validateCreate(body);
    const appDto = PackagingControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreatePackagingCommand,
      { readonly id: string; readonly code: string; readonly status: string }
    >(new CreatePackagingCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      packagingId: result.id,
      code: result.code,
      status: result.status,
    };
  }

  @Patch(':id')
  @ApiPackagingTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePackagingHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<PackagingHttpResponseDTO> {
    PackagingHttpValidator.validateUpdate({ packagingId: id, ...body });
    const appDto = PackagingControllerMapper.toUpdateAppDto(id, body);
    const r = await this.commandBus.execute<UpdatePackagingCommand, Parameters<typeof PackagingControllerMapper.toHttpResponse>[0]>(
      new UpdatePackagingCommand(appDto as never, this.getActorId(user))
    );
    return PackagingControllerMapper.toHttpResponse(r);
  }

  @Patch(':id/size')
  @ApiPackagingTransition('update-size')
  async updateSize(
    @Param('id') id: string,
    @Body() body: UpdateSizeHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<PackagingHttpResponseDTO> {
    const appDto = PackagingControllerMapper.toSizeAppDto(id, body);
    const r = await this.commandBus.execute<UpdateSizePackagingCommand, Parameters<typeof PackagingControllerMapper.toHttpResponse>[0]>(
      new UpdateSizePackagingCommand(appDto as never, this.getActorId(user))
    );
    return PackagingControllerMapper.toHttpResponse(r);
  }

  @Post(':id/add-stock')
  @HttpCode(HttpStatus.OK)
  @ApiPackagingTransition('add-stock')
  async addStock(
    @Param('id') id: string,
    @Body() body: AddStockHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<PackagingHttpResponseDTO> {
    const appDto = PackagingControllerMapper.toAddStockAppDto(id, body);
    const r = await this.commandBus.execute<AddStockPackagingCommand, Parameters<typeof PackagingControllerMapper.toHttpResponse>[0]>(
      new AddStockPackagingCommand(appDto as never, this.getActorId(user))
    );
    return PackagingControllerMapper.toHttpResponse(r);
  }

  @Post(':id/consume-stock')
  @HttpCode(HttpStatus.OK)
  @ApiPackagingTransition('consume-stock')
  async consumeStock(
    @Param('id') id: string,
    @Body() body: ConsumeStockHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<PackagingHttpResponseDTO> {
    const appDto = PackagingControllerMapper.toConsumeStockAppDto(id, body);
    const r = await this.commandBus.execute<ConsumeStockPackagingCommand, Parameters<typeof PackagingControllerMapper.toHttpResponse>[0]>(
      new ConsumeStockPackagingCommand(appDto as never, this.getActorId(user))
    );
    return PackagingControllerMapper.toHttpResponse(r);
  }

  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiPackagingTransition('activate')
  async activate(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<PackagingHttpResponseDTO> {
    const r = await this.commandBus.execute<ActivatePackagingCommand, Parameters<typeof PackagingControllerMapper.toHttpResponse>[0]>(
      new ActivatePackagingCommand({ packagingId: id } as never, this.getActorId(user))
    );
    return PackagingControllerMapper.toHttpResponse(r);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiPackagingTransition('deactivate')
  async deactivate(
    @Param('id') id: string,
    @Body() body: PackagingReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<PackagingHttpResponseDTO> {
    const appDto = PackagingControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<DeactivatePackagingCommand, Parameters<typeof PackagingControllerMapper.toHttpResponse>[0]>(
      new DeactivatePackagingCommand(appDto as never, this.getActorId(user))
    );
    return PackagingControllerMapper.toHttpResponse(r);
  }

  @Post(':id/discontinue')
  @HttpCode(HttpStatus.OK)
  @ApiPackagingTransition('discontinue')
  async discontinue(
    @Param('id') id: string,
    @Body() body: PackagingReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<PackagingHttpResponseDTO> {
    const appDto = PackagingControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<DiscontinuePackagingCommand, Parameters<typeof PackagingControllerMapper.toHttpResponse>[0]>(
      new DiscontinuePackagingCommand(appDto as never, this.getActorId(user))
    );
    return PackagingControllerMapper.toHttpResponse(r);
  }

  @Get('stats')
  @ApiGetPackagingStats()
  async getStats(): Promise<PackagingStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetPackagingStatsQuery, Parameters<typeof PackagingControllerMapper.toStatsHttp>[0]>(
      new GetPackagingStatsQuery()
    );
    return PackagingControllerMapper.toStatsHttp(appDto);
  }

  @Get('default')
  @ApiGetPackaging()
  async getDefault(): Promise<PackagingHttpResponseDTO | null> {
    const appDto = await this.queryBus.execute<GetDefaultPackagingQuery, Parameters<typeof PackagingControllerMapper.toHttpResponse>[0] | null>(
      new GetDefaultPackagingQuery()
    );
    return appDto ? PackagingControllerMapper.toHttpResponse(appDto) : null;
  }

  @Get('usable')
  @ApiListPackagings()
  async listUsable(): Promise<PackagingListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListUsablePackagingsQuery, Parameters<typeof PackagingControllerMapper.toListHttp>[0]>(
      new ListUsablePackagingsQuery()
    );
    return PackagingControllerMapper.toListHttp(appDto);
  }

  @Get('out-of-stock')
  @ApiListPackagings()
  async listOutOfStock(): Promise<PackagingListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListOutOfStockPackagingsQuery, Parameters<typeof PackagingControllerMapper.toListHttp>[0]>(
      new ListOutOfStockPackagingsQuery()
    );
    return PackagingControllerMapper.toListHttp(appDto);
  }

  @Get('code/:code')
  @ApiGetPackaging()
  async getByCode(@Param('code') code: string): Promise<PackagingHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetPackagingByCodeQuery, Parameters<typeof PackagingControllerMapper.toHttpResponse>[0]>(
      new GetPackagingByCodeQuery(code)
    );
    return PackagingControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetPackaging()
  async getById(@Param('id') id: string): Promise<PackagingHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetPackagingQuery, Parameters<typeof PackagingControllerMapper.toHttpResponse>[0]>(
      new GetPackagingQuery(id)
    );
    return PackagingControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListPackagings()
  async list(@Query() query: ListPackagingsHttpQueryDTO): Promise<PackagingListHttpResponseDTO> {
    const options = PackagingControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListPackagingsQuery, Parameters<typeof PackagingControllerMapper.toListHttp>[0]>(
      new ListPackagingsQuery(options as never)
    );
    return PackagingControllerMapper.toListHttp(appDto);
  }
}
