/**
 * VendorSubscriptionController — subscription lifecycle
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
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, Public } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';
import { VendorOwnerGuard } from '../../guards/vendor-owner.guard.js';
import { VendorOwner } from '../../decorators/vendor-owner.decorator.js';

import { CreateSubscriptionCommand } from '../../../application/commands/subscription/create-subscription.command.js';
import { ChangeSubscriptionPlanCommand } from '../../../application/commands/subscription/change-subscription-plan.command.js';
import { CancelSubscriptionCommand } from '../../../application/commands/subscription/cancel-subscription.command.js';
import { RenewSubscriptionCommand } from '../../../application/commands/subscription/renew-subscription.command.js';

import { GetVendorSubscriptionQuery } from '../../../application/queries/subscription/get-vendor-subscription.query.js';
import { GetVendorSubscriptionPublicQuery } from '../../../application/queries/subscription/get-vendor-subscription-public.query.js';

import type { CreateSubscriptionRequestDto } from '../../../application/dtos/requests/create-subscription.dto.js';
import type { ChangeSubscriptionPlanRequestDto } from '../../../application/dtos/requests/change-subscription-plan.dto.js';
import type { CancelSubscriptionRequestDto } from '../../../application/dtos/requests/cancel-subscription.dto.js';
import type { RenewSubscriptionRequestDto } from '../../../application/dtos/requests/renew-subscription.dto.js';

interface CreateSubscriptionBody {
  readonly plan: string;
  readonly cycle: string;
  readonly price: number;
  readonly currency: string;
  readonly trialDays?: number;
  readonly features?: readonly string[];
  readonly idempotencyKey?: string;
}

interface ChangePlanBody {
  readonly newPlan: string;
  readonly newCycle?: string;
  readonly newPrice: number;
  readonly immediate: boolean;
  readonly idempotencyKey?: string;
}

interface CancelBody {
  readonly immediate: boolean;
  readonly reason?: string;
  readonly idempotencyKey?: string;
}

interface RenewBody {
  readonly paymentReference?: string;
  readonly idempotencyKey?: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_SUBSCRIPTION)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/subscription')
export class VendorSubscriptionController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Create subscription (admin/first-time) ───
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Create subscription' })
  async create(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: CreateSubscriptionBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: CreateSubscriptionRequestDto = {
      vendorId,
      plan: body.plan as never,
      cycle: body.cycle as never,
      price: body.price,
      currency: body.currency,
      trialDays: body.trialDays,
      features: body.features,
      idempotencyKey: body.idempotencyKey,
    };
    return this.commandBus.execute(new CreateSubscriptionCommand(dto, user.userId));
  }

  // ─── Change plan ───
  @Post('change-plan')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Change subscription plan' })
  async changePlan(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: ChangePlanBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: ChangeSubscriptionPlanRequestDto = {
      vendorId,
      newPlan: body.newPlan as never,
      newCycle: body.newCycle as never,
      newPrice: body.newPrice,
      immediate: body.immediate,
      idempotencyKey: body.idempotencyKey,
    };
    return this.commandBus.execute(new ChangeSubscriptionPlanCommand(dto, user.userId));
  }

  // ─── Cancel ───
  @Post('cancel')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Cancel subscription' })
  async cancel(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: CancelBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: CancelSubscriptionRequestDto = {
      vendorId,
      immediate: body.immediate,
      reason: body.reason,
      idempotencyKey: body.idempotencyKey,
    };
    return this.commandBus.execute(new CancelSubscriptionCommand(dto, user.userId));
  }

  // ─── Renew ───
  @Post('renew')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Renew subscription' })
  async renew(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: RenewBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: RenewSubscriptionRequestDto = {
      vendorId,
      paymentReference: body.paymentReference,
      idempotencyKey: body.idempotencyKey,
    };
    return this.commandBus.execute(new RenewSubscriptionCommand(dto, user.userId));
  }

  // ─── Read ───
  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get vendor subscription' })
  async get(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorSubscriptionQuery(vendorId));
  }

  @Get('public')
  @Public()
  @ApiOperation({ summary: 'Get public subscription view' })
  async getPublic(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorSubscriptionPublicQuery(vendorId));
  }
}
