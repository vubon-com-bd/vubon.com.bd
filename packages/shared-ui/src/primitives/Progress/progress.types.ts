export type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger';

export interface ProgressProps {
  readonly value: number;
  readonly max?: number;
  readonly variant?: ProgressVariant;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly label?: string;
  readonly showValue?: boolean;
  readonly className?: string;
}
