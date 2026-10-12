/**
 * KPI Swagger Documentation
 */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KpiResponseDto, KpiResultResponseDto } from '../dtos/responses/kpi.response.dto.js';

export const ApiKpiTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('Analytics — KPIs');

export const ApiCreateKpi = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new KPI' }),
    ApiResponse({ status: HttpStatus.CREATED, type: KpiResponseDto }),
    ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY })
  );

export const ApiUpdateKpi = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Update an existing KPI' }),
    ApiResponse({ status: HttpStatus.OK, type: KpiResponseDto }),
    ApiResponse({ status: HttpStatus.NOT_FOUND })
  );

export const ApiEvaluateKpi = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({
      summary: 'Evaluate a KPI against an actual value',
      description: 'Returns achievement %, status, and alert flag.',
    }),
    ApiResponse({ status: HttpStatus.OK, type: KpiResultResponseDto }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'KPI already evaluated recently',
    })
  );

export const ApiGetKpi = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Get KPI by ID' }),
    ApiResponse({ status: HttpStatus.OK, type: KpiResponseDto }),
    ApiResponse({ status: HttpStatus.NOT_FOUND })
  );

export const ApiListKpis = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'List all KPIs (active or all)' }),
    ApiResponse({ status: HttpStatus.OK, type: [KpiResponseDto] })
  );
