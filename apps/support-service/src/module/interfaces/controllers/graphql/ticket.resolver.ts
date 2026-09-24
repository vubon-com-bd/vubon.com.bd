import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateTicketCommand } from '../../../application/commands/ticket/create-ticket.command';
import { GetTicketQuery } from '../../../application/queries/ticket/get-ticket.query';
import { TicketType } from './types/ticket.type';
import { CreateTicketInput } from './inputs/create-ticket.input';

@Resolver(() => TicketType)
@UseGuards(JwtAuthGuard)
export class TicketResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => TicketType)
  async ticket(@Args('id') id: string): Promise<TicketType> {
    const dto = (await this.queryBus.execute(new GetTicketQuery(id))) as TicketType;
    return dto;
  }

  @Mutation(() => TicketType)
  async createTicket(
    @CurrentUser() user: CurrentUserShape,
    @Args('input') input: CreateTicketInput,
  ): Promise<TicketType> {
    const dto = (await this.commandBus.execute(
      new CreateTicketCommand(
        input.subject,
        input.description,
        user.userId,
        input.priority ?? 'normal',
        input.type ?? 'question',
        input.channel ?? 'web',
        [],
      ),
    )) as TicketType;
    return dto;
  }
}
