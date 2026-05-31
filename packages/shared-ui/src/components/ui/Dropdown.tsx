/**
 * Dropdown Component - Menu dropdown
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Dropdown
 * 
 * RULES:
 * ✅ ONLY UI dropdown component - NO business logic
 * ✅ NO API calls, auth redirect, business logic
 * ✅ Pure UI component
 * ✅ TypeScript strict
 */

import React from 'react';
import { cn } from '../../utils/cn';
import { useClickOutside } from '../../hooks/useClickOutside';

// ==================== Types ====================

export interface DropdownItem {
  /** Item label */
  label: string;
  /** Bengali label (optional) */
  labelBn?: string;
  /** Item value */
  value: string;
  /** Icon element */
  icon?: React.ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item has danger styling (red) */
  danger?: boolean;
  /** Divider before this item */
  divider?: boolean;
  /** Shortcut key display (e.g., "Ctrl+S") */
  shortcut?: string;
}

export interface DropdownProps {
  /** Trigger element (button that opens dropdown) */
  trigger: React.ReactNode;
  /** Dropdown items */
  items: DropdownItem[];
  /** Callback when item is selected */
  onSelect?: (value: string, item: DropdownItem) => void;
  /** Dropdown alignment */
  align?: 'left' | 'right' | 'center';
  /** Width of dropdown */
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'full';
  /** Whether dropdown is open (controlled) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Placement of dropdown relative to trigger */
  placement?: 'bottom' | 'top';
  /** Additional CSS classes */
  className?: string;
  /** Dropdown content max height */
  maxHeight?: string;
  /** Whether to close on select */
  closeOnSelect?: boolean;
  /** Current locale for label selection */
  locale?: 'en' | 'bn';
}

// ==================== Width Classes ====================

const widthClasses = {
  auto: 'min-w-[160px]',
  sm: 'w-32',
  md: 'w-48',
  lg: 'w-64',
  full: 'w-full',
};

const placementClasses = {
  bottom: 'mt-2',
  top: 'mb-2 bottom-full',
};

// ==================== Component ====================

/**
 * Dropdown - Popup menu triggered by button click
 * 
 * @example
 * // Basic dropdown
 * <Dropdown
 *   trigger={<Button variant="outline">Options</Button>}
 *   items={[
 *     { label: 'Edit', value: 'edit', icon: <EditIcon /> },
 *     { label: 'Duplicate', value: 'duplicate' },
 *     { divider: true },
 *     { label: 'Delete', value: 'delete', danger: true },
 *   ]}
 *   onSelect={(value) => console.log('Selected:', value)}
 * />
 * 
 * @example
 * // Controlled dropdown
 * const [open, setOpen] = useState(false);
 * <Dropdown
 *   trigger={<Button>Open</Button>}
 *   items={items}
 *   open={open}
 *   onOpenChange={setOpen}
 * />
 */
export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  align = 'left',
  width = 'auto',
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom',
  className,
  maxHeight = '300px',
  closeOnSelect = true,
  locale = 'en',
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    if (!controlledOpen) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
  });

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setIsOpen = (open: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(open);
    }
    onOpenChange?.(open);
  };

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: DropdownItem) => {
    if (item.disabled) return;
    onSelect?.(item.value, item);
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  const getLabel = (item: DropdownItem): string => {
    if (locale === 'bn' && item.labelBn) {
      return item.labelBn;
    }
    return item.label;
  };

  // Align classes
  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div onClick={handleTriggerClick} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800',
            placementClasses[placement],
            alignClasses[align],
            widthClasses[width],
            className
          )}
        >
          <div className="overflow-y-auto" style={{ maxHeight }}>
            {items.map((item, index) => (
              <React.Fragment key={item.value || index}>
                {item.divider ? (
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                ) : (
                  <button
                    onClick={() => handleSelect(item)}
                    disabled={item.disabled}
                    className={cn(
                      'flex w-full items-center justify-between px-4 py-2 text-sm transition-colors',
                      item.danger
                        ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                      item.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <span className="flex items-center">
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {getLabel(item)}
                    </span>
                    {item.shortcut && (
                      <span className="ml-4 text-xs text-gray-400 dark:text-gray-500">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

// ==================== DropdownMenu (Alternative API) ====================

export interface DropdownMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  trigger,
  align = 'left',
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 min-w-[160px] overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800',
            align === 'left' ? 'left-0' : 'right-0',
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

DropdownMenu.displayName = 'DropdownMenu';

// ==================== DropdownItem Component ====================

export interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const DropdownItemComp: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  disabled,
  danger,
  icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-full items-center px-4 py-2 text-sm transition-colors',
        danger
          ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

DropdownItemComp.displayName = 'DropdownItem';

// ==================== DropdownDivider ====================

export const DropdownDivider: React.FC = () => {
  return <hr className="my-1 border-gray-200 dark:border-gray-700" />;
};

DropdownDivider.displayName = 'DropdownDivider';
