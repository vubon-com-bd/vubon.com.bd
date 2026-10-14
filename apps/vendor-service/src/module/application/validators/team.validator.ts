/**
 * TeamValidator — Zod schema-based validation
 * @module vendor-service/application/validators
 */
import { ZodError } from 'zod';
import {
  AddTeamMemberRequestSchema,
  AcceptTeamInviteRequestSchema,
} from '@vubon/shared-schemas/business/vendor';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  );
}

export class TeamValidator {
  static validateAddMember(input: unknown) {
    try {
      return AddTeamMemberRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Team.addMember');
      throw e;
    }
  }

  static validateAcceptInvite(input: unknown) {
    try {
      return AcceptTeamInviteRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Team.acceptInvite');
      throw e;
    }
  }
}
