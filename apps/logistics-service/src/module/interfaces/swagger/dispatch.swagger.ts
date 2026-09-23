import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const DispatchSwagger = {
  Tag: () => ApiTags('Dispatches'),
  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create dispatch' }),
      ApiResponse({ status: 201 }),
    ),
};
