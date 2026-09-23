import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const VehicleSwagger = {
  Tag: () => ApiTags('Vehicles'),
  Register: () =>
    applyDecorators(
      ApiOperation({ summary: 'Register vehicle' }),
      ApiResponse({ status: 201 }),
    ),
};
