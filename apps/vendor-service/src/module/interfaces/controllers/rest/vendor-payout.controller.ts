import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { RequestPayoutCommand } from '../../../application/commands/payout';
import { ApprovePayoutCommand } from '../../../application/commands/payout';
import { RejectPayoutCommand } from '../../../application/commands/payout';
import { ProcessPayoutCommand } from '../../../application/commands/payout';
import { GetPayoutQuery } from '../../../application/queries/payout';
import { ListPayoutsQuery } from '../../../application/queries/payout';
import { GetPayoutSummaryQuery } from '../../../application/queries/payout';
import {
  RequestPayoutRequestDto,
  ApprovePayoutRequestDto,
  RejectPayoutRequestDto,
  ProcessPayoutRequestDto,
} from '../../dtos/requests/payout.request.dto';

@ApiTags('Vendor Payouts')
@ApiBearerAuth()
@Controller('vendors/payouts')
@UseGuards(JwtAuthGuard)
export class VendorPayoutController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':vendorId')
  async list(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new ListPayoutsQuery(vendorId));
  }

  @Get(':vendorId/summary')
  async summary(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPayoutSummaryQuery(vendorId));
  }

  @Get('detail/:payoutId')
  async get(@Param('payoutId') payoutId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPayoutQuery(payoutId));
  }

  @Post('request')
  @HttpCode(HttpStatus.CREATED)
  async request(@Body() body: RequestPayoutRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new RequestPayoutCommand(
        body.vendorId,
        body.bankAccountId,
        body.amount,
        body.currency,
        body.notes,
      ),
    );
  }

  @Post('approve')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async approve(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: ApprovePayoutRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ApprovePayoutCommand(body.payoutId, user.userId, body.notes),
    );
  }

  @Post('reject')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async reject(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: RejectPayoutRequestDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new RejectPayoutCommand(body.payoutId, user.userId, body.reason),
    );
  }

  @Post('process')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async process(@Body() body: ProcessPayoutRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new ProcessPayoutCommand(
        body.payoutId,
        body.status,
        body.transactionRef,
        body.failureReason,
      ),
    );
  }
}
