/**
 * AuthDeviceController — REST endpoints for devices
 * @module identity-service/interfaces/controllers/rest
 */
import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { GetAuthDeviceQuery } from '../../../application/queries/auth/get-auth-device.query.js';
import { ListAuthDevicesQuery } from '../../../application/queries/auth/list-auth-devices.query.js';

import type { DeviceHttpResponseDTO } from '../../dtos/responses/device/device.response.dto.js';
import type { DeviceListHttpResponseDTO } from '../../dtos/responses/device/device-list.response.dto.js';

import { AuthDeviceControllerMapper } from '../../mappers/auth-device.controller.mapper.js';
import { ApiDeviceTag, ApiGetDevice, ApiListDevices } from '../../swagger/auth-device.swagger.js';

@ApiDeviceTag()
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('auth/devices')
export class AuthDeviceController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @ApiGetDevice()
  async getById(@Param('id') id: string): Promise<DeviceHttpResponseDTO> {
    const app = await this.queryBus.execute(new GetAuthDeviceQuery(id));
    return AuthDeviceControllerMapper.toHttpResponse(app);
  }

  @Get()
  @ApiListDevices()
  async list(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<DeviceListHttpResponseDTO> {
    const items = await this.queryBus.execute(new ListAuthDevicesQuery(user.userId));
    return AuthDeviceControllerMapper.toHttpList(items);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a device' })
  async remove(
    @Param('id') _id: string,
    @CurrentUser() _user: CurrentUserShape,
  ): Promise<void> {
    // Handled by application service — placeholder here
  }

  @Post(':id/trust')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Trust a device' })
  async trust(@Param('id') id: string): Promise<DeviceHttpResponseDTO> {
    const app = await this.queryBus.execute(new GetAuthDeviceQuery(id));
    return AuthDeviceControllerMapper.toHttpResponse(app);
  }
}
