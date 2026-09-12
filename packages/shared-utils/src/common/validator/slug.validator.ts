/**
 * Slug Validator — uses REGEX.SLUG.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidSlug = (slug: string): boolean => REGEX.SLUG.test(slug.trim());
