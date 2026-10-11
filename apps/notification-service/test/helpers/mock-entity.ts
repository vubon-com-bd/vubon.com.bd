/**
 * makeFullEntityMock — completes minimal NotificationEntity shape for mappers
 * Use in service tests where NotificationMapper.toResponse() is called.
 */
export interface EntityOverrides {
  id?: string;
  userId?: string;
  type?: string;
  category?: string;
  channel?: string;
  priority?: string;
  status?: string;
  title?: string;
  body?: string;
  isRead?: boolean;
  hasEmail?: boolean;
  hasPhone?: boolean;
  hasDeviceToken?: boolean;
  email?: string;
  phone?: string;
  deviceToken?: string;
}

export function makeFullEntityMock(o: EntityOverrides = {}) {
  const userId = o.userId ?? '00000000-0000-0000-0000-000000000001';
  const isRead = o.isRead === true;

  return {
    id: o.id ?? '00000000-0000-0000-0000-000000000003',
    userId: { value: userId },
    type: { value: o.type ?? 'transactional' },
    category: { value: o.category ?? 'order' },
    channel: { value: o.channel ?? 'email' },
    priority: { value: o.priority ?? 'normal' },
    status: { value: o.status ?? 'pending' },
    content: {
      title: { value: o.title ?? 'T' },
      body: { value: o.body ?? 'B' },
      hasData: () => false,
    },
    recipient: {
      userId: { value: userId },
      hasEmail: () => o.hasEmail === true,
      hasPhone: () => o.hasPhone === true,
      hasDeviceToken: () => o.hasDeviceToken === true,
      email: o.email ? { value: o.email } : undefined,
      phone: o.phone ? { value: o.phone } : undefined,
      deviceToken: o.deviceToken
        ? { value: o.deviceToken, masked: () => 'tk-***' }
        : undefined,
    },
    data: undefined,
    imageUrl: undefined,
    iconUrl: undefined,
    actions: undefined,
    reference: undefined,
    deliveryStatus: { value: 'queued' },
    deliveryAttempts: 0,
    retryAttempts: 0,
    provider: undefined,
    providerMessageId: undefined,
    failureReason: undefined,
    readStatus: { value: isRead ? 'read' : 'unread' },
    readAt: isRead ? new Date().toISOString() : undefined,
    sentAt: undefined,
    deliveredAt: undefined,
    failedAt: undefined,
    cancelledAt: undefined,
    expiredAt: undefined,
    archivedAt: undefined,
    scheduledAt: undefined,
    expiresAt: undefined,
    metadata: undefined,
    isRead: () => isRead,
    markRead() {
      (this as Record<string, unknown>)['readAt'] = new Date().toISOString();
      (this as Record<string, unknown>)['readStatus'] = { value: 'read' };
      (this as Record<string, unknown>)['isRead'] = () => true;
    },
    retry: () => {},
    cancel: () => {},
    queue: () => {},
    isExpiredAt: () => false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pullDomainEvents: () => [],
  };
}
