/**
 * Slug Formatter — ReDoS-safe.
 * @module shared-utils/common/formatter/slug
 *
 * Uses a linear-time algorithm instead of backtracking regex.
 */
import { formatSlugLinear } from '../helper/slug-linear';

export const formatSlug = (text: string): string => formatSlugLinear(text);
