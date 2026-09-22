import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackingResponseDto } from '../dtos/responses/tracking.response.dto';

export const TrackingSwagger = {
  Tag: () => ApiTags('Tracking'),

  Add: () =>
    applyDecorators(
      ApiOperation({ summary: 'Add tracking info' }),
      ApiResponse({ status: 201, type: TrackingResponseDto }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List tracking by order' }),
      ApiResponse({ status: 200, type: [TrackingResponseDto] }),
    ),
};
