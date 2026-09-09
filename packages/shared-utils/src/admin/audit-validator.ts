export interface AdminAudit {
  action: string;
  resource: string;
  resourceId: string;
  changes: Array<{
    field: string;
    from: unknown;
    to: unknown;
  }>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export const validateAudit = (
  audit: Partial<AdminAudit>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!audit.action) errors.push('Action is required');
  if (!audit.resource) errors.push('Resource is required');
  if (!audit.resourceId) errors.push('Resource ID is required');
  return { isValid: errors.length === 0, errors };
};
