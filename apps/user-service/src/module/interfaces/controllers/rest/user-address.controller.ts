/**
 * UserAddressController
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { AddAddressCommand } from '@application/commands/address/add-address.command';
import { UpdateAddressCommand } from '@application/commands/address/update-address.command';
import { DeleteAddressCommand } from '@application/commands/address/delete-address.command';
import { SetDefaultAddressCommand } from '@application/commands/address/set-default-address.command';
import { ListAddressesQuery } from '@application/queries/address/list-addresses.query';
import { GetAddressQuery } from '@application/queries/address/get-address.query';
import { AddAddressRequestDto, UpdateAddressRequestDto } from '../../dtos/requests/address.request.dto.js';
import { AddressResponseDto, AddressListResponseDto } from '../../dtos/responses/address.response.dto.js';
import { AddressControllerMapper } from '../../mappers/address.controller.mapper.js';
import {
  ApiListAddresses,
  ApiAddAddress,
  ApiUpdateAddress,
  ApiDeleteAddress,
  ApiSetDefaultAddress,
} from '../../swagger/address.swagger.js';

@ApiTags('user-address')
@Controller('users/:userId/addresses')
export class UserAddressController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiListAddresses()
  async list(@Param('userId') userId: string): Promise<AddressListResponseDto> {
    const result = await this.queryBus.execute(new ListAddressesQuery(userId));
    return AddressControllerMapper.toListResponse(result.items);
  }

  @Get(':addressId')
  @UseGuards(JwtAuthGuard)
  async get(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string
  ): Promise<AddressResponseDto> {
    const appDto = await this.queryBus.execute(new GetAddressQuery(userId, addressId));
    return AddressControllerMapper.toResponse(appDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiAddAddress()
  async add(
    @Param('userId') userId: string,
    @Body() body: AddAddressRequestDto
  ): Promise<AddressResponseDto> {
    const appDto = AddressControllerMapper.toAddAppDto(userId, body);
    const result = await this.commandBus.execute(new AddAddressCommand(appDto));
    return AddressControllerMapper.toResponse(result);
  }

  @Put(':addressId')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateAddress()
  async update(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
    @Body() body: UpdateAddressRequestDto
  ): Promise<AddressResponseDto> {
    const appDto = AddressControllerMapper.toUpdateAppDto(userId, addressId, body);
    const result = await this.commandBus.execute(new UpdateAddressCommand(appDto));
    return AddressControllerMapper.toResponse(result);
  }

  @Delete(':addressId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiDeleteAddress()
  async remove(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string
  ): Promise<void> {
    await this.commandBus.execute(new DeleteAddressCommand(userId, addressId));
  }

  @Post(':addressId/default')
  @UseGuards(JwtAuthGuard)
  @ApiSetDefaultAddress()
  async setDefault(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string
  ): Promise<AddressResponseDto> {
    const result = await this.commandBus.execute(
      new SetDefaultAddressCommand(userId, addressId)
    );
    return AddressControllerMapper.toResponse(result);
  }
}
