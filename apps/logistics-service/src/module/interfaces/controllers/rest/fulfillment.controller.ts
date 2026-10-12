import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { CreateFulfillmentCommand } from '../../../application/commands/fulfillment/create-fulfillment.command.js';
import { AssignFulfillmentCommand } from '../../../application/commands/fulfillment/assign-fulfillment.command.js';
import { UpdateFulfillmentCommand } from '../../../application/commands/fulfillment/update-fulfillment.command.js';
import { StartFulfillmentProcessingCommand } from '../../../application/commands/fulfillment/start-fulfillment-processing.command.js';
import { StartFulfillmentPickingCommand } from '../../../application/commands/fulfillment/start-fulfillment-picking.command.js';
import { StartFulfillmentPackingCommand } from '../../../application/commands/fulfillment/start-fulfillment-packing.command.js';
import { ReadyToShipFulfillmentCommand } from '../../../application/commands/fulfillment/ready-to-ship-fulfillment.command.js';
import { ShipFulfillmentCommand } from '../../../application/commands/fulfillment/ship-fulfillment.command.js';
import { FulfillFulfillmentCommand } from '../../../application/commands/fulfillment/fulfill-fulfillment.command.js';
import { MarkPartialFulfillmentCommand } from '../../../application/commands/fulfillment/mark-partial-fulfillment.command.js';
import { HoldFulfillmentCommand } from '../../../application/commands/fulfillment/hold-fulfillment.command.js';
import { ReleaseFulfillmentCommand } from '../../../application/commands/fulfillment/release-fulfillment.command.js';
import { FailFulfillmentCommand } from '../../../application/commands/fulfillment/fail-fulfillment.command.js';
import { CancelFulfillmentCommand } from '../../../application/commands/fulfillment/cancel-fulfillment.command.js';
import { GetFulfillmentQuery } from '../../../application/queries/fulfillment/get-fulfillment.query.js';
import { ListFulfillmentsQuery } from '../../../application/queries/fulfillment/list-fulfillments.query.js';
import {
  CreateFulfillmentHttpDTO, AssignFulfillmentHttpDTO, UpdateFulfillmentHttpDTO,
  FulfillmentReasonHttpDTO, ListFulfillmentsHttpQueryDTO,
} from '../../dtos/requests/fulfillment.request.dto.js';
import { FulfillmentControllerMapper } from '../../mappers/fulfillment.controller.mapper.js';
import type { FulfillmentResponseDTO, FulfillmentListResponseDTO } from '../../../application/dtos/responses/fulfillment/fulfillment-response.dto.js';

@ApiTags('fulfillments')
@ApiBearerAuth('bearer')
@Controller('logistics/fulfillments')
@UseGuards(JwtAuthGuard)
export class FulfillmentController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Create fulfillment' })
  async create(@Body() dto: CreateFulfillmentHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new CreateFulfillmentCommand(FulfillmentControllerMapper.toCreateDto(dto), user.userId));
  }
  @Patch(':id') @ApiOperation({ summary: 'Update fulfillment' })
  async update(@Param('id') id: string, @Body() dto: UpdateFulfillmentHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new UpdateFulfillmentCommand(FulfillmentControllerMapper.toUpdateDto(id, dto), user.userId));
  }
  @Patch(':id/assign') @ApiOperation({ summary: 'Assign fulfillment to user' })
  async assign(@Param('id') id: string, @Body() dto: AssignFulfillmentHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new AssignFulfillmentCommand(FulfillmentControllerMapper.toAssignDto(id, dto), user.userId));
  }
  @Patch(':id/process') @ApiOperation({ summary: 'Start processing' })
  async startProcessing(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new StartFulfillmentProcessingCommand(FulfillmentControllerMapper.toStartProcessingDto(id), user.userId));
  }
  @Patch(':id/pick') @ApiOperation({ summary: 'Start picking' })
  async startPicking(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new StartFulfillmentPickingCommand(FulfillmentControllerMapper.toStartPickingDto(id), user.userId));
  }
  @Patch(':id/pack') @ApiOperation({ summary: 'Start packing' })
  async startPacking(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new StartFulfillmentPackingCommand(FulfillmentControllerMapper.toStartPackingDto(id), user.userId));
  }
  @Patch(':id/ready') @ApiOperation({ summary: 'Mark ready to ship' })
  async readyToShip(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new ReadyToShipFulfillmentCommand(FulfillmentControllerMapper.toReadyToShipDto(id), user.userId));
  }
  @Patch(':id/ship') @ApiOperation({ summary: 'Ship fulfillment' })
  async ship(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new ShipFulfillmentCommand(FulfillmentControllerMapper.toShipDto(id), user.userId));
  }
  @Patch(':id/fulfill') @ApiOperation({ summary: 'Mark fulfilled' })
  async fulfill(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new FulfillFulfillmentCommand(FulfillmentControllerMapper.toFulfillDto(id), user.userId));
  }
  @Patch(':id/partial') @ApiOperation({ summary: 'Mark partially fulfilled' })
  async partial(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new MarkPartialFulfillmentCommand(FulfillmentControllerMapper.toPartialDto(id), user.userId));
  }
  @Patch(':id/hold') @ApiOperation({ summary: 'Put on hold' })
  async hold(@Param('id') id: string, @Body() dto: FulfillmentReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new HoldFulfillmentCommand(FulfillmentControllerMapper.toHoldDto(id, dto), user.userId));
  }
  @Patch(':id/release') @ApiOperation({ summary: 'Release from hold' })
  async release(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new ReleaseFulfillmentCommand(FulfillmentControllerMapper.toReleaseDto(id), user.userId));
  }
  @Patch(':id/fail') @ApiOperation({ summary: 'Mark failed' })
  async fail(@Param('id') id: string, @Body() dto: FulfillmentReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new FailFulfillmentCommand(FulfillmentControllerMapper.toFailDto(id, dto), user.userId));
  }
  @Patch(':id/cancel') @ApiOperation({ summary: 'Cancel fulfillment' })
  async cancel(@Param('id') id: string, @Body() dto: FulfillmentReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<FulfillmentResponseDTO> {
    return this.commandBus.execute(new CancelFulfillmentCommand(FulfillmentControllerMapper.toCancelDto(id, dto), user.userId));
  }
  @Get() @ApiOperation({ summary: 'List fulfillments' })
  async list(@Query() q: ListFulfillmentsHttpQueryDTO): Promise<FulfillmentListResponseDTO> {
    return this.queryBus.execute(new ListFulfillmentsQuery(FulfillmentControllerMapper.toListOptions(q)));
  }
  @Get(':id') @ApiOperation({ summary: 'Get fulfillment by id' })
  async getById(@Param('id') id: string): Promise<FulfillmentResponseDTO> {
    return this.queryBus.execute(new GetFulfillmentQuery(id));
  }
}
