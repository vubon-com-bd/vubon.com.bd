/**
 * UserAddressController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';

import { AddAddressCommand } from '../../../application/commands/user/add-address.command';
import { UpdateAddressCommand } from '../../../application/commands/user/update-address.command';
import { DeleteAddressCommand } from '../../../application/commands/user/delete-address.command';
import { ListUserAddressesQuery } from '../../../application/queries/user/list-user-addresses.query';
import { GetUserAddressQuery } from '../../../application/queries/user/get-user-address.query';
import {
  AddAddressRequestDTO,
  UpdateAddressRequestDTO,
} from '../../dtos/requests/address.request.dto';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Users Addresses')
@Controller('users/addresses')
@UseGuards(JwtAuthGuard)
export class UserAddressController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(new ListUserAddressesQuery(user.id as UserId));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: AddAddressRequestDTO,
  ) {
    return this.commandBus.execute(
      new AddAddressCommand(user.id as UserId, body as never),
    );
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserAddressQuery(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateAddressRequestDTO) {
    return this.commandBus.execute(
      new UpdateAddressCommand(id, body as never),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(
      new DeleteAddressCommand({ addressId: id }),
    );
  }
}
