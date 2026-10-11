/**
 * DeviceController — REST endpoints for device registration
 * @module notification-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { RegisterDeviceCommand } from '../../../application/commands/device/register-device.command.js';
import { UpdateDeviceCommand } from '../../../application/commands/device/update-device.command.js';
import { RefreshDeviceTokenCommand } from '../../../application/commands/device/refresh-device-token.command.js';
import { RemoveDeviceCommand } from '../../../application/commands/device/remove-device.command.js';
import { BlockDeviceCommand } from '../../../application/commands/device/block-device.command.js';

import { GetDeviceQuery } from '../../../application/queries/device/get-device.query.js';
import { ListDevicesQuery } from '../../../application/queries/device/list-devices.query.js';
import { ListActiveDevicesQuery } from '../../../application/queries/device/list-active-devices.query.js';

import {
  RegisterDeviceHttpDTO,
  UpdateDeviceHttpDTO,
  RefreshDeviceTokenHttpDTO,
  RemoveDeviceHttpDTO,
  BlockDeviceHttpDTO,
  ListDevicesHttpQueryDTO,
} from '../../dtos/requests/device/device.http-dto.js';
import { DeviceControllerMapper } from '../../mappers/device.controller.mapper.js';

@ApiTags('devices')
@ApiBearerAuth('bearer')
@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DeviceController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a device' })
  async register(@Body() dto: RegisterDeviceHttpDTO): Promise<unknown> {
    return this.commandBus.execute(
      new RegisterDeviceCommand(DeviceControllerMapper.toRegisterAppDto(dto)),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List devices (paginated)' })
  async list(
    @Query() q: ListDevicesHttpQueryDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListDevicesQuery(DeviceControllerMapper.toListAppDto(q, user.userId)),
    );
  }

  @Get('active')
  @ApiOperation({ summary: 'List active devices for current user' })
  async listActive(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListActiveDevicesQuery(user.userId));
  }

  @Get(':deviceId')
  @ApiOperation({ summary: 'Get device by id' })
  async getById(@Param('deviceId') deviceId: string): Promise<unknown> {
    return this.queryBus.execute(new GetDeviceQuery(deviceId));
  }

  @Patch(':deviceId')
  @ApiOperation({ summary: 'Update a device' })
  async update(
    @Param('deviceId') deviceId: string,
    @Body() dto: UpdateDeviceHttpDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateDeviceCommand(DeviceControllerMapper.toUpdateAppDto(deviceId, dto)),
    );
  }

  @Post(':deviceId/refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh device push token' })
  async refreshToken(
    @Param('deviceId') deviceId: string,
    @Body() dto: RefreshDeviceTokenHttpDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RefreshDeviceTokenCommand(DeviceControllerMapper.toRefreshAppDto(deviceId, dto)),
    );
  }

  @Post(':deviceId/block')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Block a device' })
  async block(
    @Param('deviceId') deviceId: string,
    @Body() dto: BlockDeviceHttpDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new BlockDeviceCommand(DeviceControllerMapper.toBlockAppDto(deviceId, dto)),
    );
  }

  @Delete(':deviceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove/unregister a device' })
  async remove(
    @Param('deviceId') deviceId: string,
    @Query() dto: RemoveDeviceHttpDTO,
  ): Promise<void> {
    await this.commandBus.execute(
      new RemoveDeviceCommand(DeviceControllerMapper.toRemoveAppDto(deviceId, dto)),
    );
  }
}
