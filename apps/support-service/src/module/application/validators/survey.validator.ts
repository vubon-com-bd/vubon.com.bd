import { Injectable } from '@nestjs/common';

@Injectable()
export class SurveyValidator {
  validate(input: unknown): unknown {
    if (!input || typeof input !== 'object') {
      throw new Error('Survey input must be an object');
    }
    const data = input as Record<string, unknown>;
    if (typeof data.title !== 'string' || data.title.trim().length < 3) {
      throw new Error('Survey title must be at least 3 characters');
    }
    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      throw new Error('Survey must have at least one question');
    }
    return input;
  }
}
