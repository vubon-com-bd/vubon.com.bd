import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const ScheduleSwagger = {
  Tag: () => ApiTags('Schedules'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create schedule' }),
      ApiResponse({ status: 201, description: 'Schedule created' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List schedules' }),
      ApiResponse({ status: 200, description: 'Schedules list' }),
    ),

  Cancel: () =>
    applyDecorators(
      ApiOperation({ summary: 'Cancel schedule' }),
      ApiResponse({ status: 200, description: 'Schedule cancelled' }),
    ),
};
