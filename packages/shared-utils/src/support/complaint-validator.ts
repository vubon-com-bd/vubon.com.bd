import { COMPLAINT } from '@vubon/shared-constants/src/support/complaint.constants';
import { COMPLAINT_SEVERITY } from '@vubon/shared-constants/src/support/complaint-severity.constants';

export interface ComplaintInput {
  userId: string;
  subject: string;
  description: string;
  type: string;
  severity: string;
  status: string;
}

export const validateComplaint = (
  complaint: Partial<ComplaintInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!complaint.userId) errors.push('User ID is required');
  if (!complaint.subject) errors.push('Subject is required');
  if (!complaint.description) errors.push('Description is required');
  if (complaint.type && !Object.keys(COMPLAINT.COMPLAINT_TYPES).includes(complaint.type)) {
    errors.push('Invalid complaint type');
  }
  if (complaint.severity && !Object.keys(COMPLAINT_SEVERITY.TYPES).includes(complaint.severity)) {
    errors.push('Invalid severity');
  }
  if (complaint.status && !Object.keys(COMPLAINT.STATUS).includes(complaint.status)) {
    errors.push('Invalid complaint status');
  }
  return { isValid: errors.length === 0, errors };
};
