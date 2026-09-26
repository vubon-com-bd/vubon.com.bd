import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { RegisterDeviceCommand } from '../../../application/commands/device/register-device.command';
import { UnregisterDeviceCommand } from '../../../application/commands/device/unregister-device.command';
import { ListDevicesQuery } from '../../../application/queries/device/list-devices.query';
import { GetDeviceQuery } from '../../../application/queries/device/get-device.query';

interface RegisterDeviceBody {
  deviceType: string;
  platform: string;
  token: string;
  fingerprint?: string;
}

@Controller('notifications/devices')
@UseGuards(JwtAuthGuard)
export class DeviceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: RegisterDeviceBody,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RegisterDeviceCommand(
        user.userId,
        body.deviceType,
        body.platform,
        body.token,
        body.fingerprint,
      ),
    );
  }

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListDevicesQuery(user.userId));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetDeviceQuery(id));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unregister(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new UnregisterDeviceCommand(id));
  }
}
