import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const TrackingSwagger = {
  Tag: () => ApiTags('Tracking'),
  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Track shipment' }),
      ApiResponse({ status: 200 }),
    ),
};
