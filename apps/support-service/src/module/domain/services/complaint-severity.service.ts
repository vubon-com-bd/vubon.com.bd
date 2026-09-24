import { ComplaintEntity } from '../entities/complaint.entity';

export class ComplaintSeverityService {
  requiresImmediateAction(complaint: ComplaintEntity): boolean {
    return ['critical', 'high'].includes(complaint.severity.value);
  }

  escalationLevel(complaint: ComplaintEntity): number {
    const map: Record<string, number> = {
      low: 1,
      medium: 2,
      high: 3,
      critical: 4,
    };
    return map[complaint.severity.value] ?? 1;
  }
}
