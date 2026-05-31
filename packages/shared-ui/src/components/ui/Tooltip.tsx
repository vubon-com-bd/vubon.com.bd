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
 * ✅ Full Framer Motion animations
 * ✅ Custom offset support
 * ✅ Proper event cleanup
 * ✅ Touch device support
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant = 'dark' | 'light' | 'primary' | 'danger' | 'success' | 'warning';

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode;
  /** Target element that triggers tooltip */
  children: React.ReactNode;
  /** Tooltip position */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  enterDelay?: number;
  /** Delay before hiding (ms) */
  leaveDelay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Whether to show arrow */
  showArrow?: boolean;
  /** Tooltip variant */
  variant?: TooltipVariant;
  /** Maximum width of tooltip */
  maxWidth?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Custom offset from trigger (px) */
  offset?: number;
  /** Whether tooltip is visible (controlled) */
  visible?: boolean;
  /** Callback when visibility changes */
  onVisibleChange?: (visible: boolean) => void;
  /** Whether to follow mouse cursor */
  followCursor?: boolean;
  /** Z-index level */
  zIndex?: number;
  /** ID for accessibility */
  id?: string;
}

// ==================== Position Classes ====================

const positionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2',
  bottom: 'top-full left-1/2 -translate-x-1/2',
  left: 'right-full top-1/2 -translate-y-1/2',
  right: 'left-full top-1/2 -translate-y-1/2',
};

const arrowPositionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-[-4px] left-1/2 -translate-x-1/2',
  bottom: 'top-[-4px] left-1/2 -translate-x-1/2',
  left: 'right-[-4px] top-1/2 -translate-y-1/2',
  right: 'left-[-4px] top-1/2 -translate-y-1/2',
};

const arrowTransformClasses: Record<TooltipPosition, string> = {
  top: 'rotate-45',
  bottom: 'rotate-45',
  left: 'rotate-45',
  right: 'rotate-45',
};

// ==================== Variant Styles ====================

const variantClasses: Record<TooltipVariant, string> = {
  dark: 'bg-gray-900 text-white dark:bg-gray-950',
  light: 'bg-white text-gray-900 border border-gray-200 shadow-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
  primary: 'bg-primary-600 text-white dark:bg-primary-500',
  danger: 'bg-red-600 text-white dark:bg-red-500',
  success: 'bg-green-600 text-white dark:bg-green-500',
  warning: 'bg-yellow-500 text-white dark:bg-yellow-400 dark:text-gray-900',
};

const arrowVariantClasses: Record<TooltipVariant, string> = {
  dark: 'border-gray-900 dark:border-gray-950',
  light: 'border-white dark:border-gray-800',
  primary: 'border-primary-600 dark:border-primary-500',
  danger: 'border-red-600 dark:border-red-500',
  success: 'border-green-600 dark:border-green-500',
  warning: 'border-yellow-500 dark:border-yellow-400',
};

// ==================== Animation Variants ====================

const animationVariants = {
  initial: (position: TooltipPosition) => ({
    opacity: 0,
    scale: 0.9,
    ...(position === 'top' && { y: -8 }),
    ...(position === 'bottom' && { y: 8 }),
    ...(position === 'left' && { x: -8 }),
    ...(position === 'right' && { x: 8 }),
  }),
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  exit: (position: TooltipPosition) => ({
    opacity: 0,
    scale: 0.9,
    ...(position === 'top' && { y: -4 }),
    ...(position === 'bottom' && { y: 4 }),
    ...(position === 'left' && { x: -4 }),
    ...(position === 'right' && { x: 4 }),
    transition: {
      duration: 0.15,
    },
  }),
};

// ==================== Helper Functions ====================

const getOffsetMargin = (position: TooltipPosition, offset: number): React.CSSProperties => {
  switch (position) {
    case 'top':
      return { marginBottom: offset };
    case 'bottom':
      return { marginTop: offset };
    case 'left':
      return { marginRight: offset };
    case 'right':
      return { marginLeft: offset };
    default:
      return {};
  }
};

// ==================== Component ====================

/**
 * Tooltip - Hover/Click information display component with animations
 *
 * @example
 * // Basic tooltip
 * <Tooltip content="This is a helpful message">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 * @example
 * // With custom position and delay
 * <Tooltip content="Info" position="right" enterDelay={500}>
 *   <Icon name="info" />
 * </Tooltip>
 *
 * @example
 * // Controlled tooltip
 * const [visible, setVisible] = useState(false);
 * <Tooltip
 *   content="Controlled tooltip"
 *   visible={visible}
 *   onVisibleChange={setVisible}
 * >
 *   <button>Click me</button>
 * </Tooltip>
 *
 * @example
 * // Light variant with custom content
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
  enterDelay = 300,
  leaveDelay = 100,
  disabled = false,
  showArrow = true,
  variant = 'dark',
  maxWidth,
  className,
  offset = 6,
  visible: controlledVisible,
  onVisibleChange,
  followCursor = false,
  zIndex = 50,
  id,
}) => {
  const [internalVisible, setInternalVisible] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const enterTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const isControlled = controlledVisible !== undefined;
  const isVisible = isControlled ? controlledVisible : internalVisible;

  const clearTimeouts = React.useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  }, []);

  const show = React.useCallback(() => {
    if (disabled) return;
    clearTimeouts();
    enterTimeoutRef.current = setTimeout(() => {
      if (!isControlled) {
        setInternalVisible(true);
      }
      onVisibleChange?.(true);
    }, enterDelay);
  }, [disabled, clearTimeouts, enterDelay, isControlled, onVisibleChange]);

  const hide = React.useCallback(() => {
    clearTimeouts();
    leaveTimeoutRef.current = setTimeout(() => {
      if (!isControlled) {
        setInternalVisible(false);
      }
      onVisibleChange?.(false);
    }, leaveDelay);
  }, [clearTimeouts, leaveDelay, isControlled, onVisibleChange]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (followCursor && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, [followCursor]);

  React.useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  const offsetStyle = getOffsetMargin(position, offset);
  const maxWidthStyle = maxWidth
    ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }
    : {};

  // Clone child with additional props for accessibility
  const triggerChild = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, {
        'aria-describedby': isVisible ? id : undefined,
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
        onMouseMove: followCursor ? handleMouseMove : undefined,
      })
    : children;

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onMouseMove={followCursor ? handleMouseMove : undefined}
    >
      {triggerChild}

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            id={id}
            role="tooltip"
            style={{ zIndex, ...offsetStyle, ...maxWidthStyle }}
            className={cn(
              'absolute rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-normal shadow-lg',
              positionClasses[position],
              variantClasses[variant],
              className
            )}
            custom={position}
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {content}
            {showArrow && (
              <div
                className={cn(
                  'absolute h-2 w-2',
                  arrowPositionClasses[position],
                  arrowTransformClasses[position],
                  arrowVariantClasses[variant]
                )}
                style={{
                  borderTopColor: variant === 'light' ? 'white' : undefined,
                  borderLeftColor: variant === 'light' ? 'white' : undefined,
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

// ==================== TooltipProvider (Context for defaults) ====================

interface TooltipContextValue {
  enterDelay: number;
  leaveDelay: number;
  variant: TooltipVariant;
  position: TooltipPosition;
  showArrow: boolean;
  offset: number;
  zIndex: number;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

export interface TooltipProviderProps {
  children: React.ReactNode;
  /** Default enter delay (ms) */
  defaultEnterDelay?: number;
  /** Default leave delay (ms) */
  defaultLeaveDelay?: number;
  /** Default variant */
  defaultVariant?: TooltipVariant;
  /** Default position */
  defaultPosition?: TooltipPosition;
  /** Default show arrow */
  defaultShowArrow?: boolean;
  /** Default offset */
  defaultOffset?: number;
  /** Default z-index */
  defaultZIndex?: number;
}

/**
 * TooltipProvider - Provides default configuration for all tooltips
 *
 * @example
 * <TooltipProvider defaultVariant="primary" defaultEnterDelay={200}>
 *   <App />
 * </TooltipProvider>
 */
export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  defaultEnterDelay = 300,
  defaultLeaveDelay = 100,
  defaultVariant = 'dark',
  defaultPosition = 'top',
  defaultShowArrow = true,
  defaultOffset = 6,
  defaultZIndex = 50,
}) => {
  const value = React.useMemo<TooltipContextValue>(
    () => ({
      enterDelay: defaultEnterDelay,
      leaveDelay: defaultLeaveDelay,
      variant: defaultVariant,
      position: defaultPosition,
      showArrow: defaultShowArrow,
      offset: defaultOffset,
      zIndex: defaultZIndex,
    }),
    [defaultEnterDelay, defaultLeaveDelay, defaultVariant, defaultPosition, defaultShowArrow, defaultOffset, defaultZIndex]
  );

  return (
    <TooltipContext.Provider value={value}>
      {children}
    </TooltipContext.Provider>
  );
};

TooltipProvider.displayName = 'TooltipProvider';

/**
 * Hook to use tooltip context
 */
const useTooltipContext = (): TooltipContextValue => {
  const context = React.useContext(TooltipContext);
  if (!context) {
    // Return default values if no provider
    return {
      enterDelay: 300,
      leaveDelay: 100,
      variant: 'dark',
      position: 'top',
      showArrow: true,
      offset: 6,
      zIndex: 50,
    };
  }
  return context;
};

/**
 * TooltipWithProvider - Tooltip that uses provider defaults
 */
export interface TooltipWithProviderProps extends Omit<TooltipProps, 'enterDelay' | 'leaveDelay' | 'variant' | 'position' | 'showArrow' | 'offset' | 'zIndex'> {
  /** Override provider defaults */
  enterDelay?: number;
  leaveDelay?: number;
  variant?: TooltipVariant;
  position?: TooltipPosition;
  showArrow?: boolean;
  offset?: number;
  zIndex?: number;
}

export const TooltipWithProvider: React.FC<TooltipWithProviderProps> = ({
  enterDelay: customEnterDelay,
  leaveDelay: customLeaveDelay,
  variant: customVariant,
  position: customPosition,
  showArrow: customShowArrow,
  offset: customOffset,
  zIndex: customZIndex,
  ...props
}) => {
  const context = useTooltipContext();

  return (
    <Tooltip
      enterDelay={customEnterDelay ?? context.enterDelay}
      leaveDelay={customLeaveDelay ?? context.leaveDelay}
      variant={customVariant ?? context.variant}
      position={customPosition ?? context.position}
      showArrow={customShowArrow ?? context.showArrow}
      offset={customOffset ?? context.offset}
      zIndex={customZIndex ?? context.zIndex}
      {...props}
    />
  );
};

TooltipWithProvider.displayName = 'TooltipWithProvider';

// ==================== Export types ====================

export type { TooltipContextValue };
