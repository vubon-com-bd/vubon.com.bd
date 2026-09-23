import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const ReturnShipmentSwagger = {
  Tag: () => ApiTags('Returns'),
  Request: () =>
    applyDecorators(
      ApiOperation({ summary: 'Request return' }),
      ApiResponse({ status: 201 }),
    ),
};
