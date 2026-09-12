/**
 * URL Validator — uses REGEX.URL / REGEX.URL_STRICT.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return REGEX.URL.test(url);
  }
};

export const isValidStrictUrl = (url: string): boolean => REGEX.URL_STRICT.test(url.trim());
