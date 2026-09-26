import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateSubscriptionCommand } from '../../../application/commands/subscription';
import { UpgradeSubscriptionCommand } from '../../../application/commands/subscription';
import { DowngradeSubscriptionCommand } from '../../../application/commands/subscription';
import { CancelSubscriptionCommand } from '../../../application/commands/subscription';
import { GetSubscriptionQuery } from '../../../application/queries/subscription';
import { ListPlansQuery } from '../../../application/queries/subscription';
import {
  CreateSubscriptionRequestDto,
  UpgradeSubscriptionRequestDto,
  DowngradeSubscriptionRequestDto,
  CancelSubscriptionRequestDto,
} from '../../dtos/requests/subscription.request.dto';

@ApiTags('Vendor Subscription')
@ApiBearerAuth()
@Controller('vendors/subscription')
@UseGuards(JwtAuthGuard)
export class VendorSubscriptionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('me')
  async get(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new GetSubscriptionQuery(user.userId));
  }

  @Get('plans')
  async plans(): Promise<unknown> {
    return this.queryBus.execute(new ListPlansQuery());
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: CreateSubscriptionRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateSubscriptionCommand(user.userId, body.plan, body.autoRenew),
    );
  }

  @Post('upgrade')
  @HttpCode(HttpStatus.OK)
  async upgrade(@Body() body: UpgradeSubscriptionRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new UpgradeSubscriptionCommand(body.subscriptionId, body.plan),
    );
  }

  @Post('downgrade')
  @HttpCode(HttpStatus.OK)
  async downgrade(@Body() body: DowngradeSubscriptionRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new DowngradeSubscriptionCommand(body.subscriptionId, body.plan),
    );
  }

  @Delete('cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancel(@Body() body: CancelSubscriptionRequestDto): Promise<void> {
    return this.commandBus.execute(
      new CancelSubscriptionCommand(body.subscriptionId, body.reason),
    );
  }
}
