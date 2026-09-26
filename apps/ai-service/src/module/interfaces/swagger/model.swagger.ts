import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ModelResponseDTO } from '../dtos/responses/model.response.dto';

export const ModelSwagger = {
  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new AI model' }),
      ApiResponse({ status: 201, type: ModelResponseDTO }),
      ApiResponse({ status: 400, description: 'Validation failed' }),
      ApiResponse({ status: 403, description: 'Admin access required' }),
    ),
  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get AI model by ID' }),
      ApiResponse({ status: 200, type: ModelResponseDTO }),
      ApiResponse({ status: 404, description: 'Model not found' }),
    ),
  Deploy: () =>
    applyDecorators(
      ApiOperation({ summary: 'Deploy AI model' }),
      ApiResponse({ status: 200, type: ModelResponseDTO }),
      ApiResponse({ status: 409, description: 'Model not deployable' }),
    ),
};
