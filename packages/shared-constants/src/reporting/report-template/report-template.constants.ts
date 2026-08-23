/**
 * Report Template Constants
 * Configuration for report templates, layouts, and components
 */

export const REPORT_TEMPLATE = {
  // Template Categories
  CATEGORIES: {
    SALES: 'sales',
    FINANCIAL: 'financial',
    OPERATIONAL: 'operational',
    ANALYTICAL: 'analytical',
    MARKETING: 'marketing',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    VENDOR: 'vendor',
    LOGISTICS: 'logistics',
    SUPPORT: 'support',
    PERFORMANCE: 'performance',
    COMPLIANCE: 'compliance',
    CUSTOM: 'custom',
  } as const,

  // Template Layouts
  LAYOUTS: {
    STANDARD: 'standard',
    COMPACT: 'compact',
    DETAILED: 'detailed',
    EXECUTIVE: 'executive',
    DASHBOARD: 'dashboard',
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
    CUSTOM: 'custom',
  } as const,

  // Template Sections
  SECTIONS: {
    HEADER: 'header',
    FOOTER: 'footer',
    SUMMARY: 'summary',
    DETAILS: 'details',
    CHARTS: 'charts',
    TABLES: 'tables',
    METRICS: 'metrics',
    NOTES: 'notes',
    APPENDIX: 'appendix',
    COVER: 'cover',
    TABLE_OF_CONTENTS: 'table_of_contents',
    EXECUTIVE_SUMMARY: 'executive_summary',
    RECOMMENDATIONS: 'recommendations',
    CONCLUSIONS: 'conclusions',
  } as const,

  // Template Components
  COMPONENTS: {
    TITLE: 'title',
    SUBTITLE: 'subtitle',
    HEADING: 'heading',
    PARAGRAPH: 'paragraph',
    TABLE: 'table',
    CHART: 'chart',
    METRIC: 'metric',
    IMAGE: 'image',
    LOGO: 'logo',
    BARCODE: 'barcode',
    QR_CODE: 'qr_code',
    SIGNATURE: 'signature',
    DATE_TIME: 'date_time',
    PAGE_NUMBER: 'page_number',
    FOOTNOTE: 'footnote',
    WATERMARK: 'watermark',
    BORDER: 'border',
    DIVIDER: 'divider',
  } as const,

  // Template Styles
  STYLES: {
    MODERN: 'modern',
    CLASSIC: 'classic',
    MINIMAL: 'minimal',
    PROFESSIONAL: 'professional',
    CREATIVE: 'creative',
    ELEGANT: 'elegant',
    BOLD: 'bold',
    LIGHT: 'light',
    DARK: 'dark',
    COLORFUL: 'colorful',
    MONOCHROME: 'monochrome',
    CORPORATE: 'corporate',
  } as const,

  // Template Themes
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    BLUE: 'blue',
    GREEN: 'green',
    RED: 'red',
    PURPLE: 'purple',
    ORANGE: 'orange',
    TEAL: 'teal',
    PINK: 'pink',
    INDIGO: 'indigo',
    GRAY: 'gray',
    CUSTOM: 'custom',
  } as const,

  // Template Fonts
  FONTS: {
    ARIAL: 'Arial',
    HELVETICA: 'Helvetica',
    TIMES_NEW_ROMAN: 'Times New Roman',
    GEORGIA: 'Georgia',
    VERDANA: 'Verdana',
    CALIBRI: 'Calibri',
    TAHOMA: 'Tahoma',
    COURIER_NEW: 'Courier New',
    MONTSERRAT: 'Montserrat',
    ROBOTO: 'Roboto',
    OPEN_SANS: 'Open Sans',
    LATO: 'Lato',
    POPPINS: 'Poppins',
    INTER: 'Inter',
    SANS_SERIF: 'Sans Serif',
    SERIF: 'Serif',
    MONOSPACE: 'Monospace',
  } as const,

  // Template Font Sizes
  FONT_SIZES: {
    TINY: 8,
    SMALL: 10,
    NORMAL: 12,
    MEDIUM: 14,
    LARGE: 16,
    XLARGE: 18,
    XXLARGE: 20,
    XXXLARGE: 24,
    HUGE: 32,
    MASSIVE: 48,
  } as const,

  // Template Colors
  COLORS: {
    PRIMARY: '#4F46E5',
    SECONDARY: '#10B981',
    INFO: '#3B82F6',
    WARNING: '#F59E0B',
    DANGER: '#EF4444',
    SUCCESS: '#10B981',
    LIGHT: '#F3F4F6',
    DARK: '#1F2937',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GRAY_50: '#F9FAFB',
    GRAY_100: '#F3F4F6',
    GRAY_200: '#E5E7EB',
    GRAY_300: '#D1D5DB',
    GRAY_400: '#9CA3AF',
    GRAY_500: '#6B7280',
    GRAY_600: '#4B5563',
    GRAY_700: '#374151',
    GRAY_800: '#1F2937',
    GRAY_900: '#111827',
  } as const,

  // Template Paper Sizes
  PAPER_SIZES: {
    A3: 'a3',
    A4: 'a4',
    A5: 'a5',
    LEGAL: 'legal',
    LETTER: 'letter',
    TABLOID: 'tabloid',
    EXECUTIVE: 'executive',
  } as const,

  // Template Orientations
  ORIENTATIONS: {
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
  } as const,

  // Template Margins
  MARGINS: {
    NONE: 0,
    TINY: 5,
    SMALL: 10,
    NORMAL: 15,
    MEDIUM: 20,
    LARGE: 25,
    XLARGE: 30,
  } as const,

  // Template Spacing
  SPACING: {
    NONE: 0,
    TINY: 2,
    SMALL: 4,
    NORMAL: 8,
    MEDIUM: 12,
    LARGE: 16,
    XLARGE: 24,
    XXLARGE: 32,
  } as const,

  // Template Borders
  BORDERS: {
    NONE: 'none',
    SOLID: 'solid',
    DASHED: 'dashed',
    DOTTED: 'dotted',
    DOUBLE: 'double',
    GROOVE: 'groove',
    RIDGE: 'ridge',
    INSET: 'inset',
    OUTSET: 'outset',
  } as const,

  // Template Defaults
  DEFAULTS: {
    PAPER_SIZE: 'A4',
    ORIENTATION: 'portrait',
    FONT_FAMILY: 'Arial',
    FONT_SIZE: 12,
    LINE_HEIGHT: 1.5,
    MARGIN: 15,
    SPACING: 8,
    BORDER: 'none',
    THEME: 'light',
  } as const,

  // Template Options
  OPTIONS: {
    MAX_SECTIONS: 20,
    MAX_COMPONENTS: 100,
    MAX_PAGES: 100,
    MAX_IMAGES: 50,
    MAX_TABLES: 20,
    MAX_CHARTS: 20,
    MAX_METRICS: 50,
  } as const,
} as const;

// Template Categories
export type ReportTemplateCategory =
  (typeof REPORT_TEMPLATE.CATEGORIES)[keyof typeof REPORT_TEMPLATE.CATEGORIES];

// Template Layouts
export type ReportTemplateLayout =
  (typeof REPORT_TEMPLATE.LAYOUTS)[keyof typeof REPORT_TEMPLATE.LAYOUTS];

// Template Sections
export type ReportTemplateSection =
  (typeof REPORT_TEMPLATE.SECTIONS)[keyof typeof REPORT_TEMPLATE.SECTIONS];

// Template Components
export type ReportTemplateComponent =
  (typeof REPORT_TEMPLATE.COMPONENTS)[keyof typeof REPORT_TEMPLATE.COMPONENTS];

// Template Styles
export type ReportTemplateStyle =
  (typeof REPORT_TEMPLATE.STYLES)[keyof typeof REPORT_TEMPLATE.STYLES];

// Template Themes
export type ReportTemplateTheme =
  (typeof REPORT_TEMPLATE.THEMES)[keyof typeof REPORT_TEMPLATE.THEMES];

// Template Fonts
export type ReportTemplateFont = (typeof REPORT_TEMPLATE.FONTS)[keyof typeof REPORT_TEMPLATE.FONTS];

// Template Font Sizes
export type ReportTemplateFontSize =
  (typeof REPORT_TEMPLATE.FONT_SIZES)[keyof typeof REPORT_TEMPLATE.FONT_SIZES];

// Template Colors
export type ReportTemplateColor =
  (typeof REPORT_TEMPLATE.COLORS)[keyof typeof REPORT_TEMPLATE.COLORS];

// Template Paper Sizes
export type ReportTemplatePaperSize =
  (typeof REPORT_TEMPLATE.PAPER_SIZES)[keyof typeof REPORT_TEMPLATE.PAPER_SIZES];

// Template Orientations
export type ReportTemplateOrientation =
  (typeof REPORT_TEMPLATE.ORIENTATIONS)[keyof typeof REPORT_TEMPLATE.ORIENTATIONS];

// Template Margins
export type ReportTemplateMargin =
  (typeof REPORT_TEMPLATE.MARGINS)[keyof typeof REPORT_TEMPLATE.MARGINS];

// Template Spacing
export type ReportTemplateSpacing =
  (typeof REPORT_TEMPLATE.SPACING)[keyof typeof REPORT_TEMPLATE.SPACING];

// Template Borders
export type ReportTemplateBorder =
  (typeof REPORT_TEMPLATE.BORDERS)[keyof typeof REPORT_TEMPLATE.BORDERS];

// Utility Functions
export function reportTemplateGetCategoryLabel(category: ReportTemplateCategory): string {
  const labels: Record<ReportTemplateCategory, string> = {
    [REPORT_TEMPLATE.CATEGORIES.SALES]: 'Sales Template',
    [REPORT_TEMPLATE.CATEGORIES.FINANCIAL]: 'Financial Template',
    [REPORT_TEMPLATE.CATEGORIES.OPERATIONAL]: 'Operational Template',
    [REPORT_TEMPLATE.CATEGORIES.ANALYTICAL]: 'Analytical Template',
    [REPORT_TEMPLATE.CATEGORIES.MARKETING]: 'Marketing Template',
    [REPORT_TEMPLATE.CATEGORIES.CUSTOMER]: 'Customer Template',
    [REPORT_TEMPLATE.CATEGORIES.PRODUCT]: 'Product Template',
    [REPORT_TEMPLATE.CATEGORIES.VENDOR]: 'Vendor Template',
    [REPORT_TEMPLATE.CATEGORIES.LOGISTICS]: 'Logistics Template',
    [REPORT_TEMPLATE.CATEGORIES.SUPPORT]: 'Support Template',
    [REPORT_TEMPLATE.CATEGORIES.PERFORMANCE]: 'Performance Template',
    [REPORT_TEMPLATE.CATEGORIES.COMPLIANCE]: 'Compliance Template',
    [REPORT_TEMPLATE.CATEGORIES.CUSTOM]: 'Custom Template',
  };
  return labels[category] || 'Unknown Template';
}

export function reportTemplateGetLayoutLabel(layout: ReportTemplateLayout): string {
  const labels: Record<ReportTemplateLayout, string> = {
    [REPORT_TEMPLATE.LAYOUTS.STANDARD]: 'Standard',
    [REPORT_TEMPLATE.LAYOUTS.COMPACT]: 'Compact',
    [REPORT_TEMPLATE.LAYOUTS.DETAILED]: 'Detailed',
    [REPORT_TEMPLATE.LAYOUTS.EXECUTIVE]: 'Executive',
    [REPORT_TEMPLATE.LAYOUTS.DASHBOARD]: 'Dashboard',
    [REPORT_TEMPLATE.LAYOUTS.PORTRAIT]: 'Portrait',
    [REPORT_TEMPLATE.LAYOUTS.LANDSCAPE]: 'Landscape',
    [REPORT_TEMPLATE.LAYOUTS.CUSTOM]: 'Custom',
  };
  return labels[layout] || 'Unknown Layout';
}

export function reportTemplateGetSectionLabel(section: ReportTemplateSection): string {
  const labels: Record<ReportTemplateSection, string> = {
    [REPORT_TEMPLATE.SECTIONS.HEADER]: 'Header',
    [REPORT_TEMPLATE.SECTIONS.FOOTER]: 'Footer',
    [REPORT_TEMPLATE.SECTIONS.SUMMARY]: 'Summary',
    [REPORT_TEMPLATE.SECTIONS.DETAILS]: 'Details',
    [REPORT_TEMPLATE.SECTIONS.CHARTS]: 'Charts',
    [REPORT_TEMPLATE.SECTIONS.TABLES]: 'Tables',
    [REPORT_TEMPLATE.SECTIONS.METRICS]: 'Metrics',
    [REPORT_TEMPLATE.SECTIONS.NOTES]: 'Notes',
    [REPORT_TEMPLATE.SECTIONS.APPENDIX]: 'Appendix',
    [REPORT_TEMPLATE.SECTIONS.COVER]: 'Cover Page',
    [REPORT_TEMPLATE.SECTIONS.TABLE_OF_CONTENTS]: 'Table of Contents',
    [REPORT_TEMPLATE.SECTIONS.EXECUTIVE_SUMMARY]: 'Executive Summary',
    [REPORT_TEMPLATE.SECTIONS.RECOMMENDATIONS]: 'Recommendations',
    [REPORT_TEMPLATE.SECTIONS.CONCLUSIONS]: 'Conclusions',
  };
  return labels[section] || 'Unknown Section';
}

export function reportTemplateGetComponentLabel(component: ReportTemplateComponent): string {
  const labels: Record<ReportTemplateComponent, string> = {
    [REPORT_TEMPLATE.COMPONENTS.TITLE]: 'Title',
    [REPORT_TEMPLATE.COMPONENTS.SUBTITLE]: 'Subtitle',
    [REPORT_TEMPLATE.COMPONENTS.HEADING]: 'Heading',
    [REPORT_TEMPLATE.COMPONENTS.PARAGRAPH]: 'Paragraph',
    [REPORT_TEMPLATE.COMPONENTS.TABLE]: 'Table',
    [REPORT_TEMPLATE.COMPONENTS.CHART]: 'Chart',
    [REPORT_TEMPLATE.COMPONENTS.METRIC]: 'Metric',
    [REPORT_TEMPLATE.COMPONENTS.IMAGE]: 'Image',
    [REPORT_TEMPLATE.COMPONENTS.LOGO]: 'Logo',
    [REPORT_TEMPLATE.COMPONENTS.BARCODE]: 'Barcode',
    [REPORT_TEMPLATE.COMPONENTS.QR_CODE]: 'QR Code',
    [REPORT_TEMPLATE.COMPONENTS.SIGNATURE]: 'Signature',
    [REPORT_TEMPLATE.COMPONENTS.DATE_TIME]: 'Date & Time',
    [REPORT_TEMPLATE.COMPONENTS.PAGE_NUMBER]: 'Page Number',
    [REPORT_TEMPLATE.COMPONENTS.FOOTNOTE]: 'Footnote',
    [REPORT_TEMPLATE.COMPONENTS.WATERMARK]: 'Watermark',
    [REPORT_TEMPLATE.COMPONENTS.BORDER]: 'Border',
    [REPORT_TEMPLATE.COMPONENTS.DIVIDER]: 'Divider',
  };
  return labels[component] || 'Unknown Component';
}

export function reportTemplateGetStyleLabel(style: ReportTemplateStyle): string {
  const labels: Record<ReportTemplateStyle, string> = {
    [REPORT_TEMPLATE.STYLES.MODERN]: 'Modern',
    [REPORT_TEMPLATE.STYLES.CLASSIC]: 'Classic',
    [REPORT_TEMPLATE.STYLES.MINIMAL]: 'Minimal',
    [REPORT_TEMPLATE.STYLES.PROFESSIONAL]: 'Professional',
    [REPORT_TEMPLATE.STYLES.CREATIVE]: 'Creative',
    [REPORT_TEMPLATE.STYLES.ELEGANT]: 'Elegant',
    [REPORT_TEMPLATE.STYLES.BOLD]: 'Bold',
    [REPORT_TEMPLATE.STYLES.LIGHT]: 'Light',
    [REPORT_TEMPLATE.STYLES.DARK]: 'Dark',
    [REPORT_TEMPLATE.STYLES.COLORFUL]: 'Colorful',
    [REPORT_TEMPLATE.STYLES.MONOCHROME]: 'Monochrome',
    [REPORT_TEMPLATE.STYLES.CORPORATE]: 'Corporate',
  };
  return labels[style] || 'Unknown Style';
}

export function reportTemplateGetThemeLabel(theme: ReportTemplateTheme): string {
  const labels: Record<ReportTemplateTheme, string> = {
    [REPORT_TEMPLATE.THEMES.LIGHT]: 'Light',
    [REPORT_TEMPLATE.THEMES.DARK]: 'Dark',
    [REPORT_TEMPLATE.THEMES.BLUE]: 'Blue',
    [REPORT_TEMPLATE.THEMES.GREEN]: 'Green',
    [REPORT_TEMPLATE.THEMES.RED]: 'Red',
    [REPORT_TEMPLATE.THEMES.PURPLE]: 'Purple',
    [REPORT_TEMPLATE.THEMES.ORANGE]: 'Orange',
    [REPORT_TEMPLATE.THEMES.TEAL]: 'Teal',
    [REPORT_TEMPLATE.THEMES.PINK]: 'Pink',
    [REPORT_TEMPLATE.THEMES.INDIGO]: 'Indigo',
    [REPORT_TEMPLATE.THEMES.GRAY]: 'Gray',
    [REPORT_TEMPLATE.THEMES.CUSTOM]: 'Custom',
  };
  return labels[theme] || 'Unknown Theme';
}

export function reportTemplateGetPaperSizeLabel(paperSize: ReportTemplatePaperSize): string {
  const labels: Record<ReportTemplatePaperSize, string> = {
    [REPORT_TEMPLATE.PAPER_SIZES.A3]: 'A3',
    [REPORT_TEMPLATE.PAPER_SIZES.A4]: 'A4',
    [REPORT_TEMPLATE.PAPER_SIZES.A5]: 'A5',
    [REPORT_TEMPLATE.PAPER_SIZES.LEGAL]: 'Legal',
    [REPORT_TEMPLATE.PAPER_SIZES.LETTER]: 'Letter',
    [REPORT_TEMPLATE.PAPER_SIZES.TABLOID]: 'Tabloid',
    [REPORT_TEMPLATE.PAPER_SIZES.EXECUTIVE]: 'Executive',
  };
  return labels[paperSize] || 'Unknown Paper Size';
}

export function reportTemplateGetOrientationLabel(orientation: ReportTemplateOrientation): string {
  const labels: Record<ReportTemplateOrientation, string> = {
    [REPORT_TEMPLATE.ORIENTATIONS.PORTRAIT]: 'Portrait',
    [REPORT_TEMPLATE.ORIENTATIONS.LANDSCAPE]: 'Landscape',
  };
  return labels[orientation] || 'Unknown Orientation';
}

export function reportTemplateGetBorderLabel(border: ReportTemplateBorder): string {
  const labels: Record<ReportTemplateBorder, string> = {
    [REPORT_TEMPLATE.BORDERS.NONE]: 'None',
    [REPORT_TEMPLATE.BORDERS.SOLID]: 'Solid',
    [REPORT_TEMPLATE.BORDERS.DASHED]: 'Dashed',
    [REPORT_TEMPLATE.BORDERS.DOTTED]: 'Dotted',
    [REPORT_TEMPLATE.BORDERS.DOUBLE]: 'Double',
    [REPORT_TEMPLATE.BORDERS.GROOVE]: 'Groove',
    [REPORT_TEMPLATE.BORDERS.RIDGE]: 'Ridge',
    [REPORT_TEMPLATE.BORDERS.INSET]: 'Inset',
    [REPORT_TEMPLATE.BORDERS.OUTSET]: 'Outset',
  };
  return labels[border] || 'Unknown Border';
}

export function reportTemplateGetDefaultFont(): ReportTemplateFont {
  return REPORT_TEMPLATE.DEFAULTS.FONT_FAMILY as ReportTemplateFont;
}

export function reportTemplateGetDefaultFontSize(): ReportTemplateFontSize {
  return REPORT_TEMPLATE.DEFAULTS.FONT_SIZE as ReportTemplateFontSize;
}

export function reportTemplateGetDefaultMargin(): ReportTemplateMargin {
  return REPORT_TEMPLATE.DEFAULTS.MARGIN as ReportTemplateMargin;
}

export function reportTemplateIsValidCategory(
  category: string
): category is ReportTemplateCategory {
  return Object.values(REPORT_TEMPLATE.CATEGORIES).includes(category as ReportTemplateCategory);
}

export function reportTemplateIsValidLayout(layout: string): layout is ReportTemplateLayout {
  return Object.values(REPORT_TEMPLATE.LAYOUTS).includes(layout as ReportTemplateLayout);
}

export function reportTemplateIsValidStyle(style: string): style is ReportTemplateStyle {
  return Object.values(REPORT_TEMPLATE.STYLES).includes(style as ReportTemplateStyle);
}
