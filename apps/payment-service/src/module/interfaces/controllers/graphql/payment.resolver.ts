/**
 * PaymentResolver — GraphQL queries/mutations for payment
 * @module payment-service/interfaces/controllers/graphql
 *
 * Read-heavy operations exposed via GraphQL; commands still flow through
 * the same CommandBus as REST.
 */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { GetPaymentQuery } from '@application/queries/payment/get-payment.query';
import { ListPaymentsQuery } from '@application/queries/payment/list-payments.query';
import { CancelPaymentCommand } from '@application/commands/payment/cancel-payment.command';

@Resolver('Payment')
@UseGuards(JwtAuthGuard)
export class PaymentResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query('payment')
  async getPayment(
    @Args('id') id: string,
    @CurrentUser() _user: CurrentUserShape,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetPaymentQuery(id));
  }

  @Query('payments')
  async listPayments(
    @CurrentUser() user: CurrentUserShape,
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListPaymentsQuery(
        page ?? 1,
        limit ?? 20,
        { userId: user.userId },
      ),
    );
  }

  @Mutation('cancelPayment')
  async cancelPayment(
    @Args('id') id: string,
    @Args('reason') reason: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CancelPaymentCommand(
        { paymentId: id, reason, cancelledBy: user.userId },
        user.userId,
      ),
    );
  }
}
