/**
 * Bangladesh-specific Validators — uses REGEX.* constants.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidBDPostalCode = (code: string): boolean =>
  REGEX.BD_POSTAL_CODE.test(code.trim());

export const isValidBDDivisionCode = (code: string): boolean =>
  REGEX.BD_DIVISION_CODE.test(code.trim());

export const isValidBDDistrictCode = (code: string): boolean =>
  REGEX.BD_DISTRICT_CODE.test(code.trim());

export const isValidBDUpazilaCode = (code: string): boolean =>
  REGEX.BD_UPAZILA_CODE.test(code.trim());
