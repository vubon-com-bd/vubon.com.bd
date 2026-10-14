/**
 * VendorPayoutController — REST endpoints for payouts
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
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, type CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { RequestPayoutCommand } from '../../../application/commands/payout/request-payout.command.js';
import { ApprovePayoutCommand } from '../../../application/commands/payout/approve-payout.command.js';
import { RejectPayoutCommand } from '../../../application/commands/payout/reject-payout.command.js';
import { ProcessPayoutCommand } from '../../../application/commands/payout/process-payout.command.js';

import { GetPayoutQuery } from '../../../application/queries/payout/get-payout.query.js';
import { ListPayoutsQuery } from '../../../application/queries/payout/list-payouts.query.js';
import { GetPayoutSummaryQuery } from '../../../application/queries/payout/get-payout-summary.query.js';

import {
  RequestPayoutHttpDTO,
  ApprovePayoutHttpDTO,
  RejectPayoutHttpDTO,
  ProcessPayoutHttpDTO,
} from '../../dtos/requests/payout.request.dto.js';
import type {
  PayoutHttpResponseDTO,
  PayoutInitiateHttpResponseDTO,
  PayoutListHttpResponseDTO,
  PayoutStatsHttpResponseDTO,
} from '../../dtos/responses/payout.response.dto.js';

import { PayoutControllerMapper } from '../../mappers/payout.controller.mapper.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';

@ApiTags('vendor-payouts')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/payouts')
@UseGuards(JwtAuthGuard)
export class VendorPayoutController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Request a payout' })
  async request(
    @Param('vendorId') vendorId: string,
    @Body() dto: RequestPayoutHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<PayoutInitiateHttpResponseDTO> {
    const appDto = { ...PayoutControllerMapper.toRequestAppDto(dto), vendorId };
    return this.commandBus.execute(
      new RequestPayoutCommand(
        idempotencyKey ? { ...appDto, idempotencyKey } : appDto,
        user.userId,
      ),
    );
  }

  @Post(':payoutId/approve')
  @ApiOperation({ summary: 'Approve a pending payout' })
  async approve(
    @Param('payoutId') payoutId: string,
    @Body() dto: ApprovePayoutHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PayoutHttpResponseDTO> {
    return this.commandBus.execute(
      new ApprovePayoutCommand({ ...PayoutControllerMapper.toApproveAppDto(dto), payoutId }, user.userId),
    );
  }

  @Post(':payoutId/reject')
  @ApiOperation({ summary: 'Reject a pending payout' })
  async reject(
    @Param('payoutId') payoutId: string,
    @Body() dto: RejectPayoutHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PayoutHttpResponseDTO> {
    return this.commandBus.execute(
      new RejectPayoutCommand({ ...PayoutControllerMapper.toRejectAppDto(dto), payoutId }, user.userId),
    );
  }

  @Post(':payoutId/process')
  @ApiOperation({ summary: 'Mark payout as paid' })
  async process(
    @Param('payoutId') payoutId: string,
    @Body() dto: ProcessPayoutHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<PayoutHttpResponseDTO> {
    return this.commandBus.execute(
      new ProcessPayoutCommand({ ...PayoutControllerMapper.toProcessAppDto(dto), payoutId }, user.userId),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List payouts for a vendor' })
  async list(
    @Param('vendorId') vendorId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<PayoutListHttpResponseDTO> {
    return this.queryBus.execute(
      new ListPayoutsQuery({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 20,
        filter: { vendorId },
      }),
    );
  }

  @Get('summary')
  @ApiOperation({ summary: 'Payout stats for a vendor' })
  async summary(
    @Param('vendorId') vendorId: string,
  ): Promise<PayoutStatsHttpResponseDTO> {
    return this.queryBus.execute(new GetPayoutSummaryQuery(vendorId));
  }

  @Get(':payoutId')
  @ApiOperation({ summary: 'Get payout by ID' })
  async getById(
    @Param('payoutId') payoutId: string,
  ): Promise<PayoutHttpResponseDTO> {
    return this.queryBus.execute(new GetPayoutQuery(payoutId));
  }
}
