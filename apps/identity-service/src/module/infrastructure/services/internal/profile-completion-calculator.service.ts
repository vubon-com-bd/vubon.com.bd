/**
 * ProfileCompletionCalculatorService
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { ProfileCompletionService } from '../../../domain/services/profile-completion.service.js';

@Injectable()
export class ProfileCompletionCalculatorService {
  calculate(input: {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    bio?: string;
    avatarUrl?: string;
    coverUrl?: string;
    gender?: string;
    dateOfBirth?: string;
    website?: string;
  }): { percent: number; missingFields: readonly string[]; isComplete: boolean } {
    return ProfileCompletionService.calculate(input);
  }

  isComplete(input: {
    firstName?: string;
    lastName?: string;
    bio?: string;
    avatarUrl?: string;
    gender?: string;
    dateOfBirth?: string;
  }): boolean {
    return ProfileCompletionService.isComplete(input);
  }
}
