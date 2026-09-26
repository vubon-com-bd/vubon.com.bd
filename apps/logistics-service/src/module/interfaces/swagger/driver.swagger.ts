import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const DriverSwagger = {
  Tag: () => ApiTags('Drivers'),
  Register: () =>
    applyDecorators(
      ApiOperation({ summary: 'Register driver' }),
      ApiResponse({ status: 201 }),
    ),
};
