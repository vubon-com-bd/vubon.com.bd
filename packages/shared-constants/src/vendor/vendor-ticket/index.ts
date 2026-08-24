/**
 * Vendor Ticket Constants Index
 * Export all vendor ticket constants and types for easy importing
 */

// Vendor Ticket Constants
export {
  VENDOR_TICKET,
  vendorTicketGetTypeLabel,
  vendorTicketGetStatusLabel,
  vendorTicketGetPriorityLabel,
  vendorTicketGetCategoryLabel,
  vendorTicketGetChannelLabel,
  vendorTicketIsOpen,
  vendorTicketIsResolved,
  vendorTicketGetResponseTime,
  vendorTicketGetResolutionTime,
} from './vendor-ticket.constants';

export type {
  VendorTicketType,
  VendorTicketStatus,
  VendorTicketPriority,
  VendorTicketCategory,
  VendorTicketChannel,
} from './vendor-ticket.constants';

// Vendor Ticket Priority Constants
export {
  VENDOR_TICKET_PRIORITY,
  vendorTicketPriorityGetLabel,
  vendorTicketPriorityGetLevel,
  vendorTicketPriorityGetColor,
  vendorTicketPriorityGetResponseTime,
  vendorTicketPriorityGetResolutionTime,
  vendorTicketPriorityGetEscalationTime,
} from './vendor-ticket-priority.constants';

export type {
  VendorTicketPriorityType,
  VendorTicketPriorityLevel,
  VendorTicketPriorityColor,
  VendorTicketPriorityIcon,
} from './vendor-ticket-priority.constants';

// Vendor Ticket Status Constants
export {
  VENDOR_TICKET_STATUS,
  vendorTicketStatusGetLabel,
  vendorTicketStatusIsOpen,
  vendorTicketStatusIsResolved,
  vendorTicketStatusIsPending,
  vendorTicketStatusGetCategory,
  vendorTicketStatusCanTransition,
} from './vendor-ticket-status.constants';

export type {
  VendorTicketStatusType,
  VendorTicketStatusCategory,
  VendorTicketStatusColor,
  VendorTicketStatusIcon,
  VendorTicketStatusTransition,
} from './vendor-ticket-status.constants';
