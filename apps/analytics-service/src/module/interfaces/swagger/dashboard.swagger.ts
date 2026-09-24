import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateDashboardRequestDTO,
  UpdateDashboardRequestDTO,
  AddWidgetRequestDTO,
} from '../dtos/requests';
import {
  DashboardResponseDTO,
  WidgetResponseDTO,
} from '../dtos/responses';

export const DashboardSwagger = {
  Tag: () => ApiTags('Analytics — Dashboards'),

  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a new dashboard' }),
      ApiBody({ type: CreateDashboardRequestDTO }),
      ApiResponse({ status: 201, type: DashboardResponseDTO }),
    ),

  Update: () =>
    applyDecorators(
      ApiOperation({ summary: 'Update a dashboard' }),
      ApiParam({ name: 'id', required: true }),
      ApiBody({ type: UpdateDashboardRequestDTO }),
      ApiResponse({ status: 200, type: DashboardResponseDTO }),
    ),

  List: () =>
    applyDecorators(
      ApiOperation({ summary: 'List dashboards by owner' }),
      ApiResponse({ status: 200, type: [DashboardResponseDTO] }),
    ),

  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get dashboard by ID' }),
      ApiParam({ name: 'id', required: true }),
      ApiResponse({ status: 200, type: DashboardResponseDTO }),
      ApiResponse({ status: 404, description: 'Dashboard not found' }),
    ),

  AddWidget: () =>
    applyDecorators(
      ApiOperation({ summary: 'Add a widget to a dashboard' }),
      ApiParam({ name: 'id', required: true }),
      ApiBody({ type: AddWidgetRequestDTO }),
      ApiResponse({ status: 201, type: WidgetResponseDTO }),
    ),

  RemoveWidget: () =>
    applyDecorators(
      ApiOperation({ summary: 'Remove a widget from a dashboard' }),
      ApiParam({ name: 'id', required: true }),
      ApiParam({ name: 'widgetId', required: true }),
      ApiResponse({ status: 204, description: 'Widget removed' }),
    ),

  GetData: () =>
    applyDecorators(
      ApiOperation({ summary: 'Fetch dashboard data' }),
      ApiParam({ name: 'id', required: true }),
      ApiQuery({ name: 'fromDate', required: true, type: String }),
      ApiQuery({ name: 'toDate', required: true, type: String }),
      ApiResponse({ status: 200, type: [WidgetResponseDTO] }),
    ),
};
