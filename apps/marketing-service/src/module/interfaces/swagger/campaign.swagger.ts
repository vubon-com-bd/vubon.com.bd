import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCampaignRequestDTO } from '../dtos/requests/campaign.request.dto';

export const CampaignSwagger = {
  Tag: () => ApiTags('Campaigns'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new campaign' }),
      ApiBody({ type: CreateCampaignRequestDTO }),
      ApiResponse({ status: 201, description: 'Campaign created' }),
      ApiResponse({ status: 400, description: 'Bad request' }),
    ),

  GetById: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get campaign by ID' }),
      ApiParam({ name: 'id', description: 'Campaign UUID' }),
      ApiResponse({ status: 200, description: 'Campaign found' }),
      ApiResponse({ status: 404, description: 'Campaign not found' }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List all campaigns' }),
      ApiResponse({ status: 200, description: 'Campaign list' }),
    ),

  Launch: () =>
    applyDecorators(
      ApiOperation({ summary: 'Launch a campaign' }),
      ApiResponse({ status: 200, description: 'Campaign launched' }),
    ),
};
