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
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CreateReferralCommand } from '../../../application/commands/referral/create-referral.command';
import { TrackReferralCommand } from '../../../application/commands/referral/track-referral.command';
import { RedeemReferralRewardCommand } from '../../../application/commands/referral/redeem-reward.command';

@Controller('referrals')
@UseGuards(JwtAuthGuard)
export class ReferralController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: { referrerId: string; code?: string },
  ): Promise<unknown> {
    return this.commandBus.execute(new CreateReferralCommand(body.referrerId, body.code));
  }

  @Post('track')
  @HttpCode(HttpStatus.OK)
  async track(
    @Body() body: { code: string; refereeId?: string },
  ): Promise<void> {
    await this.commandBus.execute(new TrackReferralCommand(body.code, body.refereeId));
  }

  @Post(':id/redeem')
  @HttpCode(HttpStatus.OK)
  async redeem(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: { userId: string },
  ): Promise<void> {
    await this.commandBus.execute(new RedeemReferralRewardCommand(id, body.userId));
  }

  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<unknown> {
    void id;
    return { id };
  }
}
