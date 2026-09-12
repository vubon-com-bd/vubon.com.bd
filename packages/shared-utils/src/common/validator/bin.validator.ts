/**
 * BIN Validator — uses REGEX.BIN.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidBIN = (bin: string): boolean => REGEX.BIN.test(bin.replace(/\s/g, ''));
