import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { CheckoutHttpResponseDTO } from '../dtos/responses/checkout.response.dto.js';

export function ApiCheckoutStart(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Start a new checkout' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Checkout started',
      type: CheckoutHttpResponseDTO,
    }),
  );
}
