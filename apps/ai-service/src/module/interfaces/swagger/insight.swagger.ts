import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InsightResponseDTO } from '../dtos/responses/insight.response.dto';

export const InsightSwagger = {
  Generate: () =>
    applyDecorators(
      ApiOperation({ summary: 'Generate insight from findings' }),
      ApiResponse({ status: 200, type: InsightResponseDTO }),
    ),
  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List active insights' }),
      ApiResponse({ status: 200, type: [InsightResponseDTO] }),
    ),
};
