/**
 * Refund Swagger metadata helpers
 * @module payment-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  RefundHttpResponseDTO,
  RefundInitiateHttpResponseDTO,
  RefundListHttpResponseDTO,
  RefundStatsHttpResponseDTO,
} from '@interfaces/dtos/responses/refund.response.dto';

export const ApiRefundTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('refunds');

export function ApiRefundRequest(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Request a refund for a payment' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Refund requested',
      type: RefundInitiateHttpResponseDTO,
    }),
    ApiResponse({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      description: 'Refund not eligible',
    }),
  );
}

export function ApiRefundApprove(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Approve a refund' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Refund approved',
      type: RefundHttpResponseDTO,
    }),
  );
}

export function ApiRefundReject(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Reject a refund' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Refund rejected',
      type: RefundHttpResponseDTO,
    }),
  );
}

export function ApiRefundGet(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get refund by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Refund found',
      type: RefundHttpResponseDTO,
    }),
    ApiResponse({
      status: HTTP_STATUS.NOT_FOUND,
      description: 'Refund not found',
    }),
  );
}

export function ApiRefundList(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List refunds' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Refund list',
      type: RefundListHttpResponseDTO,
    }),
  );
}

export function ApiRefundStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get refund stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Refund stats',
      type: RefundStatsHttpResponseDTO,
    }),
  );
}
