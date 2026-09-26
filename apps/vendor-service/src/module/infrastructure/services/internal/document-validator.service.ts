import { Injectable } from '@nestjs/common';

export interface DocumentValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

@Injectable()
export class DocumentValidatorService {
  validate(input: {
    type: string;
    url: string;
    expiresAt?: Date | null;
  }): DocumentValidationResult {
    const errors: string[] = [];

    if (!input.type) errors.push('type is required');
    if (!input.url) errors.push('url is required');
    if (input.url && !/^https?:\/\//.test(input.url)) {
      errors.push('url must be http(s)');
    }
    if (input.expiresAt && input.expiresAt.getTime() <= Date.now()) {
      errors.push('document already expired');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
