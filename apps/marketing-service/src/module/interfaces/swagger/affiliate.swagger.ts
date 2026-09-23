import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const AffiliateSwagger = {
  Tag: () => ApiTags('Affiliates'),

  Register: () =>
    applyDecorators(
      ApiOperation({ summary: 'Register as an affiliate' }),
      ApiResponse({ status: 201, description: 'Affiliate registered' }),
    ),

  Approve: () =>
    applyDecorators(
      ApiOperation({ summary: 'Approve an affiliate' }),
      ApiResponse({ status: 200, description: 'Affiliate approved' }),
    ),
};
