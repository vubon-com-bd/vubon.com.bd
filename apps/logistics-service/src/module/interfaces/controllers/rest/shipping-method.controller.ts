import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { CreateShippingMethodCommand } from '../../../application/commands/shipping-method/create-shipping-method.command.js';
import { UpdateShippingMethodCommand } from '../../../application/commands/shipping-method/update-shipping-method.command.js';
import { ActivateShippingMethodCommand } from '../../../application/commands/shipping-method/activate-shipping-method.command.js';
import { DeactivateShippingMethodCommand } from '../../../application/commands/shipping-method/deactivate-shipping-method.command.js';
import { SuspendShippingMethodCommand } from '../../../application/commands/shipping-method/suspend-shipping-method.command.js';
import { CalculateShippingCommand } from '../../../application/commands/shipping-method/calculate-shipping.command.js';
import { GetShippingMethodQuery } from '../../../application/queries/shipping-method/get-shipping-method.query.js';
import { ListShippingMethodsQuery } from '../../../application/queries/shipping-method/list-shipping-methods.query.js';
import {
  CreateShippingMethodHttpDTO, UpdateShippingMethodHttpDTO, ShippingMethodReasonHttpDTO,
  SuspendReasonHttpDTO, CalculateShippingHttpDTO, ListShippingMethodsHttpQueryDTO,
} from '../../dtos/requests/shipping-method.request.dto.js';
import { ShippingMethodControllerMapper } from '../../mappers/shipping-method.controller.mapper.js';
import type { ShippingMethodResponseDTO, ShippingMethodListResponseDTO, CalculateShippingResponseDTO } from '../../../application/dtos/responses/shipping-method/shipping-method-response.dto.js';

@ApiTags('shipping-methods')
@ApiBearerAuth('bearer')
@Controller('logistics/shipping-methods')
@UseGuards(JwtAuthGuard)
export class ShippingMethodController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Create shipping method' })
  async create(@Body() dto: CreateShippingMethodHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ShippingMethodResponseDTO> {
    return this.commandBus.execute(new CreateShippingMethodCommand(ShippingMethodControllerMapper.toCreateDto(dto), user.userId));
  }
  @Patch(':id') @ApiOperation({ summary: 'Update shipping method' })
  async update(@Param('id') id: string, @Body() dto: UpdateShippingMethodHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ShippingMethodResponseDTO> {
    return this.commandBus.execute(new UpdateShippingMethodCommand(ShippingMethodControllerMapper.toUpdateDto(id, dto), user.userId));
  }
  @Patch(':id/activate') @ApiOperation({ summary: 'Activate shipping method' })
  async activate(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<ShippingMethodResponseDTO> {
    return this.commandBus.execute(new ActivateShippingMethodCommand(ShippingMethodControllerMapper.toActivateDto(id), user.userId));
  }
  @Patch(':id/deactivate') @ApiOperation({ summary: 'Deactivate shipping method' })
  async deactivate(@Param('id') id: string, @Body() dto: ShippingMethodReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ShippingMethodResponseDTO> {
    return this.commandBus.execute(new DeactivateShippingMethodCommand(ShippingMethodControllerMapper.toDeactivateDto(id, dto), user.userId));
  }
  @Patch(':id/suspend') @ApiOperation({ summary: 'Suspend shipping method' })
  async suspend(@Param('id') id: string, @Body() dto: SuspendReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<ShippingMethodResponseDTO> {
    return this.commandBus.execute(new SuspendShippingMethodCommand(ShippingMethodControllerMapper.toSuspendDto(id, dto), user.userId));
  }
  @Post(':id/calculate') @ApiOperation({ summary: 'Calculate shipping cost for method' })
  async calculate(@Param('id') id: string, @Body() dto: CalculateShippingHttpDTO): Promise<CalculateShippingResponseDTO> {
    return this.commandBus.execute(new CalculateShippingCommand(ShippingMethodControllerMapper.toCalculateDto(id, dto)));
  }
  @Get() @ApiOperation({ summary: 'List shipping methods' })
  async list(@Query() q: ListShippingMethodsHttpQueryDTO): Promise<ShippingMethodListResponseDTO> {
    return this.queryBus.execute(new ListShippingMethodsQuery(ShippingMethodControllerMapper.toListOptions(q)));
  }
  @Get(':id') @ApiOperation({ summary: 'Get shipping method by id' })
  async getById(@Param('id') id: string): Promise<ShippingMethodResponseDTO> {
    return this.queryBus.execute(new GetShippingMethodQuery(id));
  }
}
