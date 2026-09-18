'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { IconButton } from '../../primitives/IconButton';
import { MoreIcon } from '../../icons/generic/MoreIcon';
import { DropdownMenu } from '../../components/navigation/DropdownMenu';
import type { MenuItem } from '../../components/navigation/Menu';
import { cn } from '../../utils/cn';

export interface RowActionsProps extends HTMLAttributes<HTMLDivElement> {
  readonly actions: readonly MenuItem[];
  readonly label?: string;
}

export const RowActions = forwardRef<HTMLDivElement, RowActionsProps>(function RowActions(
  { actions, label = 'Row actions', className, ...rest },
  ref
) {
  if (actions.length === 0) return null;
  return (
    <div ref={ref} className={cn('inline-flex', className)} {...rest}>
      <DropdownMenu
        align="right"
        items={actions}
        trigger={
          <IconButton variant="ghost" size="icon" aria-label={label}>
            <MoreIcon />
          </IconButton>
        }
      />
    </div>
  );
});

RowActions.displayName = 'RowActions';
