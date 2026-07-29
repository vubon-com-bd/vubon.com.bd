/**
 * Shared UI Package
 * Exports reusable UI components, form components, layout components, and admin components
 */

// Export UI components
export {
  Button,
  Input,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type InputProps,
} from './components/ui/index.js';

// Export Form components
export { Form, FormInput, type FormProps, type FormInputProps } from './components/forms/index.js';

// Export Customer Layout components
export {
  Layout,
  Header,
  Footer,
  type LayoutProps,
  type HeaderProps,
  type FooterProps,
} from './components/layout/index.js';

// Export Seller components
export {
  SellerLayout,
  SellerHeader,
  SellerSidebar,
  StatsCard,
  RecentActivity,
  type SellerLayoutProps,
  type SellerHeaderProps,
  type SellerSidebarProps,
  type StatsCardProps,
  type RecentActivityProps,
} from './components/seller/index.js';

// Export Admin components
export {
  AdminLayout,
  AdminHeader,
  AdminSidebar,
  AdminStatsCard,
  AdminDataTable,
  type AdminLayoutProps,
  type AdminHeaderProps,
  type AdminSidebarProps,
  type AdminStatsCardProps,
  type AdminDataTableProps,
  type Column,
  type StatsColor,
} from './components/admin-layout/index.js';
