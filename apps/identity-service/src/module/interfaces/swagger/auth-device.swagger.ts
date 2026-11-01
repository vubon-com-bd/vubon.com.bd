/**
 * Auth Device Swagger Metadata Helpers
 * @module identity-service/interfaces/swagger
 */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DeviceHttpResponseDTO } from '../dtos/responses/device/device.response.dto.js';
import { DeviceListHttpResponseDTO } from '../dtos/responses/device/device-list.response.dto.js';

export const ApiDeviceTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('auth-device');

export function ApiGetDevice(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Get device by ID' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: DeviceHttpResponseDTO,
      description: 'Device found',
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Device not found' }),
  );
}

export function ApiListDevices(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'List devices for current user' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: DeviceListHttpResponseDTO,
      description: 'Devices retrieved',
    }),
  );
}

export function ApiRegisterDevice(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Register a new device' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      type: DeviceHttpResponseDTO,
      description: 'Device registered',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Device limit exceeded',
    }),
  );
}

export function ApiTrustDevice(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Trust a device' }),
    ApiResponse({
      status: HttpStatus.OK,
      type: DeviceHttpResponseDTO,
      description: 'Device trusted',
    }),
  );
}

export function ApiRemoveDevice(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    ApiOperation({ summary: 'Remove a device' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Device removed' }),
  );
}
