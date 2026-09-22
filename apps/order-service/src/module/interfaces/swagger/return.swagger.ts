import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReturnResponseDto } from '../dtos/responses/return.response.dto';

export const ReturnSwagger = {
  Tag: () => ApiTags('Return'),

  Request: () =>
    applyDecorators(
      ApiOperation({ summary: 'Request order return' }),
      ApiResponse({ status: 201, type: ReturnResponseDto }),
    ),

  Approve: () =>
    applyDecorators(
      ApiOperation({ summary: 'Approve return request' }),
      ApiResponse({ status: 200, type: ReturnResponseDto }),
    ),
};
