import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  PackagingHttpResponseDTO,
  PackagingInitiateHttpResponseDTO,
  PackagingListHttpResponseDTO,
  PackagingStatsHttpResponseDTO,
} from '../dtos/responses/packaging/packaging.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiPackagingTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('packagings');

export function ApiCreatePackaging(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new packaging' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: PackagingInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetPackaging(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get packaging by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: PackagingHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListPackagings(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List packagings' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: PackagingListHttpResponseDTO }),
  );
}

export function ApiGetPackagingStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get packaging statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: PackagingStatsHttpResponseDTO }),
  );
}

export function ApiPackagingTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Packaging: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: PackagingHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
