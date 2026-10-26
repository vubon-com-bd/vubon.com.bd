/**
 * DeviceController
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
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { RegisterDeviceCommand } from '@application/commands/device/register-device.command.js';
import { UpdateDeviceTokenCommand } from '@application/commands/device/update-device-token.command.js';
import { UnregisterDeviceCommand } from '@application/commands/device/unregister-device.command.js';
import { GetDeviceQuery } from '@application/queries/device/get-device.query.js';
import { ListDevicesQuery } from '@application/queries/device/list-devices.query.js';

import { DeviceOwnerGuard } from '@interfaces/guards/device-owner.guard.js';

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
  async register(
    @Body() body: unknown,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RegisterDeviceCommand({ ...(body as object), userId: user.userId } as never, user.userId),
    );
  }

  @Patch(':id/token')
  @UseGuards(DeviceOwnerGuard)
  async updateToken(
    @Param('id') id: string,
    @Body() body: unknown,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateDeviceTokenCommand({ ...(body as object), deviceId: id } as never, user.userId),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(DeviceOwnerGuard)
  async unregister(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(
      new UnregisterDeviceCommand({ deviceId: id }, user.userId),
    );
  }

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(
      new ListDevicesQuery({ page: 1, limit: 100, filter: { userId: user.userId } }),
    );
  }

  @Get(':id')
  @UseGuards(DeviceOwnerGuard)
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetDeviceQuery(id));
  }
}
