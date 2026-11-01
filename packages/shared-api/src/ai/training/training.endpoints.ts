import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const AI_TRAINING_ENDPOINTS = {
  start: API_ROUTES.AI_TRAINING.START,
  status: (jobId: string): string => paramEndpoint(API_ROUTES.AI_TRAINING.STATUS, { jobId }),
} as const;
