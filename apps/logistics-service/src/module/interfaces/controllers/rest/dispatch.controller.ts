import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { CreateDispatchCommand } from '../../../application/commands/dispatch/create-dispatch.command.js';
import { AddDispatchShipmentCommand } from '../../../application/commands/dispatch/add-dispatch-shipment.command.js';
import { RemoveDispatchShipmentCommand } from '../../../application/commands/dispatch/remove-dispatch-shipment.command.js';
import { AssignDispatchCommand } from '../../../application/commands/dispatch/assign-dispatch.command.js';
import { GenerateDispatchManifestCommand } from '../../../application/commands/dispatch/generate-dispatch-manifest.command.js';
import { UpdateDispatchEtaCommand } from '../../../application/commands/dispatch/update-dispatch-eta.command.js';
import { StartDispatchCommand } from '../../../application/commands/dispatch/start-dispatch.command.js';
import { MarkDispatchInTransitCommand } from '../../../application/commands/dispatch/mark-dispatch-in-transit.command.js';
import { CompleteDispatchCommand } from '../../../application/commands/dispatch/complete-dispatch.command.js';
import { FailDispatchCommand } from '../../../application/commands/dispatch/fail-dispatch.command.js';
import { ReturnDispatchCommand } from '../../../application/commands/dispatch/return-dispatch.command.js';
import { CancelDispatchCommand } from '../../../application/commands/dispatch/cancel-dispatch.command.js';
import { GetDispatchQuery } from '../../../application/queries/dispatch/get-dispatch.query.js';
import { ListDispatchesQuery } from '../../../application/queries/dispatch/list-dispatches.query.js';
import {
  CreateDispatchHttpDTO, AddDispatchShipmentHttpDTO, AssignDispatchHttpDTO,
  ManifestHttpDTO, UpdateEtaHttpDTO, DispatchReasonHttpDTO, ListDispatchesHttpQueryDTO,
} from '../../dtos/requests/dispatch.request.dto.js';
import { DispatchControllerMapper } from '../../mappers/dispatch.controller.mapper.js';
import type { DispatchResponseDTO, DispatchListResponseDTO } from '../../../application/dtos/responses/dispatch/dispatch-response.dto.js';

@ApiTags('dispatches')
@ApiBearerAuth('bearer')
@Controller('logistics/dispatches')
@UseGuards(JwtAuthGuard)
export class DispatchController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Create dispatch' })
  async create(@Body() dto: CreateDispatchHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new CreateDispatchCommand(DispatchControllerMapper.toCreateDto(dto), user.userId));
  }
  @Post(':id/shipments') @ApiOperation({ summary: 'Add shipment to dispatch' })
  async addShipment(@Param('id') id: string, @Body() dto: AddDispatchShipmentHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new AddDispatchShipmentCommand(DispatchControllerMapper.toAddShipmentDto(id, dto), user.userId));
  }
  @Patch(':id/shipments/:shipmentId/remove') @ApiOperation({ summary: 'Remove shipment from dispatch' })
  async removeShipment(@Param('id') id: string, @Param('shipmentId') shipmentId: string, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new RemoveDispatchShipmentCommand(DispatchControllerMapper.toRemoveShipmentDto(id, shipmentId), user.userId));
  }
  @Patch(':id/assign') @ApiOperation({ summary: 'Assign dispatch resources' })
  async assign(@Param('id') id: string, @Body() dto: AssignDispatchHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new AssignDispatchCommand(DispatchControllerMapper.toAssignDto(id, dto), user.userId));
  }
  @Post(':id/manifest') @ApiOperation({ summary: 'Attach manifest URL to dispatch' })
  async manifest(@Param('id') id: string, @Body() dto: ManifestHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new GenerateDispatchManifestCommand(DispatchControllerMapper.toManifestDto(id, dto), user.userId));
  }
  @Patch(':id/eta') @ApiOperation({ summary: 'Update dispatch ETA' })
  async updateEta(@Param('id') id: string, @Body() dto: UpdateEtaHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new UpdateDispatchEtaCommand(DispatchControllerMapper.toUpdateEtaDto(id, dto), user.userId));
  }
  @Patch(':id/start') @ApiOperation({ summary: 'Start dispatch' })
  async start(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new StartDispatchCommand(DispatchControllerMapper.toStartDto(id), user.userId));
  }
  @Patch(':id/in-transit') @ApiOperation({ summary: 'Mark dispatch in transit' })
  async inTransit(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new MarkDispatchInTransitCommand(DispatchControllerMapper.toInTransitDto(id), user.userId));
  }
  @Patch(':id/complete') @ApiOperation({ summary: 'Complete dispatch' })
  async complete(@Param('id') id: string, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new CompleteDispatchCommand(DispatchControllerMapper.toCompleteDto(id), user.userId));
  }
  @Patch(':id/fail') @ApiOperation({ summary: 'Fail dispatch' })
  async fail(@Param('id') id: string, @Body() dto: DispatchReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new FailDispatchCommand(DispatchControllerMapper.toFailDto(id, dto), user.userId));
  }
  @Patch(':id/return') @ApiOperation({ summary: 'Mark dispatch returned' })
  async markReturned(@Param('id') id: string, @Body() dto: DispatchReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new ReturnDispatchCommand(DispatchControllerMapper.toReturnDto(id, dto), user.userId));
  }
  @Patch(':id/cancel') @ApiOperation({ summary: 'Cancel dispatch' })
  async cancel(@Param('id') id: string, @Body() dto: DispatchReasonHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<DispatchResponseDTO> {
    return this.commandBus.execute(new CancelDispatchCommand(DispatchControllerMapper.toCancelDto(id, dto), user.userId));
  }
  @Get() @ApiOperation({ summary: 'List dispatches' })
  async list(@Query() q: ListDispatchesHttpQueryDTO): Promise<DispatchListResponseDTO> {
    return this.queryBus.execute(new ListDispatchesQuery(DispatchControllerMapper.toListOptions(q)));
  }
  @Get(':id') @ApiOperation({ summary: 'Get dispatch by id' })
  async getById(@Param('id') id: string): Promise<DispatchResponseDTO> {
    return this.queryBus.execute(new GetDispatchQuery(id));
  }
}
