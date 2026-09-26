import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CancelResponseDto } from '../dtos/responses/cancel.response.dto';

export const CancelSwagger = {
  Tag: () => ApiTags('Cancel'),

  Request: () =>
    applyDecorators(
      ApiOperation({ summary: 'Request order cancellation' }),
      ApiResponse({ status: 201, type: CancelResponseDto }),
    ),

  Approve: () =>
    applyDecorators(
      ApiOperation({ summary: 'Approve cancel request' }),
      ApiResponse({ status: 200, type: CancelResponseDto }),
    ),
};
