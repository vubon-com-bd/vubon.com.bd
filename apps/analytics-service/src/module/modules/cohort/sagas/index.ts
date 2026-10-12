/**
 * Cohort Sagas Barrel
 */
import { CohortBuildingSaga } from '../../../application/sagas/cohort-building.saga.js';

export const COHORT_SAGAS = [CohortBuildingSaga] as const;

export { CohortBuildingSaga };
