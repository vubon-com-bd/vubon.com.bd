'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Card } from '../../components/data-display/Card';
import { CardBody } from '../../components/data-display/CardBody';
import { CardFooter } from '../../components/data-display/CardFooter';
import { cn } from '../../utils/cn';

export interface EntityCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly media?: ReactNode;
  readonly meta?: ReactNode;
  readonly actions?: ReactNode;
  readonly href?: string;
  readonly onClick?: () => void;
}

export const EntityCard = forwardRef<HTMLDivElement, EntityCardProps>(function EntityCard(
  { title, description, media, meta, actions, href, onClick, className, ...rest },
  ref
) {
  const isInteractive = Boolean(href || onClick);

  const content = (
    <>
      {media && <div className="overflow-hidden rounded-t-lg">{media}</div>}
      <CardBody className="px-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        {description && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>
        )}
        {meta && <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">{meta}</div>}
      </CardBody>
      {actions && <CardFooter className="px-4 pb-3">{actions}</CardFooter>}
    </>
  );

  return (
    <Card
      ref={ref}
      padding="none"
      variant="elevated"
      className={cn(isInteractive && 'cursor-pointer transition-shadow hover:shadow-lg', className)}
      {...rest}
    >
      {href ? (
        <a
          href={href}
          className={cn(
            'flex w-full flex-col text-left',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
          )}
        >
          {content}
        </a>
      ) : onClick ? (
        <button
          type="button"
          onClick={onClick}
          className={cn(
            'flex w-full flex-col text-left',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
          )}
        >
          {content}
        </button>
      ) : (
        <div className="flex w-full flex-col text-left">{content}</div>
      )}
    </Card>
  );
});

EntityCard.displayName = 'EntityCard';
