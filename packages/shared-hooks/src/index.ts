/**
 * @package @vubon/shared-hooks
 *
 * Shared React hooks.
 *
 * Layers (dependency order):
 *   primitive → utility → integration → table/form/ui → business → admin/seller/customer
 */

export * from './primitive';
export * from './utility';
export * from './integration';

// table's `useSearch` wins over business/search's (aliased to `useBusinessSearch`)
export * from './table';
export * from './form';
export * from './ui';

// business barrel already aliases conflicting names
export * from './business';

export * from './admin';
export * from './seller';
export * from './customer';
