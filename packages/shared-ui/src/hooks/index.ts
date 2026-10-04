/**
 * UI hooks — UI-only state.
 * Layer: Hook
 * Owner: Frontend Platform Team
 *
 * ⚠️ NO business logic, NO API calls.
 */
export { useTheme } from './use-theme';
export type { ThemePreference, UseThemeResult } from './use-theme';
export { useSidebar } from './use-sidebar';
export type { UseSidebarResult } from './use-sidebar';
export { useModal } from './use-modal';
export type { UseModalResult } from './use-modal';
export { useToast } from './use-toast';
export type { UiToast, UiToastVariant, ShowToastInput, UseToastResult } from './use-toast';
export { useTabs } from './use-tabs';
export type { UseTabsResult } from './use-tabs';
export { useAccordion } from './use-accordion';
export type { UseAccordionOptions, UseAccordionResult } from './use-accordion';
export { useStepper } from './use-stepper';
export type { UseStepperResult } from './use-stepper';
export { useCarousel } from './use-carousel';
export type { UseCarouselResult } from './use-carousel';
export { useDropdown } from './use-dropdown';
export type { UseDropdownResult } from './use-dropdown';
export { useTooltip } from './use-tooltip';
export type { UseTooltipOptions, UseTooltipResult } from './use-tooltip';
export { useMediaQuery } from './use-media-query';
