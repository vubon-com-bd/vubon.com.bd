import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MethodResponseDto } from '../dtos/responses/method.response.dto';

export const MethodSwagger = {
  Tag: () => ApiTags('Payment Methods'),

  Add: () =>
    applyDecorators(
      ApiOperation({ summary: 'Add a new payment method (tokenized only)' }),
      ApiResponse({ status: 201, type: MethodResponseDto }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List payment methods for current user' }),
      ApiResponse({ status: 200, type: [MethodResponseDto] }),
    ),
};
