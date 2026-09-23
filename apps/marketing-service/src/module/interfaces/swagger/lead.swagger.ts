import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLeadRequestDTO } from '../dtos/requests/lead.request.dto';

export const LeadSwagger = {
  Tag: () => ApiTags('Leads'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a lead' }),
      ApiBody({ type: CreateLeadRequestDTO }),
      ApiResponse({ status: 201, description: 'Lead created' }),
    ),

  Qualify: () =>
    applyDecorators(
      ApiOperation({ summary: 'Qualify a lead' }),
      ApiResponse({ status: 200, description: 'Lead qualified' }),
    ),

  Convert: () =>
    applyDecorators(
      ApiOperation({ summary: 'Convert a lead' }),
      ApiResponse({ status: 200, description: 'Lead converted' }),
    ),
};
