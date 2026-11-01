/**
 * VendorSubscriptionController — REST endpoints for subscriptions
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
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { CurrentUser, type CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateSubscriptionCommand } from '../../../application/commands/subscription/create-subscription.command.js';
import { UpgradeSubscriptionCommand } from '../../../application/commands/subscription/upgrade-subscription.command.js';
import { DowngradeSubscriptionCommand } from '../../../application/commands/subscription/downgrade-subscription.command.js';
import { CancelSubscriptionCommand } from '../../../application/commands/subscription/cancel-subscription.command.js';

import { GetSubscriptionQuery } from '../../../application/queries/subscription/get-subscription.query.js';
import { ListPlansQuery } from '../../../application/queries/subscription/list-plans.query.js';

import {
  CreateSubscriptionHttpDTO,
  UpgradeSubscriptionHttpDTO,
  DowngradeSubscriptionHttpDTO,
  CancelSubscriptionHttpDTO,
} from '../../dtos/requests/subscription.request.dto.js';
import type {
  SubscriptionHttpResponseDTO,
  SubscriptionPlanListHttpResponseDTO,
} from '../../dtos/responses/subscription.response.dto.js';

import { SubscriptionControllerMapper } from '../../mappers/subscription.controller.mapper.js';

@ApiTags('vendor-subscriptions')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/subscriptions')
@UseGuards(JwtAuthGuard)
export class VendorSubscriptionController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a subscription' })
  async create(
    @Param('vendorId') vendorId: string,
    @Body() dto: CreateSubscriptionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<SubscriptionHttpResponseDTO> {
    return this.commandBus.execute(
      new CreateSubscriptionCommand(
        { ...SubscriptionControllerMapper.toCreateAppDto(dto), vendorId },
        user.userId,
      ),
    );
  }

  @Post(':subscriptionId/upgrade')
  @ApiOperation({ summary: 'Upgrade subscription' })
  async upgrade(
    @Param('subscriptionId') subscriptionId: string,
    @Body() dto: UpgradeSubscriptionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<SubscriptionHttpResponseDTO> {
    return this.commandBus.execute(
      new UpgradeSubscriptionCommand(
        SubscriptionControllerMapper.toUpgradeAppDto(subscriptionId, dto),
        user.userId,
      ),
    );
  }

  @Post(':subscriptionId/downgrade')
  @ApiOperation({ summary: 'Downgrade subscription' })
  async downgrade(
    @Param('subscriptionId') subscriptionId: string,
    @Body() dto: DowngradeSubscriptionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<SubscriptionHttpResponseDTO> {
    return this.commandBus.execute(
      new DowngradeSubscriptionCommand(
        SubscriptionControllerMapper.toDowngradeAppDto(subscriptionId, dto),
        user.userId,
      ),
    );
  }

  @Post(':subscriptionId/cancel')
  @ApiOperation({ summary: 'Cancel subscription' })
  async cancel(
    @Param('subscriptionId') subscriptionId: string,
    @Body() dto: CancelSubscriptionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<SubscriptionHttpResponseDTO> {
    return this.commandBus.execute(
      new CancelSubscriptionCommand(
        SubscriptionControllerMapper.toCancelAppDto(subscriptionId, dto),
        user.userId,
      ),
    );
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current active subscription' })
  async current(
    @Param('vendorId') vendorId: string,
  ): Promise<SubscriptionHttpResponseDTO | null> {
    return this.queryBus.execute(new GetSubscriptionQuery(vendorId));
  }

  @Get('plans')
  @Public()
  @ApiOperation({ summary: 'List available plans' })
  async listPlans(): Promise<SubscriptionPlanListHttpResponseDTO> {
    return this.queryBus.execute(new ListPlansQuery());
  }
}
