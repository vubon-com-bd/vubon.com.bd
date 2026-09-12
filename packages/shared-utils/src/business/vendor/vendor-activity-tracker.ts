export interface ActivityData {
  activityId: string;
  vendorId: string;
  type: string;
  severity: string;
  description: string;
  data: Record<string, unknown>;
  performedBy: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export const trackVendorActivity = (
  vendorId: string,
  type: string,
  description: string,
  performedBy: string
): ActivityData => {
  return {
    activityId: crypto.randomUUID(),
    vendorId,
    type,
    severity: 'info',
    description,
    data: {},
    performedBy,
    timestamp: new Date(),
    metadata: {},
  };
};
