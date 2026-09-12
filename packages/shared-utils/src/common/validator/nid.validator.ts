/**
 * NID Validator — uses REGEX.NID.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidNID = (nid: string): boolean => REGEX.NID.test(nid.replace(/\s/g, ''));
