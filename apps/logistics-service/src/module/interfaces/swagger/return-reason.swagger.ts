import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ReturnReasonHttpResponseDTO,
  ReturnReasonInitiateHttpResponseDTO,
  ReturnReasonListHttpResponseDTO,
  ReturnReasonStatsHttpResponseDTO,
} from '../dtos/responses/return-reason/return-reason.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiReturnReasonTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('return-reasons');

export function ApiCreateReturnReason(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new return reason' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: ReturnReasonInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}

export function ApiGetReturnReason(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get return reason by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ReturnReasonHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListReturnReasons(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List return reasons' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ReturnReasonListHttpResponseDTO }),
  );
}

export function ApiGetReturnReasonStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get return reason statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ReturnReasonStatsHttpResponseDTO }),
  );
}

export function ApiReturnReasonTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `ReturnReason: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: ReturnReasonHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
