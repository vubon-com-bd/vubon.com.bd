export interface AdminActivity {
  activityId: string;
  adminId: string;
  action: 'create' | 'update' | 'delete' | 'view' | 'manage';
  resource: string;
  resourceId: string;
  beforeState?: Record<string, unknown>;
  afterState?: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export const trackAdminActivity = (
  adminId: string,
  action: string,
  resource: string,
  resourceId: string,
  ip: string
): AdminActivity => {
  return {
    activityId: crypto.randomUUID(),
    adminId,
    action: action as 'create' | 'update' | 'delete' | 'view' | 'manage',
    resource,
    resourceId,
    beforeState: {},
    afterState: {},
    ipAddress: ip,
    userAgent: '',
    timestamp: new Date(),
    metadata: {},
  };
};
