/**
 * Template Swagger Helpers
 * @module notification-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

import {
  TemplateHttpResponseDTO,
  TemplateListHttpResponseDTO,
  TemplateRenderHttpResponseDTO,
} from '@interfaces/dtos/responses/template.response.dto.js';

export const ApiTemplateTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('templates');

export function ApiCreateTemplate(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a notification template' }),
    ApiResponse({
      status: HTTP_STATUS.CREATED,
      description: 'Template created',
      type: TemplateHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.BAD_REQUEST, description: 'Invalid input' }),
    ApiResponse({ status: HTTP_STATUS.CONFLICT, description: 'Slug conflict' }),
  );
}

export function ApiUpdateTemplate(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update a notification template' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Template updated',
      type: TemplateHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Not found' }),
  );
}

export function ApiTestTemplate(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Test render a template' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Rendered output',
      type: TemplateRenderHttpResponseDTO,
    }),
  );
}

export function ApiGetTemplate(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get template by ID' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Template found',
      type: TemplateHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Not found' }),
  );
}

export function ApiListTemplates(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List templates (paginated)' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Templates',
      type: TemplateListHttpResponseDTO,
    }),
  );
}
