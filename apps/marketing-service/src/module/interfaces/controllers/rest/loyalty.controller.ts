import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { EarnPointsCommand } from '../../../application/commands/loyalty/earn-points.command';
import { RedeemPointsCommand } from '../../../application/commands/loyalty/redeem-points.command';
import { UpgradeTierCommand } from '../../../application/commands/loyalty/upgrade-tier.command';
import { ClaimRewardCommand } from '../../../application/commands/loyalty/claim-reward.command';
import { GetLoyaltyQuery } from '../../../application/queries/loyalty/get-loyalty.query';
import { ListLoyaltyRewardsQuery } from '../../../application/queries/loyalty/list-loyalty-rewards.query';
import {
  EarnPointsRequestDTO,
  RedeemPointsRequestDTO,
  UpgradeTierRequestDTO,
  ClaimRewardRequestDTO,
} from '../../dtos/requests/loyalty.request.dto';
import {
  LoyaltyResponseDto,
  LoyaltyRewardResponseDto,
} from '../../dtos/responses/loyalty.response.dto';
import { LoyaltySwagger } from '../../swagger/loyalty.swagger';

@LoyaltySwagger.Tag()
@Controller('loyalty')
@UseGuards(JwtAuthGuard)
export class LoyaltyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @LoyaltySwagger.Get()
  async get(@CurrentUser() user: CurrentUserShape): Promise<LoyaltyResponseDto | null> {
    const result = await this.queryBus.execute(new GetLoyaltyQuery(user.userId));
    return result as LoyaltyResponseDto | null;
  }

  @Post('earn')
  @HttpCode(HttpStatus.OK)
  @LoyaltySwagger.EarnPoints()
  async earn(@Body() body: EarnPointsRequestDTO): Promise<LoyaltyResponseDto> {
    const result = await this.commandBus.execute(
      new EarnPointsCommand(body.userId, body.points, body.reason, body.orderId),
    );
    return result as LoyaltyResponseDto;
  }

  @Post('redeem')
  @HttpCode(HttpStatus.OK)
  @LoyaltySwagger.RedeemPoints()
  async redeem(@Body() body: RedeemPointsRequestDTO): Promise<LoyaltyResponseDto> {
    const result = await this.commandBus.execute(
      new RedeemPointsCommand(body.userId, body.points),
    );
    return result as LoyaltyResponseDto;
  }

  @Post('upgrade')
  @HttpCode(HttpStatus.OK)
  async upgrade(@Body() body: UpgradeTierRequestDTO): Promise<LoyaltyResponseDto> {
    const result = await this.commandBus.execute(
      new UpgradeTierCommand(body.userId, body.targetTier),
    );
    return result as LoyaltyResponseDto;
  }

  @Get('rewards')
  @LoyaltySwagger.Reward()
  async listRewards(): Promise<readonly LoyaltyRewardResponseDto[]> {
    const result = await this.queryBus.execute(new ListLoyaltyRewardsQuery());
    return result as readonly LoyaltyRewardResponseDto[];
  }

  @Post('rewards/claim')
  @HttpCode(HttpStatus.NO_CONTENT)
  async claimReward(@Body() body: ClaimRewardRequestDTO): Promise<void> {
    await this.commandBus.execute(new ClaimRewardCommand(body.userId, body.rewardId));
  }

  @Get('tier/:tier')
  @LoyaltySwagger.Tier()
  async getTier(@Param('tier') tier: string): Promise<unknown> {
    void tier;
    return { tier };
  }
}
