import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { ListAuthDevicesQuery } from '../../../application/queries/auth/list-auth-devices.query';
import { GetAuthDeviceQuery } from '../../../application/queries/auth/get-auth-device.query';

@ApiTags('Devices')
@Controller('auth/devices')
@UseGuards(JwtAuthGuard)
export class AuthDeviceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListAuthDevicesQuery(user.userId));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetAuthDeviceQuery(id));
  }
}
