import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { ANNOUNCEMENT_STATUS } from '@vubon/shared-constants/src/content/announcement-status.constants';
import { ANNOUNCEMENT } from '@vubon/shared-constants/src/content/announcement.constants';
import { AnnouncementType } from './announcement-type.types';

export interface Announcement extends BaseEntity {
  announcementId: string;
  title: string;
  content: string;
  status: keyof typeof ANNOUNCEMENT_STATUS | string;
  type: AnnouncementType;
  priority: keyof typeof ANNOUNCEMENT.PRIORITY | string;
  createdBy: string;
  createdByUser: User;
  image?: string;
  link?: string;
  linkText?: string;
  isActive: boolean;
  isPublished: boolean;
  isDismissible: boolean;
  startsAt: Date;
  endsAt: Date;
  metadata: Record<string, unknown>;
}
