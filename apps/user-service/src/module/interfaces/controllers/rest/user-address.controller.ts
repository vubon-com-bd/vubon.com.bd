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
import { AddAddressCommand } from '../../../application/commands/address/add-address.command';
import { UpdateAddressCommand } from '../../../application/commands/address/update-address.command';
import { DeleteAddressCommand } from '../../../application/commands/address/delete-address.command';
import { SetDefaultAddressCommand } from '../../../application/commands/address/set-default-address.command';
import { ListAddressesQuery } from '../../../application/queries/address/list-addresses.query';
import {
  AddAddressRequestDto,
  UpdateAddressRequestDto,
} from '../../dtos/requests/address.request.dto';
import { AddressSwagger } from '../../swagger/address.swagger';

@ApiTags('Addresses')
@Controller('users/addresses')
@UseGuards(JwtAuthGuard)
export class UserAddressController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @AddressSwagger.List()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListAddressesQuery(user.userId));
  }

  @Post()
  @AddressSwagger.Create()
  async add(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: AddAddressRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddAddressCommand(
        user.userId,
        body.line1,
        body.city,
        body.district,
        body.division,
        body.country,
        body.isDefault,
        body.line2,
        body.postalCode,
        body.label,
      ),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateAddressRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateAddressCommand(
        id,
        body.line1,
        body.line2,
        body.city,
        body.district,
        body.division,
        body.postalCode,
        body.label,
        body.isDefault,
      ),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteAddressCommand(id));
  }

  @Post(':id/set-default')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setDefault(
    @CurrentUser() user: CurrentUserShape,
    @Param('id') id: string,
  ): Promise<void> {
    return this.commandBus.execute(new SetDefaultAddressCommand(user.userId, id));
  }
}
