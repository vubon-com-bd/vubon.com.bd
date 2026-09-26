import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PayoutResponseDto } from '../dtos/responses/payout.response.dto';

export const PayoutSwagger = {
  Tag: () => ApiTags('Payouts'),

  Request: () =>
    applyDecorators(
      ApiOperation({ summary: 'Request a payout' }),
      ApiResponse({ status: 201, type: PayoutResponseDto }),
    ),

  Process: () =>
    applyDecorators(
      ApiOperation({ summary: 'Process a payout' }),
      ApiResponse({ status: 200, type: PayoutResponseDto }),
    ),
};
