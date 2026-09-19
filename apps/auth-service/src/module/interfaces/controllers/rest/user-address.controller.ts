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
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { AddAddressCommand } from '../../../application/commands/user/add-address.command';
import { UpdateAddressCommand } from '../../../application/commands/user/update-address.command';
import { DeleteAddressCommand } from '../../../application/commands/user/delete-address.command';
import { ListUserAddressesQuery } from '../../../application/queries/user/list-user-addresses.query';
import { GetUserAddressQuery } from '../../../application/queries/user/get-user-address.query';
import {
  AddressCreateRequestDTO,
  AddressUpdateRequestDTO,
} from '../../dtos/requests/address.request.dto';

@ApiTags('Addresses')
@Controller('users/addresses')
@UseGuards(JwtAuthGuard)
export class UserAddressController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListUserAddressesQuery(user.userId));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetUserAddressQuery(id));
  }

  @Post()
  async add(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: AddressCreateRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddAddressCommand(
        user.userId,
        body.line1,
        body.city,
        body.country,
        body.isDefault,
        body.isDefaultShipping,
        body.isDefaultBilling,
        body.type,
        body.line2,
        body.state,
        body.postalCode,
        body.label,
      ),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: AddressUpdateRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateAddressCommand(
        id,
        body.line1,
        body.city,
        body.country,
        body.isDefault,
        body.line2,
        body.state,
        body.postalCode,
        body.label,
      ),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteAddressCommand(id));
  }
}
