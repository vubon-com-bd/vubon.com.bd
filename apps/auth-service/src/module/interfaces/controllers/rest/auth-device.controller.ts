/**
 * AuthDeviceController
 * @module auth-service/interfaces/controllers/rest
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

import { GetAuthDeviceQuery } from '../../../application/queries/auth/get-auth-device.query';
import { ListAuthDevicesQuery } from '../../../application/queries/auth/list-auth-devices.query';
import type { UserId } from '@vubon/shared-types/common';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Auth Devices')
@Controller('auth/devices')
@UseGuards(JwtAuthGuard)
export class AuthDeviceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async listMine(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(
      new ListAuthDevicesQuery(user.id as UserId),
    );
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetAuthDeviceQuery(id));
  }
}
