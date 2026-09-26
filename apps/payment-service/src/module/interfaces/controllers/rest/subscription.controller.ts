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
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CreateSubscriptionCommand } from '../../../application/commands/subscription/create-subscription.command';
import { UpgradeSubscriptionCommand } from '../../../application/commands/subscription/upgrade-subscription.command';
import { DowngradeSubscriptionCommand } from '../../../application/commands/subscription/downgrade-subscription.command';
import { PauseSubscriptionCommand } from '../../../application/commands/subscription/pause-subscription.command';
import { CancelSubscriptionCommand } from '../../../application/commands/subscription/cancel-subscription.command';
import { ListSubscriptionsQuery } from '../../../application/queries/subscription/list-subscriptions.query';
import { GetSubscriptionQuery } from '../../../application/queries/subscription/get-subscription.query';
import {
  CreateSubscriptionRequestDto,
  UpgradeSubscriptionRequestDto,
  CancelSubscriptionRequestDto,
} from '../../dtos/requests/subscription.request.dto';
import { SubscriptionSwagger } from '../../swagger/subscription.swagger';

@SubscriptionSwagger.Tag()
@Controller('v1/subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SubscriptionSwagger.Create()
  async create(@Body() body: CreateSubscriptionRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CreateSubscriptionCommand(
        '',
        body.plan,
        body.currentPeriodFrom,
        body.currentPeriodTo,
        body.paymentMethodId,
      ),
    );
  }

  @Post('upgrade')
  @HttpCode(HttpStatus.OK)
  async upgrade(@Body() body: UpgradeSubscriptionRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new UpgradeSubscriptionCommand(body.subscriptionId, body.newPlan),
    );
  }

  @Post('downgrade')
  @HttpCode(HttpStatus.OK)
  async downgrade(@Body() body: UpgradeSubscriptionRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new DowngradeSubscriptionCommand(body.subscriptionId, body.newPlan),
    );
  }

  @Post('pause')
  @HttpCode(HttpStatus.OK)
  async pause(@Body() body: { subscriptionId: string; reason?: string }): Promise<unknown> {
    return this.commandBus.execute(
      new PauseSubscriptionCommand(body.subscriptionId, body.reason),
    );
  }

  @Post('cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(@Body() body: CancelSubscriptionRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CancelSubscriptionCommand(body.subscriptionId, body.reason),
    );
  }

  @Get('user/:userId')
  @SubscriptionSwagger.List()
  async listByUser(@Param('userId') userId: string): Promise<unknown> {
    return this.queryBus.execute(new ListSubscriptionsQuery(userId));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetSubscriptionQuery(id));
  }
}
