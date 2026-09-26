import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefundResponseDto } from '../dtos/responses/refund.response.dto';

export const RefundSwagger = {
  Tag: () => ApiTags('Refunds'),

  Request: () =>
    applyDecorators(
      ApiOperation({ summary: 'Request a refund for a payment' }),
      ApiResponse({ status: 201, type: RefundResponseDto }),
      ApiResponse({ status: 400, description: 'Refund not allowed' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List refunds for a payment' }),
      ApiResponse({ status: 200, type: [RefundResponseDto] }),
    ),
};
