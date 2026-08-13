/**
 * @fileoverview Report filter type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files
import { FilterDataType } from './report-filter.constants';

/**
 * Filter types enum
 */
export enum FilterType {
  /** Date range filter */
  DATE_RANGE_FILTER = 'DATE_RANGE_FILTER',
  /** Date filter */
  DATE_FILTER = 'DATE_FILTER',
  /** Time range filter */
  TIME_RANGE_FILTER = 'TIME_RANGE_FILTER',
  /** Time filter */
  TIME_FILTER = 'TIME_FILTER',
  /** DateTime range filter */
  DATETIME_RANGE_FILTER = 'DATETIME_RANGE_FILTER',
  /** DateTime filter */
  DATETIME_FILTER = 'DATETIME_FILTER',
  /** Number range filter */
  NUMBER_RANGE_FILTER = 'NUMBER_RANGE_FILTER',
  /** Number filter */
  NUMBER_FILTER = 'NUMBER_FILTER',
  /** Currency range filter */
  CURRENCY_RANGE_FILTER = 'CURRENCY_RANGE_FILTER',
  /** Currency filter */
  CURRENCY_FILTER = 'CURRENCY_FILTER',
  /** Percentage range filter */
  PERCENTAGE_RANGE_FILTER = 'PERCENTAGE_RANGE_FILTER',
  /** Percentage filter */
  PERCENTAGE_FILTER = 'PERCENTAGE_FILTER',
  /** Text filter */
  TEXT_FILTER = 'TEXT_FILTER',
  /** Search filter */
  SEARCH_FILTER = 'SEARCH_FILTER',
  /** Dropdown filter */
  DROPDOWN_FILTER = 'DROPDOWN_FILTER',
  /** Multi-select filter */
  MULTI_SELECT_FILTER = 'MULTI_SELECT_FILTER',
  /** Checkbox filter */
  CHECKBOX_FILTER = 'CHECKBOX_FILTER',
  /** Radio filter */
  RADIO_FILTER = 'RADIO_FILTER',
  /** Toggle filter */
  TOGGLE_FILTER = 'TOGGLE_FILTER',
  /** Slider filter */
  SLIDER_FILTER = 'SLIDER_FILTER',
  /** Range slider filter */
  RANGE_SLIDER_FILTER = 'RANGE_SLIDER_FILTER',
  /** Autocomplete filter */
  AUTOCOMPLETE_FILTER = 'AUTOCOMPLETE_FILTER',
  /** Tags filter */
  TAGS_FILTER = 'TAGS_FILTER',
  /** Category filter */
  CATEGORY_FILTER = 'CATEGORY_FILTER',
  /** Hierarchical filter */
  HIERARCHICAL_FILTER = 'HIERARCHICAL_FILTER',
  /** Tree filter */
  TREE_FILTER = 'TREE_FILTER',
  /** Relation filter */
  RELATION_FILTER = 'RELATION_FILTER',
  /** Custom filter */
  CUSTOM_FILTER = 'CUSTOM_FILTER',
  /** Smart filter */
  SMART_FILTER = 'SMART_FILTER',
  /** AI filter */
  AI_FILTER = 'AI_FILTER',
  /** Predictive filter */
  PREDICTIVE_FILTER = 'PREDICTIVE_FILTER',
  /** Suggestive filter */
  SUGGESTIVE_FILTER = 'SUGGESTIVE_FILTER',
}

/**
 * Filter category for grouping
 */
export enum FilterCategory {
  /** Time-based filters */
  TIME = 'TIME',
  /** Number-based filters */
  NUMBER = 'NUMBER',
  /** Text-based filters */
  TEXT = 'TEXT',
  /** Selection-based filters */
  SELECTION = 'SELECTION',
  /** Range-based filters */
  RANGE = 'RANGE',
  /** Interactive filters */
  INTERACTIVE = 'INTERACTIVE',
  /** Advanced filters */
  ADVANCED = 'ADVANCED',
  /** Smart filters */
  SMART = 'SMART',
}

/**
 * Filter category mapping
 */
export const FILTER_TYPE_CATEGORY_MAP: Record<FilterType, FilterCategory> = {
  [FilterType.DATE_RANGE_FILTER]: FilterCategory.TIME,
  [FilterType.DATE_FILTER]: FilterCategory.TIME,
  [FilterType.TIME_RANGE_FILTER]: FilterCategory.TIME,
  [FilterType.TIME_FILTER]: FilterCategory.TIME,
  [FilterType.DATETIME_RANGE_FILTER]: FilterCategory.TIME,
  [FilterType.DATETIME_FILTER]: FilterCategory.TIME,
  [FilterType.NUMBER_RANGE_FILTER]: FilterCategory.NUMBER,
  [FilterType.NUMBER_FILTER]: FilterCategory.NUMBER,
  [FilterType.CURRENCY_RANGE_FILTER]: FilterCategory.NUMBER,
  [FilterType.CURRENCY_FILTER]: FilterCategory.NUMBER,
  [FilterType.PERCENTAGE_RANGE_FILTER]: FilterCategory.NUMBER,
  [FilterType.PERCENTAGE_FILTER]: FilterCategory.NUMBER,
  [FilterType.TEXT_FILTER]: FilterCategory.TEXT,
  [FilterType.SEARCH_FILTER]: FilterCategory.TEXT,
  [FilterType.DROPDOWN_FILTER]: FilterCategory.SELECTION,
  [FilterType.MULTI_SELECT_FILTER]: FilterCategory.SELECTION,
  [FilterType.CHECKBOX_FILTER]: FilterCategory.SELECTION,
  [FilterType.RADIO_FILTER]: FilterCategory.SELECTION,
  [FilterType.TOGGLE_FILTER]: FilterCategory.SELECTION,
  [FilterType.SLIDER_FILTER]: FilterCategory.RANGE,
  [FilterType.RANGE_SLIDER_FILTER]: FilterCategory.RANGE,
  [FilterType.AUTOCOMPLETE_FILTER]: FilterCategory.INTERACTIVE,
  [FilterType.TAGS_FILTER]: FilterCategory.INTERACTIVE,
  [FilterType.CATEGORY_FILTER]: FilterCategory.SELECTION,
  [FilterType.HIERARCHICAL_FILTER]: FilterCategory.INTERACTIVE,
  [FilterType.TREE_FILTER]: FilterCategory.INTERACTIVE,
  [FilterType.RELATION_FILTER]: FilterCategory.ADVANCED,
  [FilterType.CUSTOM_FILTER]: FilterCategory.ADVANCED,
  [FilterType.SMART_FILTER]: FilterCategory.SMART,
  [FilterType.AI_FILTER]: FilterCategory.SMART,
  [FilterType.PREDICTIVE_FILTER]: FilterCategory.SMART,
  [FilterType.SUGGESTIVE_FILTER]: FilterCategory.SMART,
};

/**
 * Filter type configuration
 */
export interface FilterTypeConfig {
  label: string;
  description: string;
  category: FilterCategory;
  icon?: string;
  color?: string;
  priority: number;
  dataType: FilterDataType;
  operatorType: 'single' | 'range' | 'multi' | 'text' | 'boolean';
  supportsAutoComplete: boolean;
  supportsMultipleValues: boolean;
  supportsRange: boolean;
}

export const FILTER_TYPE_CONFIG: Record<FilterType, FilterTypeConfig> = {
  [FilterType.DATE_RANGE_FILTER]: {
    label: 'Date Range',
    description: 'Filter by date range selection',
    category: FilterCategory.TIME,
    icon: 'Calendar',
    color: '#3B82F6',
    priority: 1,
    dataType: FilterDataType.DATE,
    operatorType: 'range',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: true,
  },
  [FilterType.DATE_FILTER]: {
    label: 'Date',
    description: 'Filter by specific date',
    category: FilterCategory.TIME,
    icon: 'Calendar',
    color: '#6366F1',
    priority: 1,
    dataType: FilterDataType.DATE,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.TIME_RANGE_FILTER]: {
    label: 'Time Range',
    description: 'Filter by time range selection',
    category: FilterCategory.TIME,
    icon: 'Clock',
    color: '#8B5CF6',
    priority: 2,
    dataType: FilterDataType.TIME,
    operatorType: 'range',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: true,
  },
  [FilterType.TIME_FILTER]: {
    label: 'Time',
    description: 'Filter by specific time',
    category: FilterCategory.TIME,
    icon: 'Clock',
    color: '#10B981',
    priority: 2,
    dataType: FilterDataType.TIME,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.DATETIME_RANGE_FILTER]: {
    label: 'DateTime Range',
    description: 'Filter by date and time range',
    category: FilterCategory.TIME,
    icon: 'Calendar',
    color: '#F59E0B',
    priority: 1,
    dataType: FilterDataType.DATETIME,
    operatorType: 'range',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: true,
  },
  [FilterType.DATETIME_FILTER]: {
    label: 'DateTime',
    description: 'Filter by specific date and time',
    category: FilterCategory.TIME,
    icon: 'Calendar',
    color: '#F97316',
    priority: 2,
    dataType: FilterDataType.DATETIME,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.NUMBER_RANGE_FILTER]: {
    label: 'Number Range',
    description: 'Filter by number range',
    category: FilterCategory.NUMBER,
    icon: 'Hash',
    color: '#EF4444',
    priority: 1,
    dataType: FilterDataType.NUMBER,
    operatorType: 'range',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: true,
  },
  [FilterType.NUMBER_FILTER]: {
    label: 'Number',
    description: 'Filter by specific number',
    category: FilterCategory.NUMBER,
    icon: 'Hash',
    color: '#EC4899',
    priority: 2,
    dataType: FilterDataType.NUMBER,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.CURRENCY_RANGE_FILTER]: {
    label: 'Currency Range',
    description: 'Filter by currency range',
    category: FilterCategory.NUMBER,
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 1,
    dataType: FilterDataType.CURRENCY,
    operatorType: 'range',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: true,
  },
  [FilterType.CURRENCY_FILTER]: {
    label: 'Currency',
    description: 'Filter by specific currency value',
    category: FilterCategory.NUMBER,
    icon: 'DollarSign',
    color: '#10B981',
    priority: 2,
    dataType: FilterDataType.CURRENCY,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.PERCENTAGE_RANGE_FILTER]: {
    label: 'Percentage Range',
    description: 'Filter by percentage range',
    category: FilterCategory.NUMBER,
    icon: 'Percent',
    color: '#F59E0B',
    priority: 2,
    dataType: FilterDataType.PERCENTAGE,
    operatorType: 'range',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: true,
  },
  [FilterType.PERCENTAGE_FILTER]: {
    label: 'Percentage',
    description: 'Filter by specific percentage',
    category: FilterCategory.NUMBER,
    icon: 'Percent',
    color: '#F472B6',
    priority: 2,
    dataType: FilterDataType.PERCENTAGE,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.TEXT_FILTER]: {
    label: 'Text',
    description: 'Filter by text value',
    category: FilterCategory.TEXT,
    icon: 'FileText',
    color: '#6B7280',
    priority: 2,
    dataType: FilterDataType.STRING,
    operatorType: 'text',
    supportsAutoComplete: true,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.SEARCH_FILTER]: {
    label: 'Search',
    description: 'Search-based filter',
    category: FilterCategory.TEXT,
    icon: 'Search',
    color: '#3B82F6',
    priority: 1,
    dataType: FilterDataType.STRING,
    operatorType: 'text',
    supportsAutoComplete: true,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.DROPDOWN_FILTER]: {
    label: 'Dropdown',
    description: 'Single selection dropdown filter',
    category: FilterCategory.SELECTION,
    icon: 'ChevronDown',
    color: '#8B5CF6',
    priority: 1,
    dataType: FilterDataType.ENUM,
    operatorType: 'single',
    supportsAutoComplete: true,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.MULTI_SELECT_FILTER]: {
    label: 'Multi-Select',
    description: 'Multiple selection dropdown filter',
    category: FilterCategory.SELECTION,
    icon: 'List',
    color: '#6366F1',
    priority: 1,
    dataType: FilterDataType.ENUM,
    operatorType: 'multi',
    supportsAutoComplete: true,
    supportsMultipleValues: true,
    supportsRange: false,
  },
  [FilterType.CHECKBOX_FILTER]: {
    label: 'Checkbox',
    description: 'Checkbox selection filter',
    category: FilterCategory.SELECTION,
    icon: 'CheckSquare',
    color: '#10B981',
    priority: 2,
    dataType: FilterDataType.BOOLEAN,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.RADIO_FILTER]: {
    label: 'Radio',
    description: 'Radio button selection filter',
    category: FilterCategory.SELECTION,
    icon: 'Circle',
    color: '#F59E0B',
    priority: 2,
    dataType: FilterDataType.ENUM,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.TOGGLE_FILTER]: {
    label: 'Toggle',
    description: 'Toggle switch filter',
    category: FilterCategory.SELECTION,
    icon: 'ToggleLeft',
    color: '#8B5CF6',
    priority: 2,
    dataType: FilterDataType.BOOLEAN,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.SLIDER_FILTER]: {
    label: 'Slider',
    description: 'Single value slider filter',
    category: FilterCategory.RANGE,
    icon: 'Slider',
    color: '#3B82F6',
    priority: 2,
    dataType: FilterDataType.NUMBER,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.RANGE_SLIDER_FILTER]: {
    label: 'Range Slider',
    description: 'Range value slider filter',
    category: FilterCategory.RANGE,
    icon: 'Slider',
    color: '#10B981',
    priority: 2,
    dataType: FilterDataType.NUMBER,
    operatorType: 'range',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: true,
  },
  [FilterType.AUTOCOMPLETE_FILTER]: {
    label: 'Autocomplete',
    description: 'Autocomplete search filter',
    category: FilterCategory.INTERACTIVE,
    icon: 'Search',
    color: '#8B5CF6',
    priority: 2,
    dataType: FilterDataType.STRING,
    operatorType: 'text',
    supportsAutoComplete: true,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.TAGS_FILTER]: {
    label: 'Tags',
    description: 'Tag-based filter',
    category: FilterCategory.INTERACTIVE,
    icon: 'Tag',
    color: '#F472B6',
    priority: 2,
    dataType: FilterDataType.ENUM,
    operatorType: 'multi',
    supportsAutoComplete: true,
    supportsMultipleValues: true,
    supportsRange: false,
  },
  [FilterType.CATEGORY_FILTER]: {
    label: 'Category',
    description: 'Category-based filter',
    category: FilterCategory.SELECTION,
    icon: 'Folder',
    color: '#F59E0B',
    priority: 2,
    dataType: FilterDataType.ENUM,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.HIERARCHICAL_FILTER]: {
    label: 'Hierarchical',
    description: 'Hierarchical tree filter',
    category: FilterCategory.INTERACTIVE,
    icon: 'GitBranch',
    color: '#6366F1',
    priority: 2,
    dataType: FilterDataType.ENUM,
    operatorType: 'single',
    supportsAutoComplete: true,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.TREE_FILTER]: {
    label: 'Tree',
    description: 'Tree view filter',
    category: FilterCategory.INTERACTIVE,
    icon: 'Tree',
    color: '#10B981',
    priority: 2,
    dataType: FilterDataType.ENUM,
    operatorType: 'multi',
    supportsAutoComplete: true,
    supportsMultipleValues: true,
    supportsRange: false,
  },
  [FilterType.RELATION_FILTER]: {
    label: 'Relation',
    description: 'Relation-based filter',
    category: FilterCategory.ADVANCED,
    icon: 'Link',
    color: '#8B5CF6',
    priority: 3,
    dataType: FilterDataType.UUID,
    operatorType: 'single',
    supportsAutoComplete: true,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.CUSTOM_FILTER]: {
    label: 'Custom',
    description: 'Custom filter configuration',
    category: FilterCategory.ADVANCED,
    icon: 'Settings',
    color: '#6B7280',
    priority: 4,
    dataType: FilterDataType.JSON,
    operatorType: 'single',
    supportsAutoComplete: false,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.SMART_FILTER]: {
    label: 'Smart',
    description: 'Intelligent smart filter',
    category: FilterCategory.SMART,
    icon: 'Cpu',
    color: '#22C55E',
    priority: 2,
    dataType: FilterDataType.STRING,
    operatorType: 'text',
    supportsAutoComplete: true,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.AI_FILTER]: {
    label: 'AI Filter',
    description: 'AI-powered intelligent filter',
    category: FilterCategory.SMART,
    icon: 'Sparkles',
    color: '#EC4899',
    priority: 2,
    dataType: FilterDataType.STRING,
    operatorType: 'text',
    supportsAutoComplete: true,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.PREDICTIVE_FILTER]: {
    label: 'Predictive',
    description: 'Predictive filter based on patterns',
    category: FilterCategory.SMART,
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 2,
    dataType: FilterDataType.STRING,
    operatorType: 'text',
    supportsAutoComplete: true,
    supportsMultipleValues: false,
    supportsRange: false,
  },
  [FilterType.SUGGESTIVE_FILTER]: {
    label: 'Suggestive',
    description: 'Suggestive filter with recommendations',
    category: FilterCategory.SMART,
    icon: 'Lightbulb',
    color: '#F472B6',
    priority: 2,
    dataType: FilterDataType.STRING,
    operatorType: 'text',
    supportsAutoComplete: true,
    supportsMultipleValues: false,
    supportsRange: false,
  },
};

/**
 * Get filter type label
 */
export function getFilterTypeLabel(type: FilterType): string {
  return FILTER_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get filter type description
 */
export function getFilterTypeDescription(type: FilterType): string {
  return FILTER_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get filter type category
 */
export function getFilterTypeCategory(type: FilterType): FilterCategory {
  return FILTER_TYPE_CATEGORY_MAP[type];
}

/**
 * Get filter types by category
 */
export function getFilterTypesByCategory(category: FilterCategory): FilterType[] {
  return Object.entries(FILTER_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as FilterType);
}

/**
 * Get time-based filters
 */
export function getTimeFilters(): FilterType[] {
  return getFilterTypesByCategory(FilterCategory.TIME);
}

/**
 * Get number-based filters
 */
export function getNumberFilters(): FilterType[] {
  return getFilterTypesByCategory(FilterCategory.NUMBER);
}

/**
 * Get text-based filters
 */
export function getTextFilters(): FilterType[] {
  return getFilterTypesByCategory(FilterCategory.TEXT);
}

/**
 * Get selection-based filters
 */
export function getSelectionFilters(): FilterType[] {
  return getFilterTypesByCategory(FilterCategory.SELECTION);
}

/**
 * Get range-based filters
 */
export function getRangeFilters(): FilterType[] {
  return getFilterTypesByCategory(FilterCategory.RANGE);
}

/**
 * Get interactive filters
 */
export function getInteractiveFilters(): FilterType[] {
  return getFilterTypesByCategory(FilterCategory.INTERACTIVE);
}

/**
 * Get advanced filters
 */
export function getAdvancedFilters(): FilterType[] {
  return getFilterTypesByCategory(FilterCategory.ADVANCED);
}

/**
 * Get smart filters
 */
export function getSmartFilters(): FilterType[] {
  return getFilterTypesByCategory(FilterCategory.SMART);
}

/**
 * Check if filter type supports auto-complete
 */
export function filterTypeSupportsAutoComplete(type: FilterType): boolean {
  return FILTER_TYPE_CONFIG[type]?.supportsAutoComplete || false;
}

/**
 * Check if filter type supports multiple values
 */
export function filterTypeSupportsMultipleValues(type: FilterType): boolean {
  return FILTER_TYPE_CONFIG[type]?.supportsMultipleValues || false;
}

/**
 * Check if filter type supports range
 */
export function filterTypeSupportsRange(type: FilterType): boolean {
  return FILTER_TYPE_CONFIG[type]?.supportsRange || false;
}

/**
 * Get filter type priority
 */
export function getFilterTypePriority(type: FilterType): number {
  return FILTER_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Get recommended filter types for data type
 */
export function getRecommendedFilterTypesForDataType(dataType: FilterDataType): FilterType[] {
  const recommendations: Record<FilterDataType, FilterType[]> = {
    [FilterDataType.STRING]: [
      FilterType.TEXT_FILTER,
      FilterType.SEARCH_FILTER,
      FilterType.AUTOCOMPLETE_FILTER,
    ],
    [FilterDataType.NUMBER]: [
      FilterType.NUMBER_RANGE_FILTER,
      FilterType.NUMBER_FILTER,
      FilterType.SLIDER_FILTER,
      FilterType.RANGE_SLIDER_FILTER,
    ],
    [FilterDataType.INTEGER]: [
      FilterType.NUMBER_RANGE_FILTER,
      FilterType.NUMBER_FILTER,
      FilterType.SLIDER_FILTER,
      FilterType.RANGE_SLIDER_FILTER,
    ],
    [FilterDataType.FLOAT]: [
      FilterType.NUMBER_RANGE_FILTER,
      FilterType.NUMBER_FILTER,
      FilterType.SLIDER_FILTER,
      FilterType.RANGE_SLIDER_FILTER,
    ],
    [FilterDataType.BOOLEAN]: [FilterType.CHECKBOX_FILTER, FilterType.TOGGLE_FILTER],
    [FilterDataType.DATE]: [FilterType.DATE_RANGE_FILTER, FilterType.DATE_FILTER],
    [FilterDataType.TIME]: [FilterType.TIME_RANGE_FILTER, FilterType.TIME_FILTER],
    [FilterDataType.DATETIME]: [FilterType.DATETIME_RANGE_FILTER, FilterType.DATETIME_FILTER],
    [FilterDataType.TIMESTAMP]: [FilterType.DATETIME_RANGE_FILTER, FilterType.DATETIME_FILTER],
    [FilterDataType.JSON]: [FilterType.CUSTOM_FILTER],
    [FilterDataType.ARRAY]: [FilterType.MULTI_SELECT_FILTER, FilterType.TAGS_FILTER],
    [FilterDataType.ENUM]: [
      FilterType.DROPDOWN_FILTER,
      FilterType.MULTI_SELECT_FILTER,
      FilterType.TAGS_FILTER,
      FilterType.CATEGORY_FILTER,
    ],
    [FilterDataType.UUID]: [FilterType.RELATION_FILTER],
    [FilterDataType.EMAIL]: [FilterType.TEXT_FILTER, FilterType.SEARCH_FILTER],
    [FilterDataType.PHONE]: [FilterType.TEXT_FILTER, FilterType.SEARCH_FILTER],
    [FilterDataType.URL]: [FilterType.TEXT_FILTER, FilterType.SEARCH_FILTER],
    [FilterDataType.CURRENCY]: [FilterType.CURRENCY_RANGE_FILTER, FilterType.CURRENCY_FILTER],
    [FilterDataType.PERCENTAGE]: [FilterType.PERCENTAGE_RANGE_FILTER, FilterType.PERCENTAGE_FILTER],
  };
  return recommendations[dataType] || [FilterType.TEXT_FILTER];
}

/**
 * Filter type status
 */
export enum FilterTypeStatus {
  /** Active and available */
  ACTIVE = 'ACTIVE',
  /** Inactive and hidden */
  INACTIVE = 'INACTIVE',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for filter types
 */
export const FILTER_TYPE_DEFAULT_STATUS: Record<FilterType, FilterTypeStatus> = {
  [FilterType.DATE_RANGE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.DATE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.TIME_RANGE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.TIME_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.DATETIME_RANGE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.DATETIME_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.NUMBER_RANGE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.NUMBER_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.CURRENCY_RANGE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.CURRENCY_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.PERCENTAGE_RANGE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.PERCENTAGE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.TEXT_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.SEARCH_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.DROPDOWN_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.MULTI_SELECT_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.CHECKBOX_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.RADIO_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.TOGGLE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.SLIDER_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.RANGE_SLIDER_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.AUTOCOMPLETE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.TAGS_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.CATEGORY_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.HIERARCHICAL_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.TREE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.RELATION_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.CUSTOM_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.SMART_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.AI_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.PREDICTIVE_FILTER]: FilterTypeStatus.ACTIVE,
  [FilterType.SUGGESTIVE_FILTER]: FilterTypeStatus.ACTIVE,
};

/**
 * Get filter type status
 */
export function getFilterTypeStatus(type: FilterType): FilterTypeStatus {
  return FILTER_TYPE_DEFAULT_STATUS[type] || FilterTypeStatus.INACTIVE;
}

/**
 * Set filter type status
 */
export function setFilterTypeStatus(type: FilterType, status: FilterTypeStatus): void {
  FILTER_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Filter type priority levels
 */
export const FILTER_TYPE_PRIORITY_LEVELS = {
  /** Critical - essential filters */
  CRITICAL: 1,
  /** High - important filters */
  HIGH: 2,
  /** Medium - useful filters */
  MEDIUM: 3,
  /** Low - nice to have */
  LOW: 4,
} as const;

/**
 * Get filter types by priority
 */
export function getFilterTypesByPriority(priority: number): FilterType[] {
  return Object.entries(FILTER_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as FilterType);
}

/**
 * Get critical filter types
 */
export function getCriticalFilterTypes(): FilterType[] {
  return getFilterTypesByPriority(FILTER_TYPE_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Filter type groups
 */
export const FILTER_TYPE_GROUPS = {
  /** Time filters */
  TIME: [
    FilterType.DATE_RANGE_FILTER,
    FilterType.DATE_FILTER,
    FilterType.TIME_RANGE_FILTER,
    FilterType.TIME_FILTER,
    FilterType.DATETIME_RANGE_FILTER,
    FilterType.DATETIME_FILTER,
  ],
  /** Number filters */
  NUMBER: [
    FilterType.NUMBER_RANGE_FILTER,
    FilterType.NUMBER_FILTER,
    FilterType.CURRENCY_RANGE_FILTER,
    FilterType.CURRENCY_FILTER,
    FilterType.PERCENTAGE_RANGE_FILTER,
    FilterType.PERCENTAGE_FILTER,
  ],
  /** Selection filters */
  SELECTION: [
    FilterType.DROPDOWN_FILTER,
    FilterType.MULTI_SELECT_FILTER,
    FilterType.CHECKBOX_FILTER,
    FilterType.RADIO_FILTER,
    FilterType.TOGGLE_FILTER,
  ],
  /** Smart filters */
  SMART: [
    FilterType.SMART_FILTER,
    FilterType.AI_FILTER,
    FilterType.PREDICTIVE_FILTER,
    FilterType.SUGGESTIVE_FILTER,
  ],
} as const;
