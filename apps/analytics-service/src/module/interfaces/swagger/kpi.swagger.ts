import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateKpiRequestDTO,
  UpdateKpiRequestDTO,
  EvaluateKpiRequestDTO,
} from '../dtos/requests';
import {
  KpiResponseDTO,
  KpiResultResponseDTO,
} from '../dtos/responses';

export const KpiSwagger = {
  Tag: () => ApiTags('Analytics — KPIs'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new KPI' }),
      ApiBody({ type: CreateKpiRequestDTO }),
      ApiResponse({ status: 201, type: KpiResponseDTO }),
    ),

  Update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update a KPI' }),
      ApiParam({ name: 'id', required: true }),
      ApiBody({ type: UpdateKpiRequestDTO }),
      ApiResponse({ status: 200, type: KpiResponseDTO }),
    ),

  Evaluate: () =>
    applyDecorators(
      ApiOperation({ summary: 'Evaluate a KPI against an actual value' }),
      ApiParam({ name: 'id', required: true }),
      ApiBody({ type: EvaluateKpiRequestDTO }),
      ApiResponse({ status: 200, type: KpiResultResponseDTO }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List KPIs' }),
      ApiResponse({ status: 200, type: [KpiResponseDTO] }),
    ),

  GetResults: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get KPI evaluation history' }),
      ApiParam({ name: 'id', required: true }),
      ApiResponse({ status: 200, type: [KpiResultResponseDTO] }),
    ),
};
