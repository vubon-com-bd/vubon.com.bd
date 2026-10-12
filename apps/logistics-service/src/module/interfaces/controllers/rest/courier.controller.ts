/**
 * CourierController — REST endpoints for courier aggregate
 * @module logistics-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { RegisterCourierCommand } from '../../../application/commands/courier/register-courier.command.js';
import { UpdateCourierCommand } from '../../../application/commands/courier/update-courier.command.js';
import { ActivateCourierCommand } from '../../../application/commands/courier/activate-courier.command.js';
import { DeactivateCourierCommand } from '../../../application/commands/courier/deactivate-courier.command.js';
import { SuspendCourierCommand } from '../../../application/commands/courier/suspend-courier.command.js';
import { SetCourierDefaultCommand } from '../../../application/commands/courier/set-courier-default.command.js';

import { GetCourierQuery } from '../../../application/queries/courier/get-courier.query.js';
import { ListCouriersQuery } from '../../../application/queries/courier/list-couriers.query.js';
import { GetDefaultCourierQuery } from '../../../application/queries/courier/get-default-courier.query.js';

import {
  RegisterCourierHttpDTO, UpdateCourierHttpDTO, SuspendCourierHttpDTO,
  ActivateCourierHttpDTO, DeactivateCourierHttpDTO, SetCourierDefaultHttpDTO,
  ListCouriersHttpQueryDTO,
} from '../../dtos/requests/courier.request.dto.js';
import { CourierControllerMapper } from '../../mappers/courier.controller.mapper.js';
import type {
  CourierResponseDTO, CourierListResponseDTO,
} from '../../../application/dtos/responses/courier/courier-response.dto.js';

@ApiTags('couriers')
@ApiBearerAuth('bearer')
@Controller('logistics/couriers')
@UseGuards(JwtAuthGuard)
export class CourierController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new courier' })
  async register(@Body() dto: RegisterCourierHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<CourierResponseDTO> {
    return this.commandBus.execute(new RegisterCourierCommand(CourierControllerMapper.toRegisterDto(dto), user.userId));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update courier details' })
  async update(@Param('id') id: string, @Body() dto: UpdateCourierHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<CourierResponseDTO> {
    return this.commandBus.execute(new UpdateCourierCommand(CourierControllerMapper.toUpdateDto(id, dto), user.userId));
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate a courier' })
  async activate(@Param('id') id: string, @Body() _dto: ActivateCourierHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<CourierResponseDTO> {
    return this.commandBus.execute(new ActivateCourierCommand(CourierControllerMapper.toActivateDto(id), user.userId));
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a courier' })
  async deactivate(@Param('id') id: string, @Body() dto: DeactivateCourierHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<CourierResponseDTO> {
    return this.commandBus.execute(new DeactivateCourierCommand(CourierControllerMapper.toDeactivateDto(id, dto), user.userId));
  }

  @Patch(':id/suspend')
  @ApiOperation({ summary: 'Suspend a courier' })
  async suspend(@Param('id') id: string, @Body() dto: SuspendCourierHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<CourierResponseDTO> {
    return this.commandBus.execute(new SuspendCourierCommand(CourierControllerMapper.toSuspendDto(id, dto), user.userId));
  }

  @Patch(':id/default')
  @ApiOperation({ summary: 'Set or unset courier as default' })
  async setDefault(@Param('id') id: string, @Body() dto: SetCourierDefaultHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<CourierResponseDTO> {
    return this.commandBus.execute(new SetCourierDefaultCommand(CourierControllerMapper.toSetDefaultDto(id, dto), user.userId));
  }

  @Get()
  @ApiOperation({ summary: 'List couriers (paginated)' })
  async list(@Query() q: ListCouriersHttpQueryDTO): Promise<CourierListResponseDTO> {
    return this.queryBus.execute(new ListCouriersQuery(CourierControllerMapper.toListOptions(q)));
  }

  @Get('default')
  @ApiOperation({ summary: 'Get default courier' })
  async getDefault(): Promise<CourierResponseDTO | null> {
    return this.queryBus.execute(new GetDefaultCourierQuery());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get courier by id' })
  async getById(@Param('id') id: string): Promise<CourierResponseDTO> {
    return this.queryBus.execute(new GetCourierQuery(id));
  }
}
