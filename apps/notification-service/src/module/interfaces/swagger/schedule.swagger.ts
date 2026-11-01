/**
 * Schedule Swagger Helpers
 * @module notification-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

import {
  ScheduleHttpResponseDTO,
  ScheduleListHttpResponseDTO,
} from '@interfaces/dtos/responses/schedule.response.dto.js';

export const ApiScheduleTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('schedules');

export function ApiCreateSchedule(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a notification schedule' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Schedule created',
      type: ScheduleHttpResponseDTO,
    }),
  );
}

export function ApiUpdateSchedule(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update a schedule' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Schedule updated',
      type: ScheduleHttpResponseDTO,
    }),
  );
}

export function ApiCancelSchedule(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Cancel a schedule' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Schedule cancelled',
      type: ScheduleHttpResponseDTO,
    }),
  );
}

export function ApiGetSchedule(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get schedule by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Schedule found',
      type: ScheduleHttpResponseDTO,
    }),
  );
}

export function ApiListSchedules(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List schedules (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Schedules',
      type: ScheduleListHttpResponseDTO,
    }),
  );
}
