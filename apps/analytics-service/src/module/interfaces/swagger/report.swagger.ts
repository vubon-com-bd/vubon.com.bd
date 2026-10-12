/**
 * Report Swagger Documentation
 */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReportResponseDto } from '../dtos/responses/report.response.dto.js';

export const ApiReportTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('Analytics — Reports');

export const ApiCreateReport = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new report' }),
    ApiResponse({ status: HttpStatus.CREATED, type: ReportResponseDto }),
    ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY })
  );

export const ApiGenerateReport = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({
      summary: 'Trigger report generation',
      description: 'Triggers report artifact generation. Long-running → 202.',
    }),
    ApiResponse({ status: HttpStatus.ACCEPTED, type: ReportResponseDto }),
    ApiResponse({ status: HttpStatus.CONFLICT, description: 'Report not pending' })
  );

export const ApiScheduleReport = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Schedule a recurring report' }),
    ApiResponse({ status: HttpStatus.OK, type: ReportResponseDto }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Invalid frequency',
    })
  );

export const ApiExportReport = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Export report in a specific format' }),
    ApiResponse({ status: HttpStatus.OK, type: ReportResponseDto }),
    ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Export limit exceeded' })
  );

export const ApiGetReport = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Get report by ID' }),
    ApiResponse({ status: HttpStatus.OK, type: ReportResponseDto }),
    ApiResponse({ status: HttpStatus.NOT_FOUND })
  );

export const ApiListReports = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'List reports owned by user' }),
    ApiResponse({ status: HttpStatus.OK, type: [ReportResponseDto] })
  );

export const ApiListScheduledReports = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'List all scheduled reports' }),
    ApiResponse({ status: HttpStatus.OK, type: [ReportResponseDto] })
  );
