/**
 * Cohort Command Handlers Barrel
 */
import { CreateCohortHandler } from '../../../application/commands/cohort/create-cohort.handler.js';
import { AnalyzeCohortHandler } from '../../../application/commands/cohort/analyze-cohort.handler.js';

export const COHORT_COMMAND_HANDLERS = [
  CreateCohortHandler,
  AnalyzeCohortHandler,
] as const;

export { CreateCohortHandler, AnalyzeCohortHandler };
