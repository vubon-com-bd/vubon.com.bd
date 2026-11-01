/**
 * RefundController
 * @module payment-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { RequestRefundCommand } from '@application/commands/refund/request-refund.command';
import { ApproveRefundCommand } from '@application/commands/refund/approve-refund.command';
import { RejectRefundCommand } from '@application/commands/refund/reject-refund.command';
import { PartialRefundCommand } from '@application/commands/refund/partial-refund.command';
import { GetRefundQuery } from '@application/queries/refund/get-refund.query';
import { ListRefundsQuery } from '@application/queries/refund/list-refunds.query';

import {
  RequestRefundHttpDTO,
  ApproveRefundHttpDTO,
  RejectRefundHttpDTO,
  PartialRefundHttpDTO,
  ListRefundsHttpQueryDTO,
} from '@interfaces/dtos/requests/refund.request.dto';
import type {
  RefundHttpResponseDTO,
  RefundInitiateHttpResponseDTO,
  RefundListHttpResponseDTO,
} from '@interfaces/dtos/responses/refund.response.dto';

import { RefundControllerMapper } from '@interfaces/mappers/refund.controller.mapper';
import { ApiRefundTag } from '@interfaces/swagger/refund.swagger';

@ApiRefundTag()
@ApiBearerAuth('bearer')
@Controller('refunds')
@UseGuards(JwtAuthGuard)
export class RefundController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post('payments/:paymentId')
  @HttpCode(HttpStatus.CREATED)
  async request(
    @Param('paymentId') paymentId: string,
    @Body() dto: RequestRefundHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<RefundInitiateHttpResponseDTO> {
    const appDto = RefundControllerMapper.toRequestAppDto(paymentId, dto);
    return this.commandBus.execute(new RequestRefundCommand(appDto, user.userId));
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  async approve(
    @Param('id') id: string,
    @Body() dto: ApproveRefundHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<RefundHttpResponseDTO> {
    return this.commandBus.execute(
      new ApproveRefundCommand(
        { refundId: id, approvedAmount: dto.approvedAmount, note: dto.note },
        user.userId,
      ),
    );
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  async reject(
    @Param('id') id: string,
    @Body() dto: RejectRefundHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<RefundHttpResponseDTO> {
    return this.commandBus.execute(
      new RejectRefundCommand({ refundId: id, reason: dto.reason }, user.userId),
    );
  }

  @Post('partial')
  @HttpCode(HttpStatus.CREATED)
  async partial(
    @Body() dto: PartialRefundHttpDTO & { paymentId: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<RefundHttpResponseDTO> {
    return this.commandBus.execute(
      new PartialRefundCommand(
        {
          paymentId: dto.paymentId,
          amount: dto.amount,
          currency: dto.currency,
          reason: dto.reason,
          note: dto.note,
        },
        user.userId,
      ),
    );
  }

  @Get()
  async list(
    @Query() q: ListRefundsHttpQueryDTO,
  ): Promise<RefundListHttpResponseDTO> {
    const options = RefundControllerMapper.toListOptions(q);
    return this.queryBus.execute(new ListRefundsQuery(
      options.page,
      options.limit,
      options.filter,
      options.sortBy,
      options.sortDir,
    ));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<RefundHttpResponseDTO> {
    return this.queryBus.execute(new GetRefundQuery(id));
  }
}
