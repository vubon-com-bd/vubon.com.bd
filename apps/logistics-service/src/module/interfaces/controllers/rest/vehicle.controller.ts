/**
 * VehicleController — REST endpoints
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

import { CreateVehicleCommand } from '@application/commands/vehicle/create-vehicle.command.js';
import { UpdateVehicleCommand } from '@application/commands/vehicle/update.command.js';
import { AssignVehicleCommand } from '@application/commands/vehicle/assign.command.js';
import { AssignDriverVehicleCommand } from '@application/commands/vehicle/assign-driver.command.js';
import { UnassignDriverVehicleCommand } from '@application/commands/vehicle/unassign-driver.command.js';
import { ReleaseVehicleCommand } from '@application/commands/vehicle/release.command.js';
import { StartMaintenanceVehicleCommand } from '@application/commands/vehicle/start-maintenance.command.js';
import { CompleteMaintenanceVehicleCommand } from '@application/commands/vehicle/complete-maintenance.command.js';
import { RetireVehicleCommand } from '@application/commands/vehicle/retire.command.js';

import { GetVehicleQuery } from '@application/queries/vehicle/get-vehicle.query.js';
import { GetVehicleByRegistrationQuery } from '@application/queries/vehicle/get-vehicle-by-registration.query.js';
import { GetVehicleStatsQuery } from '@application/queries/vehicle/get-vehicle-stats.query.js';
import { ListVehiclesQuery } from '@application/queries/vehicle/list-vehicles.query.js';
import { ListAvailableVehiclesQuery } from '@application/queries/vehicle/list-available-vehicles.query.js';

import {
  CreateVehicleHttpDTO,
  UpdateVehicleHttpDTO,
  AssignDriverHttpDTO,
  VehicleReasonHttpDTO,
  ListVehiclesHttpQueryDTO,
} from '../../dtos/requests/vehicle/vehicle.request.dto.js';
import type {
  VehicleHttpResponseDTO,
  VehicleListHttpResponseDTO,
  VehicleStatsHttpResponseDTO,
  VehicleInitiateHttpResponseDTO,
} from '../../dtos/responses/vehicle/vehicle.response.dto.js';

import { VehicleControllerMapper } from '../../mappers/vehicle.controller.mapper.js';
import { VehicleHttpValidator } from '../../validators/vehicle.validator.js';
import { VehicleLoggingInterceptor } from '../../interceptors/vehicle-logging.interceptor.js';
import { VehicleTimeoutInterceptor } from '../../interceptors/vehicle-timeout.interceptor.js';
import {
  ApiCreateVehicle,
  ApiGetVehicle,
  ApiListVehicles,
  ApiGetVehicleStats,
  ApiVehicleTransition,
  ApiVehicleTag,
} from '../../swagger/vehicle.swagger.js';

interface CurrentUserLike {
  readonly sub?: string;
  readonly userId?: string;
}

@ApiVehicleTag()
@ApiBearerAuth('bearer')
@Controller('vehicles')
@UseGuards(JwtAuthGuard)
@UseInterceptors(VehicleLoggingInterceptor, VehicleTimeoutInterceptor)
export class VehicleController extends BaseController {
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
  @ApiCreateVehicle()
  async create(
    @Body() body: CreateVehicleHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<VehicleInitiateHttpResponseDTO> {
    VehicleHttpValidator.validateCreate(body);
    const appDto = VehicleControllerMapper.toCreateAppDto(body);
    const result = await this.commandBus.execute<
      CreateVehicleCommand,
      { readonly id: string; readonly registrationNumber: string; readonly status: string }
    >(new CreateVehicleCommand(appDto, this.getActorId(user)));

    return {
      success: true,
      vehicleId: result.id,
      registrationNumber: result.registrationNumber,
      status: result.status,
    };
  }

  // ═══ Update ═══
  @Patch(':id')
  @ApiVehicleTransition('update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateVehicleHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<VehicleHttpResponseDTO> {
    VehicleHttpValidator.validateUpdate({ vehicleId: id, ...body });
    const appDto = VehicleControllerMapper.toUpdateAppDto(id, body);
    const r = await this.commandBus.execute<UpdateVehicleCommand, Parameters<typeof VehicleControllerMapper.toHttpResponse>[0]>(
      new UpdateVehicleCommand(appDto as never, this.getActorId(user))
    );
    return VehicleControllerMapper.toHttpResponse(r);
  }

  // ═══ State transitions ═══
  @Post(':id/assign')
  @HttpCode(HttpStatus.OK)
  @ApiVehicleTransition('assign')
  async assign(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<VehicleHttpResponseDTO> {
    const r = await this.commandBus.execute<AssignVehicleCommand, Parameters<typeof VehicleControllerMapper.toHttpResponse>[0]>(
      new AssignVehicleCommand({ vehicleId: id } as never, this.getActorId(user))
    );
    return VehicleControllerMapper.toHttpResponse(r);
  }

  @Post(':id/assign-driver')
  @HttpCode(HttpStatus.OK)
  @ApiVehicleTransition('assign-driver')
  async assignDriver(
    @Param('id') id: string,
    @Body() body: AssignDriverHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<VehicleHttpResponseDTO> {
    const appDto = VehicleControllerMapper.toAssignDriverAppDto(id, body);
    const r = await this.commandBus.execute<AssignDriverVehicleCommand, Parameters<typeof VehicleControllerMapper.toHttpResponse>[0]>(
      new AssignDriverVehicleCommand(appDto as never, this.getActorId(user))
    );
    return VehicleControllerMapper.toHttpResponse(r);
  }

  @Post(':id/unassign-driver')
  @HttpCode(HttpStatus.OK)
  @ApiVehicleTransition('unassign-driver')
  async unassignDriver(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<VehicleHttpResponseDTO> {
    const r = await this.commandBus.execute<UnassignDriverVehicleCommand, Parameters<typeof VehicleControllerMapper.toHttpResponse>[0]>(
      new UnassignDriverVehicleCommand({ vehicleId: id } as never, this.getActorId(user))
    );
    return VehicleControllerMapper.toHttpResponse(r);
  }

  @Post(':id/release')
  @HttpCode(HttpStatus.OK)
  @ApiVehicleTransition('release')
  async release(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<VehicleHttpResponseDTO> {
    const r = await this.commandBus.execute<ReleaseVehicleCommand, Parameters<typeof VehicleControllerMapper.toHttpResponse>[0]>(
      new ReleaseVehicleCommand({ vehicleId: id } as never, this.getActorId(user))
    );
    return VehicleControllerMapper.toHttpResponse(r);
  }

  @Post(':id/maintenance/start')
  @HttpCode(HttpStatus.OK)
  @ApiVehicleTransition('start-maintenance')
  async startMaintenance(
    @Param('id') id: string,
    @Body() body: VehicleReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<VehicleHttpResponseDTO> {
    const appDto = VehicleControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<StartMaintenanceVehicleCommand, Parameters<typeof VehicleControllerMapper.toHttpResponse>[0]>(
      new StartMaintenanceVehicleCommand(appDto as never, this.getActorId(user))
    );
    return VehicleControllerMapper.toHttpResponse(r);
  }

  @Post(':id/maintenance/complete')
  @HttpCode(HttpStatus.OK)
  @ApiVehicleTransition('complete-maintenance')
  async completeMaintenance(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<VehicleHttpResponseDTO> {
    const r = await this.commandBus.execute<CompleteMaintenanceVehicleCommand, Parameters<typeof VehicleControllerMapper.toHttpResponse>[0]>(
      new CompleteMaintenanceVehicleCommand({ vehicleId: id } as never, this.getActorId(user))
    );
    return VehicleControllerMapper.toHttpResponse(r);
  }

  @Post(':id/retire')
  @HttpCode(HttpStatus.OK)
  @ApiVehicleTransition('retire')
  async retire(
    @Param('id') id: string,
    @Body() body: VehicleReasonHttpDTO,
    @CurrentUser() user: CurrentUserLike,
  ): Promise<VehicleHttpResponseDTO> {
    const appDto = VehicleControllerMapper.toReasonAppDto(id, body);
    const r = await this.commandBus.execute<RetireVehicleCommand, Parameters<typeof VehicleControllerMapper.toHttpResponse>[0]>(
      new RetireVehicleCommand(appDto as never, this.getActorId(user))
    );
    return VehicleControllerMapper.toHttpResponse(r);
  }

  // ═══ Read ═══
  @Get('stats')
  @ApiGetVehicleStats()
  async getStats(): Promise<VehicleStatsHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetVehicleStatsQuery, Parameters<typeof VehicleControllerMapper.toStatsHttp>[0]>(
      new GetVehicleStatsQuery()
    );
    return VehicleControllerMapper.toStatsHttp(appDto);
  }

  @Get('available')
  @ApiListVehicles()
  async listAvailable(): Promise<VehicleListHttpResponseDTO> {
    const appDto = await this.queryBus.execute<ListAvailableVehiclesQuery, Parameters<typeof VehicleControllerMapper.toListHttp>[0]>(
      new ListAvailableVehiclesQuery()
    );
    return VehicleControllerMapper.toListHttp(appDto);
  }

  @Get('registration/:registrationNumber')
  @ApiGetVehicle()
  async getByRegistration(@Param('registrationNumber') registrationNumber: string): Promise<VehicleHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetVehicleByRegistrationQuery, Parameters<typeof VehicleControllerMapper.toHttpResponse>[0]>(
      new GetVehicleByRegistrationQuery(registrationNumber)
    );
    return VehicleControllerMapper.toHttpResponse(appDto);
  }

  @Get(':id')
  @ApiGetVehicle()
  async getById(@Param('id') id: string): Promise<VehicleHttpResponseDTO> {
    const appDto = await this.queryBus.execute<GetVehicleQuery, Parameters<typeof VehicleControllerMapper.toHttpResponse>[0]>(
      new GetVehicleQuery(id)
    );
    return VehicleControllerMapper.toHttpResponse(appDto);
  }

  @Get()
  @ApiListVehicles()
  async list(@Query() query: ListVehiclesHttpQueryDTO): Promise<VehicleListHttpResponseDTO> {
    const options = VehicleControllerMapper.toListOptions(query);
    const appDto = await this.queryBus.execute<ListVehiclesQuery, Parameters<typeof VehicleControllerMapper.toListHttp>[0]>(
      new ListVehiclesQuery(options as never)
    );
    return VehicleControllerMapper.toListHttp(appDto);
  }
}
