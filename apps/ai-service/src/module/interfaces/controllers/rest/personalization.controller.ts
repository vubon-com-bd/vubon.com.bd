import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { FeatureFlag } from '../../decorators/feature-flag.decorator';
import { GetProfileQuery } from '../../../application/queries/personalization/get-profile.query';
import { GetPersonalizationsQuery } from '../../../application/queries/personalization/get-personalizations.query';

@ApiTags('AI Personalization')
@Controller('v1/ai/personalization')
@UseGuards(RateLimitGuard, FeatureFlagGuard)
@FeatureFlag('aiPersonalization')
export class PersonalizationController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('profile/:userId')
  async getProfile(@Param('userId') userId: string): Promise<unknown> {
    return this.queryBus.execute(new GetProfileQuery(userId));
  }

  @Get('user/:userId')
  async list(@Param('userId') userId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPersonalizationsQuery(userId));
  }
}
