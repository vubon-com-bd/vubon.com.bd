/**
 * DriverController — REST endpoints
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

import { CreateDriverCommand } from '@application/commands/driver/create-driver.command.js';
import { UpdateDriverCommand } from '@application/commands/driver/update.command.js';
import { AssignVehicleDriverCommand } from '@application/commands/driver/assign-vehicle.command.js';
import { UnassignVehicleDriverCommand } from '@application/commands/driver/unassign-vehicle.command.js';
import { GoOnDutyDriverCommand } from '@application/commands/driver/go-on-duty.command.js';
import { GoOffDutyDriverCommand } from '@application/commands/driver/go-off-duty.command.js';
import { GoOnBreakDriverCommand } from '@application/commands/driver/go-on-break.command.js';
import { GoOnLeaveDriverCommand } from '@application/commands/driver/go-on-leave.command.js';
import { MarkAvailableDriverCommand } from '@application/commands/driver/mark-available.command.js';
import { SuspendDriverCommand } from '@application/commands/driver/suspend.command.js';
import { DeactivateDriverCommand } from '@application/commands/driver/deactivate.command.js';
import { CollectCashDriverCommand } from '@application/commands/driver/collect-cash.command.js';
import { DepositCashDriverCommand } from '@application/commands/driver/deposit-cash.command.js';

import { GetDriverQuery } from '@application/queries/driver/get-driver.query.js';
import { GetDriverByLicenseQuery } from '@application/queries/driver/get-driver-by-license.query.js';
import { GetDriverByPhoneQuery } from '@application/queries/driver/get-driver-by-phone.query.js';
import { GetDriverStatsQuery } from '@application/queries/driver/get-driver-stats.query.js';
import { ListDriversQuery } from '@application/queries/driver/list-drivers.query.js';
import { ListAvailableDriversQuery } from '@application/queries/driver/list-available-drivers.query.js';

import {
  CreateDriverHttpDTO,
  UpdateDriverHttpDTO,
  AssignVehicleHttpDTO,
  CashTransactionHttpDTO,
  DriverReasonHttpDTO,
  ListDriversHttpQueryDTO,
} from '../../dtos/requests/driver/driver.request.dto.js';
import type {
  DriverHttpResponseDTO,
  DriverListHttpResponseDTO,
  DriverStatsHttpResponseDTO,
  DriverInitiateHttpResponseDTO,
} from '../../dtos/responses/driver/driver.response.dto.js';

import { DriverControllerMapper } from '../../mappers/driver.controller.mapper.js';
import { DriverHttpValidator } from '../../validators/driver.validator.js';
import { DriverLoggingInterceptor } from '../../interceptors/driver-logging.interceptor.js';
import { DriverTimeoutInterceptor } from '../../interceptors/driver-timeout.interceptor.js';
import {
  ApiCreateDriver,
  ApiGetDriver,
  ApiListDrivers,
  ApiGetDriverStats,
  ApiDriverTransition,
  ApiDriverTag,
} from '../../swagger/driver.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiDriverTag()
@ApiBearerAuth('bearer')
@Controller('drivers')
@UseGuards(JwtAuthGuard)
@UseInterceptors(DriverLoggingInterceptor, DriverTimeoutInterceptor)
export class DriverController extends BaseController {
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
  @ApiCreateDriver()
  async create(
    @Body() body: CreateDriverHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DriverInitiateHttpResponseDTO> {
    DriverHttpValidator.validateCreate(body);
    const appDto = DriverControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateDriverCommand,
      { readonly id: string; readonly licenseNumber: string; readonly status: string }
    >(new CreateDriverCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      driverId: result.id,
      licenseNumber: result.licenseNumber,
      status: result.status,
    };
  }

  // ═══ Update ═══
  @Patch(':id')
  @ApiDriverTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateDriverHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DriverHttpResponseDTO> {
    DriverHttpValidator.validateUpdate({ driverId: id, ...body });
    const appDto = DriverControllerMapper.toUpdateAppDto(id, body);
    const r = await this.commandBus.execute<UpdateDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new UpdateDriverCommand(appDto as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  // ═══ State transitions ═══
  @Post(':id/assign-vehicle')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('assign-vehicle')
  async assignVehicle(
    @Param('id') id: string,
    @Body() body: AssignVehicleHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DriverHttpResponseDTO> {
    const appDto = DriverControllerMapper.toAssignVehicleAppDto(id, body);
    const r = await this.commandBus.execute<AssignVehicleDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new AssignVehicleDriverCommand(appDto as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  @Post(':id/unassign-vehicle')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('unassign-vehicle')
  async unassignVehicle(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<DriverHttpResponseDTO> {
    const r = await this.commandBus.execute<UnassignVehicleDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new UnassignVehicleDriverCommand({ driverId: id } as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  @Post(':id/go-on-duty')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('go-on-duty')
  async goOnDuty(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<DriverHttpResponseDTO> {
    const r = await this.commandBus.execute<GoOnDutyDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new GoOnDutyDriverCommand({ driverId: id } as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  @Post(':id/go-off-duty')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('go-off-duty')
  async goOffDuty(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<DriverHttpResponseDTO> {
    const r = await this.commandBus.execute<GoOffDutyDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new GoOffDutyDriverCommand({ driverId: id } as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  @Post(':id/go-on-break')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('go-on-break')
  async goOnBreak(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<DriverHttpResponseDTO> {
    const r = await this.commandBus.execute<GoOnBreakDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new GoOnBreakDriverCommand({ driverId: id } as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  @Post(':id/go-on-leave')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('go-on-leave')
  async goOnLeave(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<DriverHttpResponseDTO> {
    const r = await this.commandBus.execute<GoOnLeaveDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new GoOnLeaveDriverCommand({ driverId: id } as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  @Post(':id/mark-available')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('mark-available')
  async markAvailable(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<DriverHttpResponseDTO> {
    const r = await this.commandBus.execute<MarkAvailableDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new MarkAvailableDriverCommand({ driverId: id } as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  @Post(':id/suspend')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('suspend')
  async suspend(
    @Param('id') id: string,
    @Body() body: DriverReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DriverHttpResponseDTO> {
    const appDto = DriverControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<SuspendDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new SuspendDriverCommand(appDto as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('deactivate')
  async deactivate(@Param('id') id: string, @CurrentUser() user: CurrentUserLike): Promise<DriverHttpResponseDTO> {
    const r = await this.commandBus.execute<DeactivateDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new DeactivateDriverCommand({ driverId: id } as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  @Post(':id/collect-cash')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('collect-cash')
  async collectCash(
    @Param('id') id: string,
    @Body() body: CashTransactionHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DriverHttpResponseDTO> {
    const appDto = DriverControllerMapper.toCashAppDto(id, body);
    const r = await this.commandBus.execute<CollectCashDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new CollectCashDriverCommand(appDto as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  @Post(':id/deposit-cash')
  @HttpCode(HttpStatus.OK)
  @ApiDriverTransition('deposit-cash')
  async depositCash(
    @Param('id') id: string,
    @Body() body: CashTransactionHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<DriverHttpResponseDTO> {
    const appDto = DriverControllerMapper.toCashAppDto(id, body);
    const r = await this.commandBus.execute<DepositCashDriverCommand, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new DepositCashDriverCommand(appDto as never, this.getActorId(user))
    );
    return DriverControllerMapper.toHttpResponse(r);
  }

  // ═══ Read ═══
  @Get('stats')
  @ApiGetDriverStats()
  async getStats(): Promise<DriverStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetDriverStatsQuery, Parameters<typeof DriverControllerMapper.toStatsHttp>[0]>(
      new GetDriverStatsQuery()
    );
    return DriverControllerMapper.toStatsHttp(appDto);
  }

  @Get('available')
  @ApiListDrivers()
  async listAvailable(): Promise<DriverListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListAvailableDriversQuery, Parameters<typeof DriverControllerMapper.toListHttp>[0]>(
      new ListAvailableDriversQuery()
    );
    return DriverControllerMapper.toListHttp(appDto);
  }

  @Get('license/:licenseNumber')
  @ApiGetDriver()
  async getByLicense(@Param('licenseNumber') licenseNumber: string): Promise<DriverHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetDriverByLicenseQuery, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new GetDriverByLicenseQuery(licenseNumber)
    );
    return DriverControllerMapper.toHttpResponse(appDto);
  }

  @Get('phone/:phone')
  @ApiGetDriver()
  async getByPhone(@Param('phone') phone: string): Promise<DriverHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetDriverByPhoneQuery, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new GetDriverByPhoneQuery(phone)
    );
    return DriverControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetDriver()
  async getById(@Param('id') id: string): Promise<DriverHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetDriverQuery, Parameters<typeof DriverControllerMapper.toHttpResponse>[0]>(
      new GetDriverQuery(id)
    );
    return DriverControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListDrivers()
  async list(@Query() query: ListDriversHttpQueryDTO): Promise<DriverListHttpResponseDTO> {
    const options = DriverControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListDriversQuery, Parameters<typeof DriverControllerMapper.toListHttp>[0]>(
      new ListDriversQuery(options as never)
    );
    return DriverControllerMapper.toListHttp(appDto);
  }
}
