import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { TrackingHttpResponseDTO } from '../dtos/responses/tracking.response.dto.js';

export function ApiTrackingAdd(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Add a tracking event' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Tracking event added',
      type: TrackingHttpResponseDTO,
    }),
  );
}
