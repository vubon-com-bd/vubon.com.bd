/**
 * Environment Constants
 * @module shared-constants/common/environment.constants
 */

export const ENVIRONMENT = {
  // Environment names
  DEVELOPMENT: 'development',
  TESTING: 'testing',
  STAGING: 'staging',
  PRODUCTION: 'production',
  DOCKER: 'docker',
  KUBERNETES: 'kubernetes',
  CI: 'ci',
  LOCAL: 'local',
} as const;

export type Environment = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];

export const ENV_WEIGHTS: Record<Environment, number> = {
  [ENVIRONMENT.LOCAL]: 0,
  [ENVIRONMENT.DEVELOPMENT]: 1,
  [ENVIRONMENT.TESTING]: 2,
  [ENVIRONMENT.DOCKER]: 3,
  [ENVIRONMENT.CI]: 4,
  [ENVIRONMENT.STAGING]: 5,
  [ENVIRONMENT.KUBERNETES]: 6,
  [ENVIRONMENT.PRODUCTION]: 7,
};

export const ENV_COLORS: Record<Environment, string> = {
  [ENVIRONMENT.LOCAL]: '#6366f1',
  [ENVIRONMENT.DEVELOPMENT]: '#22c55e',
  [ENVIRONMENT.TESTING]: '#f59e0b',
  [ENVIRONMENT.DOCKER]: '#2496ed',
  [ENVIRONMENT.CI]: '#9ca3af',
  [ENVIRONMENT.STAGING]: '#8b5cf6',
  [ENVIRONMENT.KUBERNETES]: '#326ce5',
  [ENVIRONMENT.PRODUCTION]: '#ef4444',
};

export const ENV_LABELS: Record<Environment, string> = {
  [ENVIRONMENT.LOCAL]: 'Local',
  [ENVIRONMENT.DEVELOPMENT]: 'Development',
  [ENVIRONMENT.TESTING]: 'Testing',
  [ENVIRONMENT.DOCKER]: 'Docker',
  [ENVIRONMENT.CI]: 'CI',
  [ENVIRONMENT.STAGING]: 'Staging',
  [ENVIRONMENT.KUBERNETES]: 'Kubernetes',
  [ENVIRONMENT.PRODUCTION]: 'Production',
};

export const ENV_DOMAINS: Record<Environment, string> = {
  [ENVIRONMENT.LOCAL]: 'localhost',
  [ENVIRONMENT.DEVELOPMENT]: 'dev',
  [ENVIRONMENT.TESTING]: 'test',
  [ENVIRONMENT.DOCKER]: 'docker',
  [ENVIRONMENT.CI]: 'ci',
  [ENVIRONMENT.STAGING]: 'staging',
  [ENVIRONMENT.KUBERNETES]: 'k8s',
  [ENVIRONMENT.PRODUCTION]: 'prod',
};

export const DEFAULT_ENVIRONMENT: Environment = ENVIRONMENT.DEVELOPMENT;

export const NON_PRODUCTION_ENVIRONMENTS: Environment[] = [
  ENVIRONMENT.LOCAL,
  ENVIRONMENT.DEVELOPMENT,
  ENVIRONMENT.TESTING,
  ENVIRONMENT.DOCKER,
  ENVIRONMENT.CI,
  ENVIRONMENT.STAGING,
  ENVIRONMENT.KUBERNETES,
] as const;

export const PRODUCTION_ENVIRONMENTS: Environment[] = [ENVIRONMENT.PRODUCTION] as const;
