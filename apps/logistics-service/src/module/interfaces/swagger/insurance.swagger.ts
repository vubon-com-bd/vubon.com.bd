import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  InsuranceHttpResponseDTO,
  InsuranceInitiateHttpResponseDTO,
  InsuranceListHttpResponseDTO,
  InsuranceStatsHttpResponseDTO,
} from '../dtos/responses/insurance/insurance.response.dto.js';
import { SWAGGER_RESPONSES } from './swagger.constants.js';

export const ApiInsuranceTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('insurances');

export function ApiCreateInsurance(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new insurance policy' }),
    ApiResponse({ ...SWAGGER_RESPONSES.CREATED, type: InsuranceInitiateHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.UNAUTHORIZED),
  );
}

export function ApiGetInsurance(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get insurance by ID' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: InsuranceHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
  );
}

export function ApiListInsurances(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'List insurance policies' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: InsuranceListHttpResponseDTO }),
  );
}

export function ApiGetInsuranceStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get insurance statistics' }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: InsuranceStatsHttpResponseDTO }),
  );
}

export function ApiInsuranceTransition(action: string): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: `Insurance: ${action}` }),
    ApiResponse({ ...SWAGGER_RESPONSES.OK, type: InsuranceHttpResponseDTO }),
    ApiResponse(SWAGGER_RESPONSES.BAD_REQUEST),
    ApiResponse(SWAGGER_RESPONSES.NOT_FOUND),
    ApiResponse(SWAGGER_RESPONSES.CONFLICT),
  );
}
