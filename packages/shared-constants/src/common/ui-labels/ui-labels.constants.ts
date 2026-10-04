/**
 * UI labels — i18n-ready string constants.
 * All shared-ui components MUST use these instead of hardcoded strings.
 */
export const UI_LABELS = Object.freeze({
  // Common
  COMMON: Object.freeze({
    LOADING: 'Loading…',
    TRY_AGAIN: 'Try again',
    RETRY: 'Retry',
    CANCEL: 'Cancel',
    CONFIRM: 'Confirm',
    SAVE: 'Save',
    SUBMIT: 'Submit',
    CLOSE: 'Close',
    DISMISS: 'Dismiss',
    REMOVE: 'Remove',
    DELETE: 'Delete',
    EDIT: 'Edit',
    SEARCH: 'Search',
    CLEAR: 'Clear',
    CLEAR_ALL: 'Clear all',
    SELECT_ALL: 'Select all',
    NO_RESULTS: 'No results',
    NO_DATA: 'No data',
    SOMETHING_WRONG: 'Something went wrong',
    BACK: 'Back',
    NEXT: 'Next',
    PREVIOUS: 'Previous',
    MORE: 'More',
    SHOW_MORE: 'Show more',
    SHOW_LESS: 'Show less',
  }),

  // Form
  FORM: Object.freeze({
    REQUIRED: 'Required',
    OPTIONAL: 'Optional',
    INVALID: 'Invalid',
    PASSWORD_SHOW: 'Show password',
    PASSWORD_HIDE: 'Hide password',
    SEARCH_PLACEHOLDER: 'Search…',
    FILE_TOO_LARGE: 'File too large',
  }),

  // Modal
  MODAL: Object.freeze({
    CLOSE: 'Close dialog',
    CONFIRM_TITLE: 'Are you sure?',
    CONFIRM_BUTTON: 'Confirm',
    CANCEL_BUTTON: 'Cancel',
  }),

  // Toast
  TOAST: Object.freeze({
    DISMISS: 'Dismiss notification',
  }),

  // Pagination
  PAGINATION: Object.freeze({
    PREVIOUS_PAGE: 'Previous page',
    NEXT_PAGE: 'Next page',
    PAGE: 'Page',
    ROWS_PER_PAGE: 'Rows per page',
    ITEMS: 'items',
    ITEM: 'item',
  }),

  // Breadcrumb
  BREADCRUMB: Object.freeze({
    LABEL: 'Breadcrumb',
  }),

  // Navigation
  NAVIGATION: Object.freeze({
    SIDEBAR: 'Sidebar',
    SUB_NAVIGATION: 'Sub navigation',
    SECTION_NAVIGATION: 'Section navigation',
    MAIN_NAVIGATION: 'Main navigation',
  }),

  // Media
  MEDIA: Object.freeze({
    PREVIEW: 'Image preview',
    CLOSE_PREVIEW: 'Close preview',
  }),

  // A11y
  A11Y: Object.freeze({
    SKIP_TO_CONTENT: 'Skip to content',
  }),

  // Table
  TABLE: Object.freeze({
    SORT_BY: 'Sort by',
    FILTER: 'Filter',
    ACTIVE_FILTERS: 'Active filters',
    REMOVE_FILTER: 'Remove filter',
    ROW_ACTIONS: 'Row actions',
    BULK_ACTIONS: 'Bulk actions',
    SELECTED: 'selected',
    CLEAR_SELECTION: 'Clear selection',
  }),

  // Auth
  AUTH: Object.freeze({
    LOGIN_REQUIRED: 'Please log in to continue',
    LOGIN: 'Log in',
    LOGOUT: 'Log out',
    LOGGING_IN: 'Logging in…',
  }),
} as const);

export type UiLabels = typeof UI_LABELS;
