/**
 * VendorPayoutController — payout lifecycle
 * @module vendor-service/interfaces/controllers/rest
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';
import { VendorOwnerGuard } from '../../guards/vendor-owner.guard.js';
import { VendorOwner } from '../../decorators/vendor-owner.decorator.js';
import { IdempotencyKey } from '../../decorators/idempotency-key.decorator.js';

import type { RequestPayoutRequestDto } from '../../../application/dtos/requests/request-payout.dto.js';
import type { ApprovePayoutRequestDto } from '../../../application/dtos/requests/approve-payout.dto.js';
import type { RejectPayoutRequestDto } from '../../../application/dtos/requests/reject-payout.dto.js';
import type { ProcessPayoutRequestDto } from '../../../application/dtos/requests/process-payout.dto.js';
import type { MarkPayoutPaidRequestDto } from '../../../application/dtos/requests/mark-payout-paid.dto.js';
import type { FailPayoutRequestDto } from '../../../application/dtos/requests/fail-payout.dto.js';
import type { CancelPayoutRequestDto } from '../../../application/dtos/requests/cancel-payout.dto.js';

import { RequestPayoutCommand } from '../../../application/commands/payout/request-payout.command.js';
import { ApprovePayoutCommand } from '../../../application/commands/payout/approve-payout.command.js';
import { RejectPayoutCommand } from '../../../application/commands/payout/reject-payout.command.js';
import { ProcessPayoutCommand } from '../../../application/commands/payout/process-payout.command.js';
import { MarkPayoutPaidCommand } from '../../../application/commands/payout/mark-payout-paid.command.js';
import { FailPayoutCommand } from '../../../application/commands/payout/fail-payout.command.js';
import { CancelPayoutCommand } from '../../../application/commands/payout/cancel-payout.command.js';

import { GetPayoutQuery } from '../../../application/queries/payout/get-payout.query.js';
import { ListPayoutsByVendorQuery } from '../../../application/queries/payout/list-payouts-by-vendor.query.js';
import { GetPayoutSummaryQuery } from '../../../application/queries/payout/get-payout-summary.query.js';

interface RequestPayoutBody {
  readonly amount: number;
  readonly currency: string;
  readonly method?: string;
  readonly bankAccountId?: string;
  readonly notes?: string;
}

interface MarkPaidBody {
  readonly transactionId: string;
  readonly reference?: string;
}

interface FailBody {
  readonly reason: string;
}

interface RejectBody {
  readonly reason: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_PAYOUT)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/payouts')
export class VendorPayoutController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Vendor: request payout ───
  @Post('request')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Request a payout' })
  async request(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: RequestPayoutBody,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyKey() idempotencyKey?: string,
  ): Promise<unknown> {
    const dto: RequestPayoutRequestDto = {
      vendorId,
      amount: body.amount,
      currency: body.currency,
      method: body.method as never,
      bankAccountId: body.bankAccountId,
      notes: body.notes,
      idempotencyKey: idempotencyKey ?? `req_${Date.now()}`,
    };
    return this.commandBus.execute(new RequestPayoutCommand(dto, user.userId));
  }

  // ─── Admin: approve ───
  @Post(':payoutId/approve')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Approve payout (admin)' })
  async approve(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('payoutId', ParseUuidPipe) payoutId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: ApprovePayoutRequestDto = {
      payoutId,
      approvedBy: user.userId,
    };
    return this.commandBus.execute(new ApprovePayoutCommand(dto, user.userId));
  }

  // ─── Admin: reject ───
  @Post(':payoutId/reject')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Reject payout (admin)' })
  async reject(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('payoutId', ParseUuidPipe) payoutId: string,
    @Body() body: RejectBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: RejectPayoutRequestDto = {
      payoutId,
      rejectedBy: user.userId,
      reason: body.reason,
    };
    return this.commandBus.execute(new RejectPayoutCommand(dto, user.userId));
  }

  // ─── Admin: process ───
  @Post(':payoutId/process')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Move payout to processing (admin)' })
  async process(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('payoutId', ParseUuidPipe) payoutId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: ProcessPayoutRequestDto = {
      payoutId,
      processedBy: user.userId,
    };
    return this.commandBus.execute(new ProcessPayoutCommand(dto, user.userId));
  }

  // ─── Admin: mark paid ───
  @Post(':payoutId/mark-paid')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Mark payout as paid (admin)' })
  async markPaid(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('payoutId', ParseUuidPipe) payoutId: string,
    @Body() body: MarkPaidBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: MarkPayoutPaidRequestDto = {
      payoutId,
      transactionId: body.transactionId,
      reference: body.reference,
      paidBy: user.userId,
    };
    return this.commandBus.execute(new MarkPayoutPaidCommand(dto, user.userId));
  }

  // ─── Admin: fail ───
  @Post(':payoutId/fail')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Mark payout as failed (admin)' })
  async fail(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('payoutId', ParseUuidPipe) payoutId: string,
    @Body() body: FailBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: FailPayoutRequestDto = {
      payoutId,
      reason: body.reason,
      failedBy: user.userId,
    };
    return this.commandBus.execute(new FailPayoutCommand(dto, user.userId));
  }

  // ─── Cancel ───
  @Post(':payoutId/cancel')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Cancel a pending payout' })
  async cancel(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('payoutId', ParseUuidPipe) payoutId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: CancelPayoutRequestDto = {
      payoutId,
      cancelledBy: user.userId,
    };
    return this.commandBus.execute(new CancelPayoutCommand(dto, user.userId));
  }

  // ─── Read ───
  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'List payouts for vendor' })
  async list(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListPayoutsByVendorQuery(vendorId));
  }

  @Get('summary')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get payout summary' })
  async summary(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetPayoutSummaryQuery(vendorId));
  }

  @Get(':payoutId')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get payout by id' })
  async getById(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('payoutId', ParseUuidPipe) payoutId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetPayoutQuery(payoutId));
  }
}
