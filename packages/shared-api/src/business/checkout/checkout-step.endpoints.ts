/**
 * Checkout Step Endpoints
 * চেকআউট স্টেপ সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CHECKOUT } from '@vubon/shared-constants';
import type { CheckoutStep } from '@vubon/shared-types';

export const checkoutStepEndpoints = {
  list: (checkoutId: string) => `${baseEndpoints.api}/checkout/${checkoutId}/steps`,
  update: (checkoutId: string) => `${baseEndpoints.api}/checkout/${checkoutId}/steps`,
  get: (checkoutId: string, stepId: string) =>
    `${baseEndpoints.api}/checkout/${checkoutId}/steps/${stepId}`,
  validate: (checkoutId: string, stepId: string) =>
    `${baseEndpoints.api}/checkout/${checkoutId}/steps/${stepId}/validate`,
} as const;

export type CheckoutStepEndpointKey = keyof typeof checkoutStepEndpoints;

// CHECKOUT কনস্ট্যান্ট ব্যবহার করে step validity চেক (টাইপ গার্ড)
export const isValidCheckoutStep = (step: string): boolean => {
  const validSteps = Object.values(CHECKOUT.STEPS) as readonly string[];
  return validSteps.includes(step);
};

// CheckoutStep টাইপ ব্যবহার করে helper function
export const isStepCompleted = (step: CheckoutStep): boolean => {
  return step.status === 'completed';
};

// CheckoutStep টাইপ ব্যবহার করে step name get
export const getStepName = (step: CheckoutStep): string => {
  return step.step;
};

// CheckoutStep টাইপ ব্যবহার করে step data get
export const getStepData = <T = unknown>(step: CheckoutStep): T | undefined => {
  return step.data as T | undefined;
};
