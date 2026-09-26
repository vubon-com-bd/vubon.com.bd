/**
 * Branded Slug Type
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type Slug = Branded<string, 'Slug'>;

export const toSlug = (value: string): Slug => value as Slug;
