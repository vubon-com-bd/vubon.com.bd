/**
 * Complaint Constants Index
 * Export all complaint constants and types for easy importing
 */

// Complaint Constants
export {
  COMPLAINT,
  complaintGetTypeLabel,
  complaintGetStatusLabel,
  complaintGetSeverityLabel,
  complaintGetResolutionTime,
  complaintIsResolved,
  complaintIsPending,
  complaintCanEscalate,
  complaintGetChannelLabel,
} from './complaint.constants';

export type {
  ComplaintType,
  ComplaintStatus,
  ComplaintSeverity,
  ComplaintChannel,
} from './complaint.constants';

// Complaint Status Constants
export {
  COMPLAINT_STATUS,
  complaintStatusGetLabel,
  complaintStatusIsResolved,
  complaintStatusIsPending,
  complaintStatusIsActive,
  complaintStatusGetCategory,
  complaintStatusCanTransition,
} from './complaint-status.constants';

export type {
  ComplaintStatusType,
  ComplaintStatusCategory,
  ComplaintStatusColor,
  ComplaintStatusIcon,
  ComplaintStatusTransition,
} from './complaint-status.constants';

// Complaint Severity Constants
export {
  COMPLAINT_SEVERITY,
  complaintSeverityGetLabel,
  complaintSeverityGetLevel,
  complaintSeverityGetColor,
  complaintSeverityGetIcon,
  complaintSeverityGetEscalationLevel,
  complaintSeverityGetResponseTime,
  complaintSeverityIsUrgent,
} from './complaint-severity.constants';

export type {
  ComplaintSeverityType,
  ComplaintSeverityLevel,
  ComplaintSeverityColor,
  ComplaintSeverityIcon,
} from './complaint-severity.constants';
