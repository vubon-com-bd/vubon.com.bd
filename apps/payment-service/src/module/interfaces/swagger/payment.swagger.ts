import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  PaymentResponseDto,
  PaymentPublicResponseDto,
} from '../dtos/responses/payment.response.dto';

export const PaymentSwagger = {
  Tag: () => ApiTags('Payments'),
  Auth: () => ApiBearerAuth(),

  Initiate: () =>
    applyDecorators(
      ApiOperation({ summary: 'Initiate a new payment' }),
      ApiResponse({ status: 201, type: PaymentResponseDto }),
      ApiResponse({ status: 400, description: 'Invalid input' }),
      ApiResponse({ status: 409, description: 'Duplicate idempotency key' }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a payment by ID' }),
      ApiResponse({ status: 200, type: PaymentPublicResponseDto }),
      ApiResponse({ status: 404, description: 'Payment not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List payments with pagination' }),
      ApiResponse({ status: 200, type: [PaymentPublicResponseDto] }),
    ),
};
