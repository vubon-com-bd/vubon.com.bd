/**
 * TicketController — HTTP adapter for ticket use cases
 * @module support-service/interfaces/controllers/rest
 *
 * Rule: thin — dispatch commands/queries only
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
import { JwtAuthGuard, CurrentUser } from '@vubon/shared-kernel/interfaces';

import { CreateTicketCommand } from '../../../application/commands/ticket/create-ticket.command';
import { UpdateTicketCommand } from '../../../application/commands/ticket/update-ticket.command';
import { CloseTicketCommand } from '../../../application/commands/ticket/close-ticket.command';
import { GetTicketQuery } from '../../../application/queries/ticket/get-ticket.query';
import { ListTicketsQuery } from '../../../application/queries/ticket/list-tickets.query';

import { CreateTicketRequestDTO } from '../../dtos/requests/ticket/create-ticket.dto';
import { UpdateTicketRequestDTO } from '../../dtos/requests/ticket/update-ticket.dto';
import { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import { TicketControllerMapper } from '../../mappers/ticket.controller.mapper';
import { OwnTicketGuard } from '../../guards/own-ticket.guard';
import {
  ApiTicketCreate,
  ApiTicketDelete,
  ApiTicketGet,
  ApiTicketList,
  ApiTicketUpdate,
} from '../../swagger/ticket.swagger';

@Controller({ path: 'tickets', version: '1' })
export class TicketController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: TicketControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiTicketCreate()
  async create(
    @Body() body: CreateTicketRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<TicketResponseDTO> {
    const result = await this.commandBus.execute(
      new CreateTicketCommand({
        subject: body.subject,
        description: body.description,
        type: body.type as never,
        priority: body.priority as never,
        channel: body.channel as never,
        category: body.category as never,
        customerId: body.customerId ?? userId,
        customerEmail: body.customerEmail,
        customerName: body.customerName,
        orderId: body.orderId,
        productId: body.productId,
        attachments: body.attachments,
        tags: body.tags,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnTicketGuard)
  @ApiTicketGet()
  async findOne(@Param('id') id: string): Promise<TicketResponseDTO> {
    const result = await this.queryBus.execute(new GetTicketQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiTicketList()
  async findAll(): Promise<readonly TicketResponseDTO[]> {
    const result = await this.queryBus.execute(new ListTicketsQuery(1, 20));
    return result.items.map((item: never) => this.mapper.toResponse(item));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, OwnTicketGuard)
  @ApiTicketUpdate()
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTicketRequestDTO,
  ): Promise<TicketResponseDTO> {
    const result = await this.commandBus.execute(
      new UpdateTicketCommand(id, {
        subject: body.subject,
        description: body.description,
        status: body.status as never,
        priority: body.priority as never,
        category: body.category as never,
        assignedTo: body.assignedTo,
        teamId: body.teamId,
        tags: body.tags,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, OwnTicketGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTicketDelete()
  async remove(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(
      new CloseTicketCommand({ ticketId: id }),
    );
  }
}
