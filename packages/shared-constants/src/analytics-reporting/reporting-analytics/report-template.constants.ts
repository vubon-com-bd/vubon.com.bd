/**
 * @fileoverview Report template constants and configurations
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Template themes
 */
export enum ReportTemplateTheme {
  /** Light theme */
  LIGHT = 'LIGHT',
  /** Dark theme */
  DARK = 'DARK',
  /** Professional theme */
  PROFESSIONAL = 'PROFESSIONAL',
  /** Minimal theme */
  MINIMAL = 'MINIMAL',
  /** Corporate theme */
  CORPORATE = 'CORPORATE',
  /** Creative theme */
  CREATIVE = 'CREATIVE',
  /** Modern theme */
  MODERN = 'MODERN',
  /** Classic theme */
  CLASSIC = 'CLASSIC',
  /** Custom theme */
  CUSTOM = 'CUSTOM',
}

/**
 * Template color schemes
 */
export enum ReportTemplateColorScheme {
  /** Default scheme */
  DEFAULT = 'DEFAULT',
  /** Monochrome scheme */
  MONOCHROME = 'MONOCHROME',
  /** Primary colors */
  PRIMARY = 'PRIMARY',
  /** Complementary colors */
  COMPLEMENTARY = 'COMPLEMENTARY',
  /** Analogous colors */
  ANALOGOUS = 'ANALOGOUS',
  /** Triadic colors */
  TRIADIC = 'TRIADIC',
  /** Brand colors */
  BRAND = 'BRAND',
  /** Custom scheme */
  CUSTOM = 'CUSTOM',
}

/**
 * Template font sizes
 */
export enum ReportTemplateFontSize {
  /** Small font size */
  SMALL = 'SMALL',
  /** Medium font size */
  MEDIUM = 'MEDIUM',
  /** Large font size */
  LARGE = 'LARGE',
  /** Extra large font size */
  EXTRA_LARGE = 'EXTRA_LARGE',
  /** Custom font size */
  CUSTOM = 'CUSTOM',
}

/**
 * Template layout types
 */
export enum ReportTemplateLayout {
  /** Single column layout */
  SINGLE_COLUMN = 'SINGLE_COLUMN',
  /** Two column layout */
  TWO_COLUMN = 'TWO_COLUMN',
  /** Three column layout */
  THREE_COLUMN = 'THREE_COLUMN',
  /** Grid layout */
  GRID = 'GRID',
  /** Dashboard layout */
  DASHBOARD = 'DASHBOARD',
  /** Report layout */
  REPORT = 'REPORT',
  /** Presentation layout */
  PRESENTATION = 'PRESENTATION',
  /** Custom layout */
  CUSTOM = 'CUSTOM',
}

/**
 * Template component types
 */
export enum ReportTemplateComponent {
  /** Header component */
  HEADER = 'HEADER',
  /** Footer component */
  FOOTER = 'FOOTER',
  /** Table component */
  TABLE = 'TABLE',
  /** Chart component */
  CHART = 'CHART',
  /** Text component */
  TEXT = 'TEXT',
  /** Image component */
  IMAGE = 'IMAGE',
  /** Section component */
  SECTION = 'SECTION',
  /** Widget component */
  WIDGET = 'WIDGET',
  /** Metric component */
  METRIC = 'METRIC',
  /** KPI component */
  KPI = 'KPI',
  /** Summary component */
  SUMMARY = 'SUMMARY',
  /** Custom component */
  CUSTOM = 'CUSTOM',
}

/**
 * Template metadata
 */
export interface ReportTemplateMetadata {
  /** Author */
  author: string;
  /** Created date */
  createdAt: Date;
  /** Updated date */
  updatedAt: Date;
  /** Version */
  version: number;
  /** Last used */
  lastUsed?: Date;
  /** Usage count */
  usageCount: number;
  /** Rating */
  rating: number;
  /** Review count */
  reviewCount: number;
  /** Is verified */
  isVerified: boolean;
  /** Is featured */
  isFeatured: boolean;
}

/**
 * Template configuration
 */
export interface ReportTemplateConfig {
  /** Template ID */
  id: string;
  /** Template name */
  name: string;
  /** Template description */
  description: string;
  /** Theme */
  theme: ReportTemplateTheme;
  /** Color scheme */
  colorScheme: ReportTemplateColorScheme;
  /** Font size */
  fontSize: ReportTemplateFontSize;
  /** Layout */
  layout: ReportTemplateLayout;
  /** Components */
  components: ReportTemplateComponent[];
  /** Margin in pixels */
  margin: number;
  /** Padding in pixels */
  padding: number;
  /** Font family */
  fontFamily: string;
  /** Background color */
  backgroundColor: string;
  /** Primary color */
  primaryColor: string;
  /** Secondary color */
  secondaryColor: string;
  /** Tags */
  tags: string[];
  /** Categories */
  categories: string[];
  /** Is active */
  isActive: boolean;
  /** Is default */
  isDefault: boolean;
  /** Metadata */
  metadata: ReportTemplateMetadata;
}

export const DEFAULT_REPORT_TEMPLATE_CONFIG: ReportTemplateConfig = {
  id: 'default',
  name: 'Default Template',
  description: 'Default report template',
  theme: ReportTemplateTheme.LIGHT,
  colorScheme: ReportTemplateColorScheme.DEFAULT,
  fontSize: ReportTemplateFontSize.MEDIUM,
  layout: ReportTemplateLayout.REPORT,
  components: [
    ReportTemplateComponent.HEADER,
    ReportTemplateComponent.SECTION,
    ReportTemplateComponent.TABLE,
    ReportTemplateComponent.CHART,
    ReportTemplateComponent.FOOTER,
  ],
  margin: 40,
  padding: 20,
  fontFamily: 'Arial',
  backgroundColor: '#FFFFFF',
  primaryColor: '#3B82F6',
  secondaryColor: '#6B7280',
  tags: ['standard', 'general'],
  categories: ['General'],
  isActive: true,
  isDefault: true,
  metadata: {
    author: 'system',
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    usageCount: 0,
    rating: 0,
    reviewCount: 0,
    isVerified: true,
    isFeatured: false,
  },
};

/**
 * Template versioning settings
 */
export interface ReportTemplateVersioning {
  /** Enable versioning */
  enableVersioning: boolean;
  /** Max versions to keep */
  maxVersions: number;
  /** Version retention days */
  retentionDays: number;
  /** Enable auto-versioning */
  enableAutoVersioning: boolean;
  /** Version naming pattern */
  namingPattern: string;
}

export const DEFAULT_TEMPLATE_VERSIONING: ReportTemplateVersioning = {
  enableVersioning: true,
  maxVersions: 10,
  retentionDays: 90,
  enableAutoVersioning: true,
  namingPattern: 'v{version}_{timestamp}',
};

/**
 * Template caching settings
 */
export interface ReportTemplateCache {
  /** Enable caching */
  enableCaching: boolean;
  /** Cache TTL in seconds */
  cacheTTLSeconds: number;
  /** Cache size limit in MB */
  cacheSizeLimitMB: number;
  /** Enable cache compression */
  enableCompression: boolean;
  /** Cache invalidation on update */
  invalidateOnUpdate: boolean;
}

export const DEFAULT_TEMPLATE_CACHE: ReportTemplateCache = {
  enableCaching: true,
  cacheTTLSeconds: 300,
  cacheSizeLimitMB: 1024,
  enableCompression: true,
  invalidateOnUpdate: true,
};

/**
 * Template category settings
 */
export interface ReportTemplateCategory {
  /** Category ID */
  id: string;
  /** Category name */
  name: string;
  /** Category description */
  description: string;
  /** Parent category ID */
  parentId?: string;
  /** Display order */
  order: number;
  /** Is active */
  isActive: boolean;
}

export const DEFAULT_TEMPLATE_CATEGORIES: ReportTemplateCategory[] = [
  {
    id: 'general',
    name: 'General',
    description: 'General purpose templates',
    order: 1,
    isActive: true,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Business report templates',
    order: 2,
    isActive: true,
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Technical report templates',
    order: 3,
    isActive: true,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Executive summary templates',
    order: 4,
    isActive: true,
  },
  {
    id: 'operational',
    name: 'Operational',
    description: 'Operational report templates',
    order: 5,
    isActive: true,
  },
];

/**
 * Template tag settings
 */
export interface ReportTemplateTag {
  /** Tag ID */
  id: string;
  /** Tag name */
  name: string;
  /** Tag color */
  color: string;
  /** Is active */
  isActive: boolean;
}

export const DEFAULT_TEMPLATE_TAGS: ReportTemplateTag[] = [
  { id: 'standard', name: 'Standard', color: '#3B82F6', isActive: true },
  { id: 'premium', name: 'Premium', color: '#F59E0B', isActive: true },
  { id: 'custom', name: 'Custom', color: '#8B5CF6', isActive: true },
  { id: 'featured', name: 'Featured', color: '#22C55E', isActive: true },
  { id: 'archived', name: 'Archived', color: '#6B7280', isActive: true },
];

/**
 * Template permission settings
 */
export interface ReportTemplatePermission {
  /** Enable permissions */
  enablePermissions: boolean;
  /** Default access level */
  defaultAccess: 'READ' | 'WRITE' | 'ADMIN' | 'NONE';
  /** Allowed roles */
  allowedRoles: string[];
  /** Allowed users */
  allowedUsers: string[];
  /** Allowed groups */
  allowedGroups: string[];
}

export const DEFAULT_TEMPLATE_PERMISSION: ReportTemplatePermission = {
  enablePermissions: true,
  defaultAccess: 'READ',
  allowedRoles: ['admin', 'manager', 'analyst'],
  allowedUsers: [],
  allowedGroups: [],
};

/**
 * Template indexing settings
 */
export interface ReportTemplateIndexing {
  /** Enable indexing */
  enableIndexing: boolean;
  /** Index fields */
  indexFields: string[];
  /** Enable full-text search */
  enableFullTextSearch: boolean;
  /** Enable fuzzy search */
  enableFuzzySearch: boolean;
  /** Index refresh interval in seconds */
  refreshIntervalSeconds: number;
  /** Max indexed items */
  maxIndexedItems: number;
}

export const DEFAULT_TEMPLATE_INDEXING: ReportTemplateIndexing = {
  enableIndexing: true,
  indexFields: ['name', 'description', 'tags', 'categories'],
  enableFullTextSearch: true,
  enableFuzzySearch: false,
  refreshIntervalSeconds: 60,
  maxIndexedItems: 10000,
};

/**
 * Template search optimization settings
 */
export interface ReportTemplateSearchOptimization {
  /** Enable search optimization */
  enableOptimization: boolean;
  /** Boost factors */
  boostFactors: {
    name: number;
    description: number;
    tags: number;
    categories: number;
    usageCount: number;
    rating: number;
  };
  /** Enable caching */
  enableCaching: boolean;
  /** Cache TTL in seconds */
  cacheTTLSeconds: number;
  /** Results per page */
  resultsPerPage: number;
}

export const DEFAULT_TEMPLATE_SEARCH_OPTIMIZATION: ReportTemplateSearchOptimization = {
  enableOptimization: true,
  boostFactors: {
    name: 2.0,
    description: 1.5,
    tags: 1.2,
    categories: 1.0,
    usageCount: 0.5,
    rating: 0.3,
  },
  enableCaching: true,
  cacheTTLSeconds: 300,
  resultsPerPage: 20,
};

/**
 * Template component library settings
 */
export interface ReportTemplateComponentLibrary {
  /** Component library ID */
  id: string;
  /** Component library name */
  name: string;
  /** Component library version */
  version: string;
  /** Available components */
  components: string[];
  /** Is active */
  isActive: boolean;
  /** Is default */
  isDefault: boolean;
}

export const DEFAULT_TEMPLATE_COMPONENT_LIBRARY: ReportTemplateComponentLibrary = {
  id: 'standard-library',
  name: 'Standard Component Library',
  version: '1.0.0',
  components: [
    'header',
    'footer',
    'table',
    'chart',
    'text',
    'image',
    'section',
    'widget',
    'metric',
    'kpi',
  ],
  isActive: true,
  isDefault: true,
};

/**
 * Template constants
 */
export const TEMPLATE_CONSTANTS = {
  /** Default theme */
  DEFAULT_THEME: ReportTemplateTheme.LIGHT,
  /** Default font size */
  DEFAULT_FONT_SIZE: ReportTemplateFontSize.MEDIUM,
  /** Default color scheme */
  DEFAULT_COLOR_SCHEME: ReportTemplateColorScheme.DEFAULT,
  /** Default layout */
  DEFAULT_LAYOUT: ReportTemplateLayout.REPORT,
  /** Default margin in pixels */
  DEFAULT_MARGIN: 40,
  /** Default padding in pixels */
  DEFAULT_PADDING: 20,
  /** Default font family */
  DEFAULT_FONT_FAMILY: 'Arial',
  /** Default background color */
  DEFAULT_BACKGROUND_COLOR: '#FFFFFF',
  /** Default primary color */
  DEFAULT_PRIMARY_COLOR: '#3B82F6',
  /** Default secondary color */
  DEFAULT_SECONDARY_COLOR: '#6B7280',
  /** Max templates per user */
  MAX_TEMPLATES_PER_USER: 100,
  /** Max components per template */
  MAX_COMPONENTS_PER_TEMPLATE: 50,
  /** Max template size in KB */
  MAX_TEMPLATE_SIZE_KB: 1024,
} as const;

/**
 * Get template theme label
 */
export function getTemplateThemeLabel(theme: ReportTemplateTheme): string {
  const labels: Record<ReportTemplateTheme, string> = {
    [ReportTemplateTheme.LIGHT]: 'Light',
    [ReportTemplateTheme.DARK]: 'Dark',
    [ReportTemplateTheme.PROFESSIONAL]: 'Professional',
    [ReportTemplateTheme.MINIMAL]: 'Minimal',
    [ReportTemplateTheme.CORPORATE]: 'Corporate',
    [ReportTemplateTheme.CREATIVE]: 'Creative',
    [ReportTemplateTheme.MODERN]: 'Modern',
    [ReportTemplateTheme.CLASSIC]: 'Classic',
    [ReportTemplateTheme.CUSTOM]: 'Custom',
  };
  return labels[theme] || theme;
}

/**
 * Get template color scheme label
 */
export function getTemplateColorSchemeLabel(scheme: ReportTemplateColorScheme): string {
  const labels: Record<ReportTemplateColorScheme, string> = {
    [ReportTemplateColorScheme.DEFAULT]: 'Default',
    [ReportTemplateColorScheme.MONOCHROME]: 'Monochrome',
    [ReportTemplateColorScheme.PRIMARY]: 'Primary Colors',
    [ReportTemplateColorScheme.COMPLEMENTARY]: 'Complementary',
    [ReportTemplateColorScheme.ANALOGOUS]: 'Analogous',
    [ReportTemplateColorScheme.TRIADIC]: 'Triadic',
    [ReportTemplateColorScheme.BRAND]: 'Brand Colors',
    [ReportTemplateColorScheme.CUSTOM]: 'Custom',
  };
  return labels[scheme] || scheme;
}

/**
 * Get template font size label
 */
export function getTemplateFontSizeLabel(size: ReportTemplateFontSize): string {
  const labels: Record<ReportTemplateFontSize, string> = {
    [ReportTemplateFontSize.SMALL]: 'Small (12px)',
    [ReportTemplateFontSize.MEDIUM]: 'Medium (14px)',
    [ReportTemplateFontSize.LARGE]: 'Large (16px)',
    [ReportTemplateFontSize.EXTRA_LARGE]: 'Extra Large (18px)',
    [ReportTemplateFontSize.CUSTOM]: 'Custom',
  };
  return labels[size] || size;
}

/**
 * Get template layout label
 */
export function getTemplateLayoutLabel(layout: ReportTemplateLayout): string {
  const labels: Record<ReportTemplateLayout, string> = {
    [ReportTemplateLayout.SINGLE_COLUMN]: 'Single Column',
    [ReportTemplateLayout.TWO_COLUMN]: 'Two Column',
    [ReportTemplateLayout.THREE_COLUMN]: 'Three Column',
    [ReportTemplateLayout.GRID]: 'Grid',
    [ReportTemplateLayout.DASHBOARD]: 'Dashboard',
    [ReportTemplateLayout.REPORT]: 'Report',
    [ReportTemplateLayout.PRESENTATION]: 'Presentation',
    [ReportTemplateLayout.CUSTOM]: 'Custom',
  };
  return labels[layout] || layout;
}

/**
 * Get template component label
 */
export function getTemplateComponentLabel(component: ReportTemplateComponent): string {
  const labels: Record<ReportTemplateComponent, string> = {
    [ReportTemplateComponent.HEADER]: 'Header',
    [ReportTemplateComponent.FOOTER]: 'Footer',
    [ReportTemplateComponent.TABLE]: 'Table',
    [ReportTemplateComponent.CHART]: 'Chart',
    [ReportTemplateComponent.TEXT]: 'Text',
    [ReportTemplateComponent.IMAGE]: 'Image',
    [ReportTemplateComponent.SECTION]: 'Section',
    [ReportTemplateComponent.WIDGET]: 'Widget',
    [ReportTemplateComponent.METRIC]: 'Metric',
    [ReportTemplateComponent.KPI]: 'KPI',
    [ReportTemplateComponent.SUMMARY]: 'Summary',
    [ReportTemplateComponent.CUSTOM]: 'Custom',
  };
  return labels[component] || component;
}

/**
 * Get font size value in pixels
 */
export function getFontSizeValue(size: ReportTemplateFontSize): number {
  const values: Record<ReportTemplateFontSize, number> = {
    [ReportTemplateFontSize.SMALL]: 12,
    [ReportTemplateFontSize.MEDIUM]: 14,
    [ReportTemplateFontSize.LARGE]: 16,
    [ReportTemplateFontSize.EXTRA_LARGE]: 18,
    [ReportTemplateFontSize.CUSTOM]: 14,
  };
  return values[size] || 14;
}

/**
 * Check if template is premium
 */
export function isTemplatePremium(template: ReportTemplateConfig): boolean {
  return template.tags.includes('premium') || template.tags.includes('featured');
}

/**
 * Check if template is active
 */
export function isTemplateActive(template: ReportTemplateConfig): boolean {
  return template.isActive;
}

/**
 * Get template usage rank
 */
export function getTemplateUsageRank(template: ReportTemplateConfig): string {
  const usageCount = template.metadata?.usageCount || 0;
  if (usageCount >= 1000) return 'Top';
  if (usageCount >= 500) return 'High';
  if (usageCount >= 100) return 'Medium';
  return 'Low';
}
