/**
 * Tabs Component - Accessible tab interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-ui/src/components/ui/Tabs

 * RULES:
 * ✅ ONLY UI tabs component - NO business logic
 * ✅ NO API calls, routing logic
 * ✅ Pure UI component with accessibility
 * ✅ TypeScript strict with forwardRef
 * ✅ Accessibility support (role="tablist", role="tab", aria-selected)
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Tab label */
  label: string;
  /** Bengali label (optional) */
  labelBn?: string;
  /** Tab content */
  content: React.ReactNode;
  /** Whether tab is disabled */
  disabled?: boolean;
  /** Icon to show before label */
  icon?: React.ReactNode;
  /** Badge count to show after label */
  badge?: number;
}

export interface TabsProps {
  /** Tab items */
  items: TabItem[];
  /** Currently active tab ID (controlled) */
  activeTab?: string;
  /** Default active tab ID (uncontrolled) */
  defaultActiveTab?: string;
  /** Callback when tab changes */
  onTabChange?: (tabId: string) => void;
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Visual variant */
  variant?: 'default' | 'underline' | 'pills' | 'cards';
  /** Size of tabs */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to animate content transition */
  animated?: boolean;
  /** Whether to lazy load content (load only when tab is active) */
  lazyLoad?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Current locale for labels */
  locale?: 'en' | 'bn';
  /** Whether to fit tabs to full width */
  fullWidth?: boolean;
}

// ==================== Styles ====================

const variantStyles = {
  default: {
    tab: 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
    activeTab: 'border-primary-500 text-primary-600 dark:text-primary-400',
    tabList: 'border-b border-gray-200 dark:border-gray-700',
  },
  underline: {
    tab: 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
    activeTab: 'border-primary-500 text-primary-600 dark:text-primary-400',
    tabList: 'border-b border-gray-200 dark:border-gray-700',
  },
  pills: {
    tab: 'rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300',
    activeTab: 'bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400',
    tabList: '',
  },
  cards: {
    tab: 'rounded-t-lg border border-b-0 text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800',
    activeTab: 'bg-white text-primary-600 dark:bg-gray-900 dark:text-primary-400',
    tabList: '',
  },
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const iconSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

// ==================== Subcomponents ====================

export interface TabListProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'underline' | 'pills' | 'cards';
  fullWidth?: boolean;
  className?: string;
}

export const TabList: React.FC<TabListProps> = ({
  children,
  orientation = 'horizontal',
  variant = 'default',
  fullWidth = false,
  className,
}) => {
  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        variantStyles[variant].tabList,
        fullWidth && orientation === 'horizontal' && 'w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

TabList.displayName = 'TabList';

export interface TabTriggerProps {
  children: React.ReactNode;
  value: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  id?: string;
  className?: string;
}

export const TabTrigger: React.FC<TabTriggerProps> = ({
  children,
  value,
  isActive,
  disabled,
  onClick,
  id,
  className,
}) => {
  const triggerId = id || `tab-trigger-${value}`;

  return (
    <button
      id={triggerId}
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`tab-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        variantStyles.default.tab,
        isActive && variantStyles.default.activeTab,
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
};

TabTrigger.displayName = 'TabTrigger';

export interface TabContentProps {
  children: React.ReactNode;
  value: string;
  isActive: boolean;
  id?: string;
  className?: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  children,
  value,
  isActive,
  id,
  className,
}) => {
  const contentId = id || `tab-panel-${value}`;

  if (!isActive) {
    return null;
  }

  return (
    <div
      id={contentId}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`tab-trigger-${value}`}
      className={cn('focus:outline-none', className)}
    >
      {children}
    </div>
  );
};

TabContent.displayName = 'TabContent';

// ==================== Main Component ====================

/**
 * Tabs - Accessible tabs component

 * @example
 * // Basic tabs
 * <Tabs
 *   items={[
 *     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
 *   ]}
 *   defaultActiveTab="tab1"
 * />

 * @example
 * // With icons and badges
 * <Tabs
 *   items={[
 *     { id: 'profile', label: 'Profile', icon: <UserIcon />, content: <ProfileForm /> },
 *     { id: 'settings', label: 'Settings', badge: 3, content: <SettingsForm /> },
 *   ]}
 *   variant="pills"
 * />

 * @example
 * // Vertical tabs with Bengali labels
 * <Tabs
 *   items={[
 *     { id: 'personal', label: 'Personal', labelBn: 'ব্যক্তিগত', content: <PersonalInfo /> },
 *     { id: 'payment', label: 'Payment', labelBn: 'পেমেন্ট', content: <PaymentMethods /> },
 *   ]}
 *   orientation="vertical"
 *   variant="cards"
 *   locale="bn"
 * />
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab: controlledActiveTab,
  defaultActiveTab,
  onTabChange,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  animated = true,
  lazyLoad = false,
  className,
  locale = 'en',
  fullWidth = false,
}) => {
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = React.useState(
    defaultActiveTab || items[0]?.id || ''
  );
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : uncontrolledActiveTab;

  const handleTabChange = (tabId: string) => {
    if (isControlled) {
      onTabChange?.(tabId);
    } else {
      setUncontrolledActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  const getLabel = (item: TabItem): string => {
    if (locale === 'bn' && item.labelBn) {
      return item.labelBn;
    }
    return item.label;
  };

  const activeItem = items.find((item) => item.id === activeTab);

  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-row gap-6' : 'flex-col',
        className
      )}
    >
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          'flex',
          orientation === 'horizontal'
            ? cn('flex-row', fullWidth && 'w-full')
            : 'flex-col',
          orientation === 'horizontal' && variantStyles[variant].tabList,
          variant === 'cards' && 'gap-0',
          variant === 'pills' && 'gap-1',
          variant === 'default' && 'gap-0',
          className
        )}
      >
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const tabClasses = cn(
            'flex items-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            sizeClasses[size],
            variantStyles[variant].tab,
            isActive && variantStyles[variant].activeTab,
            item.disabled && 'cursor-not-allowed opacity-50',
            variant === 'cards' && !isActive && 'border border-transparent',
            variant === 'cards' && isActive && 'border border-gray-200 dark:border-gray-700',
            variant === 'cards' && orientation === 'horizontal' && 'mb-[-1px]',
            variant === 'cards' && orientation === 'vertical' && 'mr-[-1px]',
            variant === 'underline' && 'border-b-2',
            fullWidth && orientation === 'horizontal' && 'flex-1 justify-center'
          );

          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`tab-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleTabChange(item.id)}
              className={tabClasses}
            >
              {item.icon && (
                <span className={cn('flex-shrink-0', iconSizeClasses[size])}>
                  {item.icon}
                </span>
              )}
              <span>{getLabel(item)}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-1.5 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div
        className={cn(
          'flex-1',
          orientation === 'vertical' && 'min-w-0',
          animated && 'transition-all duration-200'
        )}
      >
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const shouldRender = !lazyLoad || isActive;

          if (!shouldRender) return null;

          return (
            <div
              key={item.id}
              id={`tab-panel-${item.id}`}
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`tab-trigger-${item.id}`}
              hidden={!isActive}
              className={cn(
                'focus:outline-none',
                animated && isActive && 'animate-in fade-in-0 duration-200'
              )}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

// ==================== Compound Component API ====================

export interface CompoundTabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'underline' | 'pills' | 'cards';
  className?: string;
}

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'underline' | 'pills' | 'cards';
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within TabsRoot');
  }
  return context;
};

export const TabsRoot: React.FC<CompoundTabsProps> = ({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = 'horizontal',
  variant = 'default',
  className,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        orientation,
        variant,
      }}
    >
      <div
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-row gap-6' : 'flex-col',
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

TabsRoot.displayName = 'TabsRoot';

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { orientation, variant } = useTabsContext();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        variantStyles[variant].tabList,
        className
      )}
    >
      {children}
    </div>
  );
};

TabsList.displayName = 'TabsList';

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  disabled,
  className,
}) => {
  const { value: activeValue, onValueChange, orientation, variant } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`tab-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(value)}
      className={cn(
        'flex items-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        sizeClasses.md,
        variantStyles[variant].tab,
        isActive && variantStyles[variant].activeTab,
        disabled && 'cursor-not-allowed opacity-50',
        variant === 'cards' && !isActive && 'border border-transparent',
        variant === 'cards' && isActive && 'border border-gray-200 dark:border-gray-700',
        variant === 'cards' && orientation === 'horizontal' && 'mb-[-1px]',
        variant === 'cards' && orientation === 'vertical' && 'mr-[-1px]',
        variant === 'underline' && 'border-b-2',
        className
      )}
    >
      {children}
    </button>
  );
};

TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent: React.FC<{ value: string; children: React.ReactNode; className?: string }> = ({
  value,
  children,
  className,
}) => {
  const { value: activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (!isActive) return null;

  return (
    <div
      id={`tab-panel-${value}`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={`tab-trigger-${value}`}
      className={cn('flex-1 focus:outline-none', className)}
    >
      {children}
    </div>
  );
};

TabsContent.displayName = 'TabsContent';

// ==================== Type Exports ====================

export type { TabItem, TabsProps, CompoundTabsProps, TabsTriggerProps };
