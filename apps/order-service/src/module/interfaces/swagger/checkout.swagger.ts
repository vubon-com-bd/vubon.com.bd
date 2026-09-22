import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckoutResponseDto } from '../dtos/responses/checkout.response.dto';

export const CheckoutSwagger = {
  Tag: () => ApiTags('Checkout'),

  Start: () =>
    applyDecorators(
      ApiOperation({ summary: 'Start checkout session' }),
      ApiResponse({ status: 201, type: CheckoutResponseDto }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get checkout by ID' }),
      ApiResponse({ status: 200, type: CheckoutResponseDto }),
    ),
};
