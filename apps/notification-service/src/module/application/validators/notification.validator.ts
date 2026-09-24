import { SendNotificationSchema, SendBulkSchema } from '../dtos/requests/notification';

export class NotificationValidator {
  static validateSend(input: unknown) {
    return SendNotificationSchema.parse(input);
  }

  static validateSendBulk(input: unknown) {
    return SendBulkSchema.parse(input);
  }
}
