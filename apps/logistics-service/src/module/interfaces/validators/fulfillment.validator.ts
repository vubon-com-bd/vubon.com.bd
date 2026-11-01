/**
 * FulfillmentHttpValidator — wraps App validator
 * @module logistics-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { FulfillmentValidator as AppValidator } from '@application/validators/fulfillment/fulfillment.validator.js';

export class FulfillmentHttpValidator {
  static validateCreate(body: unknown): void {
    try { AppValidator.validateCreate(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid create payload'); }
  }

  static validateStart(body: unknown): void {
    try { AppValidator.validateStart?.(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid start payload'); }
  }

  static validateShip(body: unknown): void {
    try { AppValidator.validateShip?.(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid ship payload'); }
  }

  static validateFulfill(body: unknown): void {
    try { AppValidator.validateFulfill?.(body as never); }
    catch (err) { throw new BadRequestException(err instanceof Error ? err.message : 'Invalid fulfill payload'); }
  }
}
