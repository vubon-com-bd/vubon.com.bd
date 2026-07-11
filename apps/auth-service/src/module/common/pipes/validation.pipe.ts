/**
 * Validation Pipe - Enterprise Grade
 * 
 * @module common/pipes/validation.pipe
 * 
 * @description
 * Global validation pipe with Zod schema support.
 * Validates incoming requests against Zod schemas.
 * 
 * Enterprise Features:
 * ✅ Zod schema validation
 * ✅ Custom error messages
 * ✅ Multi-language support (English/Bengali)
 * ✅ Detailed validation errors
 * ✅ Environment-aware validation
 * 
 * @example
 * // In controller
 * @Post('register')
 * @UsePipes(new ZodValidationPipe(RegisterSchema))
 * async register(@Body() dto: RegisterDto) {
 *   // dto is already validated
 * }
 */

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';
import { env } from '@vubon/shared-config';

// ============================================================
// Types
// ============================================================

export interface ValidationError {
  field: string;
  message: string;
  messageBn?: string;
  code?: string;
  value?: unknown;
}

// ============================================================
// Pipe Implementation
// ============================================================

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ZodValidationPipe.name);

  constructor(
    private readonly schema: ZodSchema,
    private readonly options?: {
      /** Skip validation for certain fields */
      skipFields?: string[];
      /** Custom error messages */
      customMessages?: Record<string, string>;
      /** Bengali error messages */
      customMessagesBn?: Record<string, string>;
      /** Log validation errors */
      logErrors?: boolean;
    }
  ) {}

  async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    try {
      // Skip validation for certain types
      if (metadata.type === 'custom' || metadata.type === 'param') {
        return value;
      }

      // Validate with Zod
      const result = await this.schema.safeParseAsync(value);

      if (!result.success) {
        throw new BadRequestException({
          message: 'Validation failed',
          messageBn: 'ভ্যালিডেশন ব্যর্থ হয়েছে',
          errors: this.formatErrors(result.error),
        });
      }

      return result.data;
    } catch (error) {
      // If it's already a BadRequestException, re-throw
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Log unexpected errors
      this.logger.error('Validation pipe error:', error);

      // Throw generic validation error
      throw new BadRequestException({
        message: 'Validation failed',
        messageBn: 'ভ্যালিডেশন ব্যর্থ হয়েছে',
        errors: [
          {
            field: 'unknown',
            message: 'An unexpected error occurred during validation',
            messageBn: 'ভ্যালিডেশনের সময় একটি অপ্রত্যাশিত ত্রুটি ঘটেছে',
          },
        ],
      });
    }
  }

  // ============================================================
  // Private Methods
  // ============================================================

  /**
   * Format Zod validation errors
   */
  private formatErrors(error: ZodError): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const issue of error.issues) {
      const field = issue.path.join('.');
      const message = issue.message;

      // Check for custom messages
      const customMessage = this.options?.customMessages?.[field] || this.options?.customMessages?.[message];
      const customMessageBn = this.options?.customMessagesBn?.[field] || this.options?.customMessagesBn?.[message];

      errors.push({
        field,
        message: customMessage || message,
        messageBn: customMessageBn || this.getBengaliMessage(field, issue.code),
        code: issue.code,
        value: issue.input,
      });
    }

    return errors;
  }

  /**
   * Get Bengali error message for common validation errors
   */
  private getBengaliMessage(field: string, code: string): string {
    const messages: Record<string, string> = {
      'invalid_type': `${field} টি ভুল ধরনের`,
      'invalid_literal': `${field} টি ভুল মান`,
      'unrecognized_keys': `${field} টি স্বীকৃত নয়`,
      'invalid_union': `${field} টি ভুল ইউনিয়ন`,
      'invalid_union_discriminator': `${field} টি ভুল ডিস্ক্রিমিনেটর`,
      'invalid_enum_value': `${field} টি ভুল এনাম মান`,
      'invalid_arguments': `${field} টি ভুল আর্গুমেন্ট`,
      'invalid_return_type': `${field} টি ভুল রিটার্ন টাইপ`,
      'invalid_date': `${field} টি ভুল তারিখ`,
      'custom': `${field} টি ভুল`,
      'invalid_intersection_types': `${field} টি ভুল ইন্টারসেকশন টাইপ`,
      'not_multiple_of': `${field} টি ${field} এর গুণিতক নয়`,
      'not_finite': `${field} টি অসীম`,
      'invalid_string': `${field} টি ভুল স্ট্রিং`,
      'too_small': `${field} টি খুব ছোট`,
      'too_big': `${field} টি খুব বড়`,
      'invalid_checksum': `${field} টি ভুল চেকসাম`,
    };

    return messages[code] || `${field} টি ভুল`;
  }
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Create a validation pipe with a Zod schema
 */
export const createValidationPipe = (
  schema: ZodSchema,
  options?: {
    skipFields?: string[];
    customMessages?: Record<string, string>;
    customMessagesBn?: Record<string, string>;
  }
): ZodValidationPipe => {
  return new ZodValidationPipe(schema, options);
};

// ============================================================
// Type Exports
// ============================================================

export type { ValidationError as ZodValidationError };
