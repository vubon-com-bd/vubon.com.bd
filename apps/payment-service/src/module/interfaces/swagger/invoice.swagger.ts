/**
 * Invoice Swagger metadata helpers
 * @module payment-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  InvoiceHttpResponseDTO,
  InvoiceListHttpResponseDTO,
  InvoiceStatsHttpResponseDTO,
} from '@interfaces/dtos/responses/invoice.response.dto';

export const ApiInvoiceTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('invoices');

export function ApiInvoiceGenerate(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Generate an invoice' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Invoice generated',
      type: InvoiceHttpResponseDTO,
    }),
  );
}

export function ApiInvoiceGet(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get invoice by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Invoice found',
      type: InvoiceHttpResponseDTO,
    }),
    ApiResponse({
      status: HTTP_STATUS.NOT_FOUND,
      description: 'Invoice not found',
    }),
  );
}

export function ApiInvoiceList(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List invoices' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Invoice list',
      type: InvoiceListHttpResponseDTO,
    }),
  );
}

export function ApiInvoiceStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get invoice stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Invoice stats',
      type: InvoiceStatsHttpResponseDTO,
    }),
  );
}
