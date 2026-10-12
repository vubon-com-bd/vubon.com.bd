/**
 * Cohort Query Handlers Barrel
 */
import { GetCohortHandler } from '../../../application/queries/cohort/get-cohort.handler.js';
import { ListCohortsHandler } from '../../../application/queries/cohort/list-cohorts.handler.js';

export const COHORT_QUERY_HANDLERS = [
  GetCohortHandler,
  ListCohortsHandler,
] as const;

export { GetCohortHandler, ListCohortsHandler };
