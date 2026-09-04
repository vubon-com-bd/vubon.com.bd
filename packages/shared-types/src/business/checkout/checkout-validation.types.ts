/**
 * Checkout Validation Types
 * চেকআউট যাচাই সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface CheckoutValidation extends BaseEntity {
  checkoutId: string;
  isValid: boolean;
  errors: {
    field: string;
    code: string;
    message: string;
  }[];
  warnings: {
    field: string;
    code: string;
    message: string;
  }[];
  validatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckoutValidationCreateInput {
  checkoutId: string;
  errors?: {
    field: string;
    code: string;
    message: string;
  }[];
  warnings?: {
    field: string;
    code: string;
    message: string;
  }[];
}

export interface CheckoutValidationUpdateInput {
  isValid?: boolean;
  errors?: {
    field: string;
    code: string;
    message: string;
  }[];
  warnings?: {
    field: string;
    code: string;
    message: string;
  }[];
}

export interface CheckoutValidationResponse {
  checkoutValidation: CheckoutValidation;
}

export interface CheckoutValidationResult {
  valid: boolean;
  errors: {
    field: string;
    code: string;
    message: string;
  }[];
  warnings: {
    field: string;
    code: string;
    message: string;
  }[];
}
