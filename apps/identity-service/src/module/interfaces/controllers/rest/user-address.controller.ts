/**
 * UserAddressController — REST endpoints for user addresses
 * @module identity-service/interfaces/controllers/rest
 */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { AddAddressCommand } from '../../../application/commands/user/add-address.command.js';
import { UpdateAddressCommand } from '../../../application/commands/user/update-address.command.js';
import { DeleteAddressCommand } from '../../../application/commands/user/delete-address.command.js';

import { ListUserAddressesQuery } from '../../../application/queries/user/list-user-addresses.query.js';
import { GetUserAddressQuery } from '../../../application/queries/user/get-user-address.query.js';

import { AddAddressHttpDTO } from '../../dtos/requests/user/add-address.request.dto.js';
import { UpdateAddressHttpDTO } from '../../dtos/requests/user/update-address.request.dto.js';

import type { UserAddressHttpResponseDTO } from '../../dtos/responses/user-address/user-address.response.dto.js';
import type { UserAddressListHttpResponseDTO } from '../../dtos/responses/user-address/user-address-list.response.dto.js';

import { UserAddressControllerMapper } from '../../mappers/user-address.controller.mapper.js';

@ApiTags('user-address')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('users/me/addresses')
export class UserAddressController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List user addresses' })
  async list(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserAddressListHttpResponseDTO> {
    const items = await this.queryBus.execute(
      new ListUserAddressesQuery(user.userId),
    );
    return UserAddressControllerMapper.toHttpList(items);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserAddressHttpResponseDTO | null> {
    const app = await this.queryBus.execute(new GetUserAddressQuery(id));
    return app ? UserAddressControllerMapper.toHttpResponse(app) : null;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add user address' })
  async add(
    @Body() dto: AddAddressHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<UserAddressHttpResponseDTO> {
    const appDto = UserAddressControllerMapper.toAddAppDto(dto);
    const app = await this.commandBus.execute(
      new AddAddressCommand(user.userId, appDto as never),
    );
    return UserAddressControllerMapper.toHttpResponse(app);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user address' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAddressHttpDTO,
  ): Promise<UserAddressHttpResponseDTO> {
    const appDto = UserAddressControllerMapper.toUpdateAppDto(dto);
    const app = await this.commandBus.execute(
      new UpdateAddressCommand(id, appDto as never),
    );
    return UserAddressControllerMapper.toHttpResponse(app);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user address' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeleteAddressCommand({ addressId: id }));
  }
}
