/**
 * SubscriptionController
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

import { CreateSubscriptionCommand } from '@application/commands/subscription/create-subscription.command';
import { UpgradeSubscriptionCommand } from '@application/commands/subscription/upgrade-subscription.command';
import { DowngradeSubscriptionCommand } from '@application/commands/subscription/downgrade-subscription.command';
import { PauseSubscriptionCommand } from '@application/commands/subscription/pause-subscription.command';
import { CancelSubscriptionCommand } from '@application/commands/subscription/cancel-subscription.command';
import { GetSubscriptionQuery } from '@application/queries/subscription/get-subscription.query';
import { ListSubscriptionsQuery } from '@application/queries/subscription/list-subscriptions.query';

import {
  CreateSubscriptionHttpDTO,
  UpgradeSubscriptionHttpDTO,
  DowngradeSubscriptionHttpDTO,
  PauseSubscriptionHttpDTO,
  CancelSubscriptionHttpDTO,
  ListSubscriptionsHttpQueryDTO,
} from '@interfaces/dtos/requests/subscription.request.dto';
import type {
  SubscriptionHttpResponseDTO,
  SubscriptionListHttpResponseDTO,
} from '@interfaces/dtos/responses/subscription.response.dto';

import { SubscriptionControllerMapper } from '@interfaces/mappers/subscription.controller.mapper';
import { ApiSubscriptionTag } from '@interfaces/swagger/subscription.swagger';

@ApiSubscriptionTag()
@ApiBearerAuth('bearer')
@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateSubscriptionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<SubscriptionHttpResponseDTO> {
    const appDto = SubscriptionControllerMapper.toCreateAppDto(dto);
    return this.commandBus.execute(
      new CreateSubscriptionCommand(appDto, user.userId),
    );
  }

  @Post(':id/upgrade')
  @HttpCode(HttpStatus.OK)
  async upgrade(
    @Param('id') id: string,
    @Body() dto: UpgradeSubscriptionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<SubscriptionHttpResponseDTO> {
    return this.commandBus.execute(
      new UpgradeSubscriptionCommand(
        {
          subscriptionId: id,
          newPlan: dto.newPlan as never,
          newPrice: dto.newPrice,
          currency: dto.currency,
          prorate: dto.prorate,
        },
        user.userId,
      ),
    );
  }

  @Post(':id/downgrade')
  @HttpCode(HttpStatus.OK)
  async downgrade(
    @Param('id') id: string,
    @Body() dto: DowngradeSubscriptionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<SubscriptionHttpResponseDTO> {
    return this.commandBus.execute(
      new DowngradeSubscriptionCommand(
        {
          subscriptionId: id,
          newPlan: dto.newPlan as never,
          newPrice: dto.newPrice,
          currency: dto.currency,
          effectiveAt: dto.effectiveAt,
        },
        user.userId,
      ),
    );
  }

  @Post(':id/pause')
  @HttpCode(HttpStatus.OK)
  async pause(
    @Param('id') id: string,
    @Body() dto: PauseSubscriptionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<SubscriptionHttpResponseDTO> {
    return this.commandBus.execute(
      new PauseSubscriptionCommand(
        { subscriptionId: id, resumeAt: dto.resumeAt, reason: dto.reason },
        user.userId,
      ),
    );
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(
    @Param('id') id: string,
    @Body() dto: CancelSubscriptionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<SubscriptionHttpResponseDTO> {
    return this.commandBus.execute(
      new CancelSubscriptionCommand(
        {
          subscriptionId: id,
          reason: dto.reason,
          cancelAtPeriodEnd: dto.cancelAtPeriodEnd,
        },
        user.userId,
      ),
    );
  }

  @Get()
  async list(
    @Query() q: ListSubscriptionsHttpQueryDTO,
  ): Promise<SubscriptionListHttpResponseDTO> {
    const options = SubscriptionControllerMapper.toListOptions(q);
    return this.queryBus.execute(new ListSubscriptionsQuery(
      options.page,
      options.limit,
      options.filter,
      options.sortBy,
      options.sortDir,
    ));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<SubscriptionHttpResponseDTO> {
    return this.queryBus.execute(new GetSubscriptionQuery(id));
  }
}
