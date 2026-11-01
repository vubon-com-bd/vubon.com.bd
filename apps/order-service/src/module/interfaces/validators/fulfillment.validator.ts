/**
 * FulfillmentHttpValidator
 * @module order-service/interfaces/validators
 *
 * Base validation using standard patterns; enrich as needed.
 */
import { BadRequestException } from '@nestjs/common';

export class FulfillmentHttpValidator {
  static validateBody(body: unknown): void {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Request body must be a JSON object');
    }
  }
}
