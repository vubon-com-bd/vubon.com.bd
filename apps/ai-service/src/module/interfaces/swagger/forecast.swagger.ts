import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ForecastResponseDTO } from '../dtos/responses/forecast.response.dto';

export const ForecastSwagger = {
  Generate: () =>
    applyDecorators(
      ApiOperation({ summary: 'Generate forecast for a target' }),
      ApiResponse({ status: 200, type: ForecastResponseDTO }),
    ),
};
