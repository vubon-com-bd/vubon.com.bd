import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoiceResponseDto } from '../dtos/responses/invoice.response.dto';

export const InvoiceSwagger = {
  Tag: () => ApiTags('Invoices'),
  Generate: () =>
    applyDecorators(
      ApiOperation({ summary: 'Generate a new invoice' }),
      ApiResponse({ status: 201, type: InvoiceResponseDto }),
    ),
  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get an invoice by ID' }),
      ApiResponse({ status: 200, type: InvoiceResponseDto }),
      ApiResponse({ status: 404, description: 'Invoice not found' }),
    ),
};
