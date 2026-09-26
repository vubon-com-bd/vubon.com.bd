import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateReportRequestDTO,
  GenerateReportRequestDTO,
  ScheduleReportRequestDTO,
  ExportReportRequestDTO,
} from '../dtos/requests';
import {
  ReportResponseDTO,
  ExportReportResponseDTO,
} from '../dtos/responses';

export const ReportSwagger = {
  Tag: () => ApiTags('Analytics — Reports'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new report' }),
      ApiBody({ type: CreateReportRequestDTO }),
      ApiResponse({ status: 201, type: ReportResponseDTO }),
    ),

  Generate: () =>
    applyDecorators(
      ApiOperation({ summary: 'Generate a report' }),
      ApiParam({ name: 'id', required: true }),
      ApiBody({ type: GenerateReportRequestDTO }),
      ApiResponse({ status: 200, type: ReportResponseDTO }),
      ApiResponse({ status: 404, description: 'Report not found' }),
    ),

  Schedule: () =>
    applyDecorators(
      ApiOperation({ summary: 'Schedule a report' }),
      ApiParam({ name: 'id', required: true }),
      ApiBody({ type: ScheduleReportRequestDTO }),
      ApiResponse({ status: 200, type: ReportResponseDTO }),
    ),

  Export: () =>
    applyDecorators(
      ApiOperation({ summary: 'Export a report' }),
      ApiParam({ name: 'id', required: true }),
      ApiBody({ type: ExportReportRequestDTO }),
      ApiResponse({ status: 200, type: ExportReportResponseDTO }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List reports by owner' }),
      ApiResponse({ status: 200, type: [ReportResponseDTO] }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get a report by ID' }),
      ApiParam({ name: 'id', required: true }),
      ApiResponse({ status: 200, type: ReportResponseDTO }),
      ApiResponse({ status: 404, description: 'Report not found' }),
    ),
};
