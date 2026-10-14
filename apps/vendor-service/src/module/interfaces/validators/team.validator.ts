/**
 * TeamHttpValidator — wraps App validator with HTTP errors
 * @module vendor-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { TeamValidator as AppValidator } from '../../application/validators/team.validator.js';

export class TeamHttpValidator {
  static validateAddMember(body: unknown): void {
    try {
      AppValidator.validateAddMember(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }

  static validateAcceptInvite(body: unknown): void {
    try {
      AppValidator.validateAcceptInvite(body);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      throw new BadRequestException(message);
    }
  }
}
