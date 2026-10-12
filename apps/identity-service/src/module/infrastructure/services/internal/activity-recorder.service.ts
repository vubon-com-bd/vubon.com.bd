/**
 * ActivityRecorderService — records user activities with sanitization
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { ACTIVITY_CONFIG } from '@vubon/shared-config/user';

export interface RecordActivityInput {
  readonly userId: string;
  readonly type: string;
  readonly category: string;
  readonly description?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class ActivityRecorderService {
  private readonly logger = new Logger(ActivityRecorderService.name);

  buildRecord(input: RecordActivityInput): Record<string, unknown> {
    const record: Record<string, unknown> = {
      userId: input.userId,
      type: input.type,
      category: input.category,
      occurredAt: new Date().toISOString(),
    };

    if (ACTIVITY_CONFIG.trackIp && input.ipAddress) record['ipAddress'] = input.ipAddress;
    if (ACTIVITY_CONFIG.trackUserAgent && input.userAgent) record['userAgent'] = input.userAgent;
    if (ACTIVITY_CONFIG.trackDevice && input.deviceId) record['deviceId'] = input.deviceId;
    if (input.description) record['description'] = input.description;
    if (ACTIVITY_CONFIG.trackMetadata && input.metadata) record['metadata'] = input.metadata;

    return record;
  }

  shouldRecord(type: string): boolean {
    return ACTIVITY_CONFIG.allowedTypes.includes(type as never);
  }

  isSecurityEvent(category: string): boolean {
    return category === 'security' || category === 'auth';
  }
}
