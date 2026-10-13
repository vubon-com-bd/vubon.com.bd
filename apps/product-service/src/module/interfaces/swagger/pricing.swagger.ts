/**
 * Pricing Swagger metadata helpers
 * @module product-service/interfaces/swagger
 */
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  PricingHttpResponseDTO,
  PriceCalculationHttpResponseDTO,
  PricingStatsHttpResponseDTO,
} from '../dtos/responses/pricing.response.dto.js';

export const ApiPricingTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('product-pricing');

export function ApiUpdatePrice(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update product price' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Price updated',
      type: PricingHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.UNPROCESSABLE_ENTITY, description: 'Invalid price' }),
  );
}

export function ApiGetPrice(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get pricing by product' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Pricing found',
      type: PricingHttpResponseDTO,
    }),
    ApiResponse({ status: HTTP_STATUS.NOT_FOUND, description: 'Pricing not found' }),
  );
}

export function ApiCalculatePrice(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Calculate price with discount + VAT' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Calculation result',
      type: PriceCalculationHttpResponseDTO,
    }),
  );
}

export function ApiGetPricingStats(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get pricing stats' }),
    ApiResponse({
      status: HTTP_STATUS.OK,
      description: 'Stats loaded',
      type: PricingStatsHttpResponseDTO,
    }),
  );
}
