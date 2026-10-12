/**
 * Dashboard Swagger Documentation
 */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardResponseDto, WidgetResponseDto } from '../dtos/responses/dashboard.response.dto.js';

export const ApiDashboardTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('Analytics — Dashboards');

export const ApiCreateDashboard = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new dashboard' }),
    ApiResponse({ status: HttpStatus.CREATED, type: DashboardResponseDto }),
    ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY })
  );

export const ApiUpdateDashboard = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Update dashboard metadata' }),
    ApiResponse({ status: HttpStatus.OK, type: DashboardResponseDto }),
    ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Not owner' })
  );

export const ApiGetDashboard = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Get dashboard by ID' }),
    ApiResponse({ status: HttpStatus.OK, type: DashboardResponseDto }),
    ApiResponse({ status: HttpStatus.NOT_FOUND })
  );

export const ApiListDashboards = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'List dashboards accessible to user' }),
    ApiResponse({ status: HttpStatus.OK, type: [DashboardResponseDto] })
  );

export const ApiAddWidget = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Add a widget to dashboard' }),
    ApiResponse({ status: HttpStatus.CREATED, type: WidgetResponseDto }),
    ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Max widgets reached' })
  );

export const ApiRemoveWidget = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Remove a widget from dashboard' }),
    ApiResponse({ status: HttpStatus.OK, type: DashboardResponseDto }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Widget not found' })
  );
