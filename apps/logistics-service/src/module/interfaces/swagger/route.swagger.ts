import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const RouteSwagger = {
  Tag: () => ApiTags('Routes'),
  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create route' }),
      ApiResponse({ status: 201 }),
    ),
};
