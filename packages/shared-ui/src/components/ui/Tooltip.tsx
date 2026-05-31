/**
 * Tooltip Component - Hover information display
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Tooltip
 * 
 * RULES:
 * ✅ ONLY UI tooltip component - NO business logic
 * ✅ NO API calls, auth logic
 * ✅ Pure UI component with accessibility
 * ✅ TypeScript strict
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Target element that triggers tooltip */
  children: React.ReactNode;
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms) */
  delay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Whether to show arrow */
  showArrow?: boolean;
  /** Tooltip variant */
  variant?: 'dark' | 'light' | 'primary' | 'danger';
  /** Maximum width of tooltip */
  maxWidth?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Custom offset from trigger */
  offset?: number;
}

// ==================== Position Classes ====================

const positionClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2',
  bottom: 'top-full left-1/2 -translate-x-1/2',
  left: 'right-full top-1/2 -translate-y-1/2',
  right: 'left-full top-1/2 -translate-y-1/2',
};

const arrowPositionClasses = {
  top: 'bottom-[-4px] left-1/2 -translate-x-1/2',
  bottom: 'top-[-4px] left-1/2 -translate-x-1/2',
  left: 'right-[-4px] top-1/2 -translate-y-1/2',
  right: 'left-[-4px] top-1/2 -translate-y-1/2',
};

const offsetClasses = {
  top: 'mb-1',
  bottom: 'mt-1',
  left: 'mr-1',
  right: 'ml-1',
};

// ==================== Variant Styles ====================

const variantClasses = {
  dark: 'bg-gray-900 text-white dark:bg-gray-950',
  light: 'bg-white text-gray-900 border border-gray-200 shadow-md',
  primary: 'bg-primary-600 text-white',
  danger: 'bg-red-600 text-white',
};

const arrowVariantClasses = {
  dark: 'border-gray-900 dark:border-gray-950',
  light: 'border-white',
  primary: 'border-primary-600',
  danger: 'border-red-600',
};

// ==================== Component ====================

/**
 * Tooltip - Hover information display component
 * 
 * @example
 * // Basic tooltip
 * <Tooltip content="This is a helpful message">
 *   <button>Hover me</button>
 * </Tooltip>
 * 
 * @example
 * // With custom position and delay
 * <Tooltip content="Info" position="right" delay={500}>
 *   <Icon name="info" />
 * </Tooltip>
 * 
 * @example
 * // Light variant with larger content
 * <Tooltip
 *   content={<div className="p-2">Custom content with <b>formatting</b></div>}
 *   variant="light"
 *   maxWidth={200}
 * >
 *   <span>Hover</span>
 * </Tooltip>
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
  disabled = false,
  showArrow = true,
  variant = 'dark',
  maxWidth,
  className,
  offset = 4,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Calculate offset style
  const offsetStyle = { marginBottom: 0, marginTop: 0, marginLeft: 0, marginRight: 0 };
  if (offset !== 4) {
    offsetStyle.marginBottom = position === 'top' ? offset : 0;
    offsetStyle.marginTop = position === 'bottom' ? offset : 0;
    offsetStyle.marginRight = position === 'left' ? offset : 0;
    offsetStyle.marginLeft = position === 'right' ? offset : 0;
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          style={{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth, ...offsetStyle }}
          className={cn(
            'absolute z-50 rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-normal shadow-lg transition-opacity duration-150',
            positionClasses[position],
            variantClasses[variant],
            className
          )}
        >
          {content}
          {showArrow && (
            <div
              className={cn(
                'absolute h-2 w-2 rotate-45 border-4',
                arrowPositionClasses[position],
                arrowVariantClasses[variant],
                variant === 'light' && 'border-white shadow-sm'
              )}
              style={{
                borderTopColor: variant === 'light' ? 'white' : undefined,
                borderLeftColor: variant === 'light' ? 'white' : undefined,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

// ==================== TooltipProvider (Optional context) ====================

interface TooltipContextValue {
  delay: number;
  variant: TooltipProps['variant'];
}

const TooltipContext = React.createContext<TooltipContextValue>({
  delay: 300,
  variant: 'dark',
});

export const TooltipProvider: React.FC<{
  children: React.ReactNode;
  delay?: number;
  variant?: TooltipProps['variant'];
}> = ({ children, delay = 300, variant = 'dark' }) => {
  return (
    <TooltipContext.Provider value={{ delay, variant }}>
      {children}
    </TooltipContext.Provider>
  );
};

/**
 * Tooltip with context (uses provider values)
 */
export const TooltipWithProvider: React.FC<Omit<TooltipProps, 'delay' | 'variant'>> = ({
  children,
  ...props
}) => {
  const context = React.useContext(TooltipContext);
  return (
    <Tooltip delay={context.delay} variant={context.variant} {...props}>
      {children}
    </Tooltip>
  );
};

TooltipWithProvider.displayName = 'TooltipWithProvider';
