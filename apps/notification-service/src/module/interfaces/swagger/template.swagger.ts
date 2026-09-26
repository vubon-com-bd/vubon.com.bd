import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const TemplateSwagger = {
  Tag: () => ApiTags('Templates'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create template' }),
      ApiResponse({ status: 201, description: 'Template created' }),
      ApiResponse({ status: 400, description: 'Invalid payload' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List templates' }),
      ApiResponse({ status: 200, description: 'Templates list' }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get template by ID' }),
      ApiResponse({ status: 200, description: 'Template found' }),
      ApiResponse({ status: 404, description: 'Template not found' }),
    ),

  Update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update template' }),
      ApiResponse({ status: 200, description: 'Template updated' }),
    ),
};
