/**
 * Branded Color Type
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type HexColor = Branded<string, 'HexColor'>;
export type RgbColor = Branded<string, 'RgbColor'>;
export type HslColor = Branded<string, 'HslColor'>;
export type Color = HexColor | RgbColor | HslColor;

export const toHexColor = (value: string): HexColor => value as HexColor;
