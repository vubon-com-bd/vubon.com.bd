import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const BroadcastSwagger = {
  Tag: () => ApiTags('Broadcasts'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create broadcast' }),
      ApiResponse({ status: 201, description: 'Broadcast created' }),
    ),

  Start: () =>
    applyDecorators(
      ApiOperation({ summary: 'Start broadcast' }),
      ApiResponse({ status: 200, description: 'Broadcast started' }),
    ),

  Cancel: () =>
    applyDecorators(
      ApiOperation({ summary: 'Cancel broadcast' }),
      ApiResponse({ status: 200, description: 'Broadcast cancelled' }),
    ),
};
