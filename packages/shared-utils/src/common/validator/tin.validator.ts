/**
 * TIN Validator — uses REGEX.TIN.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidTIN = (tin: string): boolean => REGEX.TIN.test(tin.replace(/\s/g, ''));
