import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const LoyaltySwagger = {
  Tag: () => ApiTags('Loyalty'),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get loyalty account' }),
      ApiResponse({ status: 200, description: 'Loyalty account' }),
    ),

  EarnPoints: () =>
    applyDecorators(
      ApiOperation({ summary: 'Earn loyalty points' }),
      ApiResponse({ status: 200, description: 'Points earned' }),
    ),

  RedeemPoints: () =>
    applyDecorators(
      ApiOperation({ summary: 'Redeem loyalty points' }),
      ApiResponse({ status: 200, description: 'Points redeemed' }),
    ),

  Tier: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get loyalty tier details' }),
      ApiResponse({ status: 200, description: 'Tier details' }),
    ),

  Reward: () =>
    applyDecorators(
      ApiOperation({ summary: 'List loyalty rewards' }),
      ApiResponse({ status: 200, description: 'Reward list' }),
    ),
};
