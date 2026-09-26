/**
 * Branded URL Type
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type Url = Branded<string, 'Url'>;
export type ImageUrl = Branded<string, 'ImageUrl'>;
export type VideoUrl = Branded<string, 'VideoUrl'>;
export type DocumentUrl = Branded<string, 'DocumentUrl'>;

export const toUrl = (url: string): Url => url as Url;
