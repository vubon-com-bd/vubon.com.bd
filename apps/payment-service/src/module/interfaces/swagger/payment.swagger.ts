/**
 * Swagger metadata helpers for Payment controller
 * @module payment-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { PaymentHttpResponseDTO } from '../dtos/responses/payment.response.dto.js';
import { PaymentInitiateHttpResponseDTO } from '../dtos/responses/payment.response.dto.js';

export function ApiPaymentInitiate(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Initiate a new payment' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Payment initiated',
      type: PaymentInitiateHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST, description: 'Invalid input' }),
  );
}

export function ApiPaymentGet(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get payment by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Payment found',
      type: PaymentHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Payment not found' }),
  );
}
