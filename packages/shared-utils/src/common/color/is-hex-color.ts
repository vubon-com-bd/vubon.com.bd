/**
 * Check if string is a valid hex color (#RGB or #RRGGBB)
 * @module shared-utils/common/color
 */
export function isHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}
