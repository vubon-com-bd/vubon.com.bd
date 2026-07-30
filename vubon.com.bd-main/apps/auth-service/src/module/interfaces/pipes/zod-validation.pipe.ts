/**
 * Zod Validation Pipe
 * Custom pipe for validating requests with Zod schemas
 */

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  /**
   * Transform and validate the incoming request data
   * @param value - The incoming request data
   * @returns The validated and parsed data
   * @throws BadRequestException if validation fails
   */
  transform(value: unknown): unknown {
    try {
      const parsed = this.schema.parse(value);
      return parsed;
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err: ZodError['errors'][number]) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        throw new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
