/**
 * UserPersonaService — aggregates persona data
 * @module identity-service/domain/services
 */
import { ProfileCompletionService } from './profile-completion.service.js';

export interface PersonaInput {
  readonly userId: string;
  readonly displayName: string;
  readonly gender?: string;
  readonly language?: string;
  readonly timezone?: string;
  readonly avatarUrl?: string;
  readonly bio?: string;
  readonly visibility?: string;
  readonly interests?: readonly string[];
}

export interface PersonaSummary {
  readonly userId: string;
  readonly displayName: string;
  readonly hasAvatar: boolean;
  readonly completionPercent: number;
  readonly isDiscoverable: boolean;
  readonly interestCount: number;
}

export class UserPersonaService {
  static summarize(input: PersonaInput): PersonaSummary {
    const completion = ProfileCompletionService.calculate({
      avatarUrl: input.avatarUrl,
      bio: input.bio,
      gender: input.gender,
    });

    const isDiscoverable =
      input.visibility === 'public' || input.visibility === undefined;

    return {
      userId: input.userId,
      displayName: input.displayName,
      hasAvatar: typeof input.avatarUrl === 'string' && input.avatarUrl.length > 0,
      completionPercent: completion.percent,
      isDiscoverable,
      interestCount: input.interests?.length ?? 0,
    };
  }

  static isDiscoverable(input: PersonaInput): boolean {
    return input.visibility === 'public' || input.visibility === undefined;
  }

  static hasMinimumPersona(input: PersonaInput): boolean {
    return (
      typeof input.displayName === 'string' &&
      input.displayName.trim().length >= 2
    );
  }
}
