/**
 * SlaController — HTTP adapter
 * @module support-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

import { CreateSlaCommand } from '../../../application/commands/sla/create-sla.command';
import { UpdateSlaCommand } from '../../../application/commands/sla/update-sla.command';
import { TickSlaCommand } from '../../../application/commands/sla/tick-sla.command';
import { GetSlaQuery } from '../../../application/queries/sla/get-sla.query';
import { ListSlaByTicketQuery } from '../../../application/queries/sla/list-sla-by-ticket.query';

import { CreateSlaRequestDTO } from '../../dtos/requests/sla/create-sla.dto';
import { UpdateSlaRequestDTO } from '../../dtos/requests/sla/update-sla.dto';
import { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';
import { SlaControllerMapper } from '../../mappers/sla.controller.mapper';

@ApiTags('SLA')
@ApiBearerAuth()
@Controller({ path: 'slas', version: '1' })
export class SlaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: SlaControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateSlaRequestDTO): Promise<SlaResponseDTO> {
    const result = await this.commandBus.execute(
      new CreateSlaCommand({
        ticketId: body.ticketId,
        metric: body.metric as never,
        targetMinutes: body.targetMinutes,
        priority: body.priority as never,
        warningThresholdPercent: body.warningThresholdPercent,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<SlaResponseDTO> {
    const result = await this.queryBus.execute(new GetSlaQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get('ticket/:ticketId')
  @UseGuards(JwtAuthGuard)
  async listByTicket(
    @Param('ticketId') ticketId: string,
  ): Promise<readonly SlaResponseDTO[]> {
    const result = await this.queryBus.execute(new ListSlaByTicketQuery(ticketId));
    return result.map((item: never) => this.mapper.toResponse(item));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateSlaRequestDTO,
  ): Promise<SlaResponseDTO> {
    const result = await this.commandBus.execute(
      new UpdateSlaCommand({
        slaId: id,
        targetMinutes: body.targetMinutes,
        warningThresholdPercent: body.warningThresholdPercent,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/tick')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async tick(
    @Param('id') id: string,
    @Body() body: { elapsedMinutes: number },
  ): Promise<SlaResponseDTO> {
    const result = await this.commandBus.execute(
      new TickSlaCommand(id, body.elapsedMinutes),
    );
    return this.mapper.toResponse(result);
  }
}
