import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { RegisterDriverCommand } from '../../../application/commands/driver/register-driver.command.js';
import { UpdateDriverCommand } from '../../../application/commands/driver/update-driver.command.js';
import { SetDriverStatusCommand } from '../../../application/commands/driver/set-driver-status.command.js';
import { AssignDriverVehicleCommand } from '../../../application/commands/driver/assign-driver-vehicle.command.js';
import { ReceiveDriverCashCommand } from '../../../application/commands/driver/receive-driver-cash.command.js';
import { RemitDriverCashCommand } from '../../../application/commands/driver/remit-driver-cash.command.js';
import { GetDriverQuery } from '../../../application/queries/driver/get-driver.query.js';
import { ListDriversQuery } from '../../../application/queries/driver/list-drivers.query.js';
import {
  RegisterDriverHttpDTO, UpdateDriverHttpDTO, SetDriverStatusHttpDTO,
  AssignDriverVehicleHttpDTO, DriverCashHttpDTO, ListDriversHttpQueryDTO,
} from '../../dtos/requests/driver.request.dto.js';
import { DriverControllerMapper } from '../../mappers/driver.controller.mapper.js';
import type { DriverResponseDTO, DriverListResponseDTO } from '../../../application/dtos/responses/driver/driver-response.dto.js';

@ApiTags('drivers')
@ApiBearerAuth('bearer')
@Controller('logistics/drivers')
@UseGuards(JwtAuthGuard)
export class DriverController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Register a driver' })
  async register(@Body() dto: RegisterDriverHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DriverResponseDTO> {
    return this.commandBus.execute(new RegisterDriverCommand(DriverControllerMapper.toRegisterDto(dto), user.userId));
  }

  @Patch(':id') @ApiOperation({ summary: 'Update driver' })
  async update(@Param('id') id: string, @Body() dto: UpdateDriverHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DriverResponseDTO> {
    return this.commandBus.execute(new UpdateDriverCommand(DriverControllerMapper.toUpdateDto(id, dto), user.userId));
  }

  @Patch(':id/status') @ApiOperation({ summary: 'Set driver status' })
  async setStatus(@Param('id') id: string, @Body() dto: SetDriverStatusHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DriverResponseDTO> {
    return this.commandBus.execute(new SetDriverStatusCommand(DriverControllerMapper.toSetStatusDto(id, dto), user.userId));
  }

  @Patch(':id/vehicle') @ApiOperation({ summary: 'Assign vehicle to driver' })
  async assignVehicle(@Param('id') id: string, @Body() dto: AssignDriverVehicleHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DriverResponseDTO> {
    return this.commandBus.execute(new AssignDriverVehicleCommand(DriverControllerMapper.toAssignVehicleDto(id, dto), user.userId));
  }

  @Post(':id/cash/receive') @ApiOperation({ summary: 'Record cash received by driver (COD)' })
  async receiveCash(@Param('id') id: string, @Body() dto: DriverCashHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DriverResponseDTO> {
    return this.commandBus.execute(new ReceiveDriverCashCommand(DriverControllerMapper.toReceiveCashDto(id, dto), user.userId));
  }

  @Post(':id/cash/remit') @ApiOperation({ summary: 'Record cash remitted by driver' })
  async remitCash(@Param('id') id: string, @Body() dto: DriverCashHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DriverResponseDTO> {
    return this.commandBus.execute(new RemitDriverCashCommand(DriverControllerMapper.toRemitCashDto(id, dto), user.userId));
  }

  @Get() @ApiOperation({ summary: 'List drivers' })
  async list(@Query() q: ListDriversHttpQueryDTO): Promise<DriverListResponseDTO> {
    return this.queryBus.execute(new ListDriversQuery(DriverControllerMapper.toListOptions(q)));
  }

  @Get(':id') @ApiOperation({ summary: 'Get driver by id' })
  async getById(@Param('id') id: string): Promise<DriverResponseDTO> {
    return this.queryBus.execute(new GetDriverQuery(id));
  }
}
