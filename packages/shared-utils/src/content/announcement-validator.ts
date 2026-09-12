import { ANNOUNCEMENT_STATUS } from '@vubon/shared-constants/src/content/announcement-status.constants';
import { ANNOUNCEMENT } from '@vubon/shared-constants/src/content/announcement.constants';

export interface AnnouncementInput {
  title: string;
  content: string;
  status: string;
  priority: string;
  startsAt: Date;
  endsAt: Date;
}

export const validateAnnouncement = (
  announcement: Partial<AnnouncementInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!announcement.title) errors.push('Announcement title is required');
  if (!announcement.content) errors.push('Announcement content is required');
  if (announcement.status && !Object.keys(ANNOUNCEMENT_STATUS).includes(announcement.status)) {
    errors.push('Invalid announcement status');
  }
  if (
    announcement.priority &&
    !Object.keys(ANNOUNCEMENT.PRIORITY).includes(announcement.priority)
  ) {
    errors.push('Invalid priority');
  }
  if (
    announcement.startsAt &&
    announcement.endsAt &&
    new Date(announcement.startsAt) > new Date(announcement.endsAt)
  ) {
    errors.push('Start date must be before end date');
  }
  return { isValid: errors.length === 0, errors };
};
