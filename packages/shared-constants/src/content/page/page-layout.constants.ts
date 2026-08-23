/**
 * Page Layout Constants
 * Layout configurations and structures
 */

export const CONTENT_PAGE_LAYOUT = {
  // Layout Types
  TYPES: {
    STANDARD: 'standard',
    FULL_WIDTH: 'full_width',
    BOXED: 'boxed',
    SIDEBAR_LEFT: 'sidebar_left',
    SIDEBAR_RIGHT: 'sidebar_right',
    TWO_COLUMN: 'two_column',
    THREE_COLUMN: 'three_column',
    SPLIT_SCREEN: 'split_screen',
    HERO: 'hero',
    GRID: 'grid',
    MASONRY: 'masonry',
    CAROUSEL: 'carousel',
    SLIDER: 'slider',
    CUSTOM: 'custom',
  } as const,

  // Layout Structures
  STRUCTURES: {
    SINGLE: 'single',
    DOUBLE: 'double',
    TRIPLE: 'triple',
    QUAD: 'quad',
    FLEX: 'flex',
    GRID: 'grid',
    CUSTOM: 'custom',
  } as const,

  // Layout Grids
  GRIDS: {
    COLUMN_1: '1col',
    COLUMN_2: '2col',
    COLUMN_3: '3col',
    COLUMN_4: '4col',
    COLUMN_5: '5col',
    COLUMN_6: '6col',
    COLUMN_8: '8col',
    COLUMN_12: '12col',
    CUSTOM: 'custom',
  } as const,

  // Layout Spacing
  SPACING: {
    NONE: 0,
    TINY: 4,
    SMALL: 8,
    NORMAL: 16,
    MEDIUM: 24,
    LARGE: 32,
    XLARGE: 48,
    XXLARGE: 64,
  } as const,

  // Layout Breakpoints
  BREAKPOINTS: {
    MOBILE: 320,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE: 1280,
    XLARGE: 1440,
    XXLARGE: 1920,
  } as const,

  // Layout Alignments
  ALIGNMENTS: {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    JUSTIFY: 'justify',
    TOP: 'top',
    MIDDLE: 'middle',
    BOTTOM: 'bottom',
  } as const,

  // Layout Backgrounds
  BACKGROUNDS: {
    SOLID: 'solid',
    GRADIENT: 'gradient',
    IMAGE: 'image',
    VIDEO: 'video',
    PATTERN: 'pattern',
    PARALLAX: 'parallax',
    CUSTOM: 'custom',
  } as const,

  // Layout Container Types
  CONTAINER: {
    FLUID: 'fluid',
    BOXED: 'boxed',
    FULL: 'full',
    CUSTOM: 'custom',
  } as const,
} as const;

// Layout Types
export type ContentPageLayoutType =
  (typeof CONTENT_PAGE_LAYOUT.TYPES)[keyof typeof CONTENT_PAGE_LAYOUT.TYPES];

// Layout Structures
export type ContentPageLayoutStructure =
  (typeof CONTENT_PAGE_LAYOUT.STRUCTURES)[keyof typeof CONTENT_PAGE_LAYOUT.STRUCTURES];

// Layout Grids
export type ContentPageLayoutGrid =
  (typeof CONTENT_PAGE_LAYOUT.GRIDS)[keyof typeof CONTENT_PAGE_LAYOUT.GRIDS];

// Layout Spacing
export type ContentPageLayoutSpacing =
  (typeof CONTENT_PAGE_LAYOUT.SPACING)[keyof typeof CONTENT_PAGE_LAYOUT.SPACING];

// Layout Breakpoints
export type ContentPageLayoutBreakpoint =
  (typeof CONTENT_PAGE_LAYOUT.BREAKPOINTS)[keyof typeof CONTENT_PAGE_LAYOUT.BREAKPOINTS];

// Layout Alignments
export type ContentPageLayoutAlignment =
  (typeof CONTENT_PAGE_LAYOUT.ALIGNMENTS)[keyof typeof CONTENT_PAGE_LAYOUT.ALIGNMENTS];

// Layout Backgrounds
export type ContentPageLayoutBackground =
  (typeof CONTENT_PAGE_LAYOUT.BACKGROUNDS)[keyof typeof CONTENT_PAGE_LAYOUT.BACKGROUNDS];

// Layout Container
export type ContentPageLayoutContainer =
  (typeof CONTENT_PAGE_LAYOUT.CONTAINER)[keyof typeof CONTENT_PAGE_LAYOUT.CONTAINER];

// Utility Functions
export function contentPageLayoutGetTypeLabel(type: ContentPageLayoutType): string {
  const labels: Record<ContentPageLayoutType, string> = {
    [CONTENT_PAGE_LAYOUT.TYPES.STANDARD]: 'Standard Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.FULL_WIDTH]: 'Full Width Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.BOXED]: 'Boxed Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.SIDEBAR_LEFT]: 'Sidebar Left Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.SIDEBAR_RIGHT]: 'Sidebar Right Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.TWO_COLUMN]: 'Two Column Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.THREE_COLUMN]: 'Three Column Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.SPLIT_SCREEN]: 'Split Screen Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.HERO]: 'Hero Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.GRID]: 'Grid Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.MASONRY]: 'Masonry Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.CAROUSEL]: 'Carousel Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.SLIDER]: 'Slider Layout',
    [CONTENT_PAGE_LAYOUT.TYPES.CUSTOM]: 'Custom Layout',
  };
  return labels[type] || 'Unknown Layout Type';
}

export function contentPageLayoutGetStructureLabel(structure: ContentPageLayoutStructure): string {
  const labels: Record<ContentPageLayoutStructure, string> = {
    [CONTENT_PAGE_LAYOUT.STRUCTURES.SINGLE]: 'Single Column',
    [CONTENT_PAGE_LAYOUT.STRUCTURES.DOUBLE]: 'Double Column',
    [CONTENT_PAGE_LAYOUT.STRUCTURES.TRIPLE]: 'Triple Column',
    [CONTENT_PAGE_LAYOUT.STRUCTURES.QUAD]: 'Quad Column',
    [CONTENT_PAGE_LAYOUT.STRUCTURES.FLEX]: 'Flex Layout',
    [CONTENT_PAGE_LAYOUT.STRUCTURES.GRID]: 'Grid Layout',
    [CONTENT_PAGE_LAYOUT.STRUCTURES.CUSTOM]: 'Custom Structure',
  };
  return labels[structure] || 'Unknown Structure';
}

export function contentPageLayoutGetGridLabel(grid: ContentPageLayoutGrid): string {
  const labels: Record<ContentPageLayoutGrid, string> = {
    [CONTENT_PAGE_LAYOUT.GRIDS.COLUMN_1]: '1 Column',
    [CONTENT_PAGE_LAYOUT.GRIDS.COLUMN_2]: '2 Columns',
    [CONTENT_PAGE_LAYOUT.GRIDS.COLUMN_3]: '3 Columns',
    [CONTENT_PAGE_LAYOUT.GRIDS.COLUMN_4]: '4 Columns',
    [CONTENT_PAGE_LAYOUT.GRIDS.COLUMN_5]: '5 Columns',
    [CONTENT_PAGE_LAYOUT.GRIDS.COLUMN_6]: '6 Columns',
    [CONTENT_PAGE_LAYOUT.GRIDS.COLUMN_8]: '8 Columns',
    [CONTENT_PAGE_LAYOUT.GRIDS.COLUMN_12]: '12 Columns',
    [CONTENT_PAGE_LAYOUT.GRIDS.CUSTOM]: 'Custom Grid',
  };
  return labels[grid] || 'Unknown Grid';
}

export function contentPageLayoutGetSpacingLabel(spacing: ContentPageLayoutSpacing): string {
  const labels: Record<ContentPageLayoutSpacing, string> = {
    [CONTENT_PAGE_LAYOUT.SPACING.NONE]: 'None',
    [CONTENT_PAGE_LAYOUT.SPACING.TINY]: 'Tiny',
    [CONTENT_PAGE_LAYOUT.SPACING.SMALL]: 'Small',
    [CONTENT_PAGE_LAYOUT.SPACING.NORMAL]: 'Normal',
    [CONTENT_PAGE_LAYOUT.SPACING.MEDIUM]: 'Medium',
    [CONTENT_PAGE_LAYOUT.SPACING.LARGE]: 'Large',
    [CONTENT_PAGE_LAYOUT.SPACING.XLARGE]: 'X-Large',
    [CONTENT_PAGE_LAYOUT.SPACING.XXLARGE]: 'XX-Large',
  };
  return labels[spacing] || 'Unknown Spacing';
}

export function contentPageLayoutGetAlignmentLabel(alignment: ContentPageLayoutAlignment): string {
  const labels: Record<ContentPageLayoutAlignment, string> = {
    [CONTENT_PAGE_LAYOUT.ALIGNMENTS.LEFT]: 'Left',
    [CONTENT_PAGE_LAYOUT.ALIGNMENTS.CENTER]: 'Center',
    [CONTENT_PAGE_LAYOUT.ALIGNMENTS.RIGHT]: 'Right',
    [CONTENT_PAGE_LAYOUT.ALIGNMENTS.JUSTIFY]: 'Justify',
    [CONTENT_PAGE_LAYOUT.ALIGNMENTS.TOP]: 'Top',
    [CONTENT_PAGE_LAYOUT.ALIGNMENTS.MIDDLE]: 'Middle',
    [CONTENT_PAGE_LAYOUT.ALIGNMENTS.BOTTOM]: 'Bottom',
  };
  return labels[alignment] || 'Unknown Alignment';
}

export function contentPageLayoutGetBackgroundLabel(
  background: ContentPageLayoutBackground
): string {
  const labels: Record<ContentPageLayoutBackground, string> = {
    [CONTENT_PAGE_LAYOUT.BACKGROUNDS.SOLID]: 'Solid Color',
    [CONTENT_PAGE_LAYOUT.BACKGROUNDS.GRADIENT]: 'Gradient',
    [CONTENT_PAGE_LAYOUT.BACKGROUNDS.IMAGE]: 'Image',
    [CONTENT_PAGE_LAYOUT.BACKGROUNDS.VIDEO]: 'Video',
    [CONTENT_PAGE_LAYOUT.BACKGROUNDS.PATTERN]: 'Pattern',
    [CONTENT_PAGE_LAYOUT.BACKGROUNDS.PARALLAX]: 'Parallax',
    [CONTENT_PAGE_LAYOUT.BACKGROUNDS.CUSTOM]: 'Custom Background',
  };
  return labels[background] || 'Unknown Background';
}

export function contentPageLayoutGetContainerLabel(container: ContentPageLayoutContainer): string {
  const labels: Record<ContentPageLayoutContainer, string> = {
    [CONTENT_PAGE_LAYOUT.CONTAINER.FLUID]: 'Fluid Container',
    [CONTENT_PAGE_LAYOUT.CONTAINER.BOXED]: 'Boxed Container',
    [CONTENT_PAGE_LAYOUT.CONTAINER.FULL]: 'Full Container',
    [CONTENT_PAGE_LAYOUT.CONTAINER.CUSTOM]: 'Custom Container',
  };
  return labels[container] || 'Unknown Container';
}

export function contentPageLayoutGetBreakpointValue(
  breakpoint: ContentPageLayoutBreakpoint
): number {
  const values: Record<ContentPageLayoutBreakpoint, number> = {
    [CONTENT_PAGE_LAYOUT.BREAKPOINTS.MOBILE]: CONTENT_PAGE_LAYOUT.BREAKPOINTS.MOBILE,
    [CONTENT_PAGE_LAYOUT.BREAKPOINTS.TABLET]: CONTENT_PAGE_LAYOUT.BREAKPOINTS.TABLET,
    [CONTENT_PAGE_LAYOUT.BREAKPOINTS.DESKTOP]: CONTENT_PAGE_LAYOUT.BREAKPOINTS.DESKTOP,
    [CONTENT_PAGE_LAYOUT.BREAKPOINTS.LARGE]: CONTENT_PAGE_LAYOUT.BREAKPOINTS.LARGE,
    [CONTENT_PAGE_LAYOUT.BREAKPOINTS.XLARGE]: CONTENT_PAGE_LAYOUT.BREAKPOINTS.XLARGE,
    [CONTENT_PAGE_LAYOUT.BREAKPOINTS.XXLARGE]: CONTENT_PAGE_LAYOUT.BREAKPOINTS.XXLARGE,
  };
  return values[breakpoint] || 0;
}

export function contentPageLayoutIsValidType(type: string): type is ContentPageLayoutType {
  return Object.values(CONTENT_PAGE_LAYOUT.TYPES).includes(type as ContentPageLayoutType);
}

export function contentPageLayoutIsValidStructure(
  structure: string
): structure is ContentPageLayoutStructure {
  return Object.values(CONTENT_PAGE_LAYOUT.STRUCTURES).includes(
    structure as ContentPageLayoutStructure
  );
}

export function contentPageLayoutIsValidGrid(grid: string): grid is ContentPageLayoutGrid {
  return Object.values(CONTENT_PAGE_LAYOUT.GRIDS).includes(grid as ContentPageLayoutGrid);
}

export function contentPageLayoutGetDefaultType(): ContentPageLayoutType {
  return CONTENT_PAGE_LAYOUT.TYPES.STANDARD;
}

export function contentPageLayoutGetDefaultStructure(): ContentPageLayoutStructure {
  return CONTENT_PAGE_LAYOUT.STRUCTURES.SINGLE;
}

export function contentPageLayoutGetDefaultGrid(): ContentPageLayoutGrid {
  return CONTENT_PAGE_LAYOUT.GRIDS.COLUMN_1;
}

export function contentPageLayoutGetDefaultSpacing(): ContentPageLayoutSpacing {
  return CONTENT_PAGE_LAYOUT.SPACING.NORMAL;
}

export function contentPageLayoutGetDefaultContainer(): ContentPageLayoutContainer {
  return CONTENT_PAGE_LAYOUT.CONTAINER.FLUID;
}
