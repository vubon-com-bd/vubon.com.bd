/**
 * Payment Swagger metadata helpers
 * @module payment-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  PaymentHttpResponseDTO,
  PaymentInitiateHttpResponseDTO,
  PaymentListHttpResponseDTO,
  PaymentStatsHttpResponseDTO,
  PaymentPublicHttpResponseDTO,
} from '@interfaces/dtos/responses/payment.response.dto';

export const ApiPaymentTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('payments');

export function ApiPaymentInitiate(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Initiate a new payment' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Payment initiated',
      type: PaymentInitiateHttpResponseDTO,
    }),
    ApiResponse({
      status: HTTP_STATUS.BAD_REQUEST,
      description: 'Invalid payload',
    }),
    ApiResponse({
      status: HTTP_STATUS.UNAUTHORIZED,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: HTTP_STATUS.CONFLICT,
      description: 'Idempotency conflict',
    }),
  );
}

export function ApiPaymentConfirm(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Confirm a payment (gateway callback)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Payment confirmed',
      type: PaymentHttpResponseDTO,
    }),
    ApiResponse({
      status: HTTP_STATUS.NOT_FOUND,
      description: 'Payment not found',
    }),
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
    ApiResponse({
      status: HTTP_STATUS.NOT_FOUND,
      description: 'Payment not found',
    }),
  );
}

export function ApiPaymentPublic(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get public payment view (no PII)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Payment public view',
      type: PaymentPublicHttpResponseDTO,
    }),
  );
}

export function ApiPaymentList(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List payments (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Payment list',
      type: PaymentListHttpResponseDTO,
    }),
  );
}

export function ApiPaymentStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get payment stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Payment stats',
      type: PaymentStatsHttpResponseDTO,
    }),
  );
}
