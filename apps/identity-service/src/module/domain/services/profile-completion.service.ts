/**
 * ProfileCompletionService — calculates profile completeness
 * @module identity-service/domain/services
 */
import { USER_CONFIG } from '@vubon/shared-config/user';

export interface ProfileCompletionInput {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly displayName?: string;
  readonly bio?: string;
  readonly avatarUrl?: string;
  readonly coverUrl?: string;
  readonly gender?: string;
  readonly dateOfBirth?: string;
  readonly website?: string;
  readonly company?: string;
  readonly designation?: string;
}

export interface ProfileCompletionResult {
  readonly percent: number;
  readonly missingFields: readonly string[];
  readonly completedFields: readonly string[];
  readonly isComplete: boolean;
}

export class ProfileCompletionService {
  private static readonly REQUIRED_FIELDS: readonly (keyof ProfileCompletionInput)[] = [
    'firstName',
    'lastName',
    'avatarUrl',
    'bio',
    'dateOfBirth',
    'gender',
  ];

  static calculate(input: ProfileCompletionInput): ProfileCompletionResult {
    const fields = ProfileCompletionService.REQUIRED_FIELDS;
    const completed: string[] = [];
    const missing: string[] = [];

    for (const f of fields) {
      const v = input[f];
      if (typeof v === 'string' && v.trim().length > 0) {
        completed.push(f);
      } else {
        missing.push(f);
      }
    }

    const percent = Math.round((completed.length / fields.length) * 100);
    const threshold = 80;

    return {
      percent,
      missingFields: missing,
      completedFields: completed,
      isComplete: percent >= threshold,
    };
  }

  static isComplete(input: ProfileCompletionInput): boolean {
    return ProfileCompletionService.calculate(input).isComplete;
  }

  static requiredFields(): readonly string[] {
    return [...ProfileCompletionService.REQUIRED_FIELDS];
  }

  static get threshold(): number {
    return 80;
  }
}
