import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const ShipmentSwagger = {
  Tag: () => ApiTags('Shipments'),
  Create: () =>
    applyDecorators(
      ApiOperation({ summary: 'Create shipment' }),
      ApiResponse({ status: 201, description: 'Shipment created' }),
    ),
  Get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get shipment' }),
      ApiResponse({ status: 200, description: 'Shipment details' }),
    ),
};
