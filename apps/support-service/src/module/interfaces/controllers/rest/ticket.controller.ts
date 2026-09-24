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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { CreateTicketCommand } from '../../../application/commands/ticket/create-ticket.command';
import { UpdateTicketCommand } from '../../../application/commands/ticket/update-ticket.command';
import { AssignTicketCommand } from '../../../application/commands/ticket/assign-ticket.command';
import { EscalateTicketCommand } from '../../../application/commands/ticket/escalate-ticket.command';
import { ResolveTicketCommand } from '../../../application/commands/ticket/resolve-ticket.command';
import { CloseTicketCommand } from '../../../application/commands/ticket/close-ticket.command';
import { ReopenTicketCommand } from '../../../application/commands/ticket/reopen-ticket.command';
import { RateTicketCommand } from '../../../application/commands/ticket/rate-ticket.command';
import { GetTicketQuery } from '../../../application/queries/ticket/get-ticket.query';
import { ListTicketsQuery } from '../../../application/queries/ticket/list-tickets.query';
import { ListTicketsByUserQuery } from '../../../application/queries/ticket/list-tickets-by-user.query';
import {
  CreateTicketRequestDto,
  UpdateTicketRequestDto,
  AssignTicketRequestDto,
  EscalateTicketRequestDto,
  RateTicketRequestDto,
} from '../../dtos/requests/ticket.request.dto';
import { TicketSwagger } from '../../swagger/ticket.swagger';

type EscalationLevel = 'L1' | 'L2' | 'L3' | 'L4';

@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @TicketSwagger.Create()
  async create(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: CreateTicketRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateTicketCommand(
        body.subject,
        body.description,
        user.userId,
        body.priority ?? 'normal',
        body.type ?? 'question',
        body.channel ?? 'web',
        body.tags ?? [],
      ),
    );
  }

  @Get()
  @TicketSwagger.List()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListTicketsQuery(
        page ? Number(page) : 1,
        limit ? Number(limit) : 20,
        status,
        priority,
      ),
    );
  }

  @Get('my')
  async listMy(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListTicketsByUserQuery(user.userId));
  }

  @Get(':id')
  @TicketSwagger.Get()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetTicketQuery(id));
  }

  @Patch(':id')
  @Permissions(PERMISSION.USER_UPDATE)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTicketRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateTicketCommand(id, body.subject, body.description, body.priority, body.tags),
    );
  }

  @Post(':id/assign')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async assign(
    @Param('id') id: string,
    @Body() body: AssignTicketRequestDto,
  ): Promise<void> {
    return this.commandBus.execute(new AssignTicketCommand(id, body.agentId));
  }

  @Post(':id/escalate')
  async escalate(
    @Param('id') id: string,
    @Body() body: EscalateTicketRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new EscalateTicketCommand(
        id,
        body.reason,
        body.level as EscalationLevel | undefined,
      ),
    );
  }

  @Post(':id/resolve')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resolve(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new ResolveTicketCommand(id));
  }

  @Post(':id/close')
  @HttpCode(HttpStatus.NO_CONTENT)
  async close(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new CloseTicketCommand(id));
  }

  @Post(':id/reopen')
  @HttpCode(HttpStatus.NO_CONTENT)
  async reopen(
    @Param('id') id: string,
    @Body() body: { reason: string },
  ): Promise<void> {
    return this.commandBus.execute(new ReopenTicketCommand(id, body.reason));
  }

  @Post(':id/rate')
  async rate(
    @Param('id') id: string,
    @Body() body: RateTicketRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RateTicketCommand(id, body.score, body.comment),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.USER_DELETE)
  async remove(@Param('id') id: string): Promise<void> {
    void id;
    void this.commandBus;
  }
}
