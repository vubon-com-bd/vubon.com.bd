import React from 'react';

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect' | 'card';
  count?: number;
  className?: string;
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  count = 1,
  className = '',
  width,
  height,
}) => {
  const baseStyles = 'animate-pulse bg-gray-200 rounded';

  const variantStyles = {
    text: 'h-4 w-full',
    circle: 'rounded-full',
    rect: 'rounded-md',
    card: 'h-48 w-full rounded-lg',
  };

  const renderSkeleton = (index: number) => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;

    if (variant === 'circle') {
      const size = style.width || style.height || '40px';
      return (
        <div
          key={index}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
          style={{ width: size, height: size, ...style }}
        />
      );
    }

    return (
      <div
        key={index}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        style={style}
      />
    );
  };

  return <>{Array.from({ length: count }, (_, i) => renderSkeleton(i))}</>;
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => {
  return (
    <div className={className}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={`mb-2 h-4 animate-pulse rounded bg-gray-200 ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

export const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({
  size = 'md',
}) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };
  return <div className={`animate-pulse rounded-full bg-gray-200 ${sizes[size]}`} />;
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <SkeletonAvatar size="lg" />
      <SkeletonText lines={3} className="mt-4" />
    </div>
  );
};
