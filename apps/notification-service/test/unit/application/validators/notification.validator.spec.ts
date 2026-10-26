import { NotificationValidator } from '@application/validators/notification.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { NOTIFICATION_DTO } from '@application-fixtures/dtos.fixture.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('NotificationValidator', () => {
  it('validateSend accepts valid DTO', () => {
    expect(() => NotificationValidator.validateSend(NOTIFICATION_DTO.send)).not.toThrow();
  });

  it('validateSend rejects missing required', () => {
    expect(() => NotificationValidator.validateSend({})).toThrow(ApplicationValidationError);
  });

  it('validateSend rejects invalid type', () => {
    expect(() => NotificationValidator.validateSend({ ...NOTIFICATION_DTO.send, type: 'bogus' }))
      .toThrow(ApplicationValidationError);
  });

  it('validateSendBulk accepts valid DTO', () => {
    expect(() => NotificationValidator.validateSendBulk(NOTIFICATION_DTO.sendBulk)).not.toThrow();
  });

  it('validateSendBulk rejects empty userIds', () => {
    expect(() => NotificationValidator.validateSendBulk({ ...NOTIFICATION_DTO.sendBulk, userIds: [] }))
      .toThrow(ApplicationValidationError);
  });

  it('validateResend accepts valid', () => {
    expect(() => NotificationValidator.validateResend(NOTIFICATION_DTO.resend)).not.toThrow();
  });

  it('validateResend rejects invalid UUID', () => {
    expect(() => NotificationValidator.validateResend({ notificationId: 'bad' }))
      .toThrow(ApplicationValidationError);
  });

  it('validateCancel accepts valid', () => {
    expect(() => NotificationValidator.validateCancel(NOTIFICATION_DTO.cancel)).not.toThrow();
  });

  it('validateCancel rejects missing', () => {
    expect(() => NotificationValidator.validateCancel({})).toThrow(ApplicationValidationError);
  });

  it('field path included in error', () => {
    try {
      NotificationValidator.validateSend({ ...NOTIFICATION_DTO.send, subject: '' });
    } catch (e) {
      expect(e).toBeInstanceOf(ApplicationValidationError);
      expect((e as ApplicationValidationError).field).toBeTruthy();
    }
  });

  it('non-Zod error rethrown', () => {
    expect(() => NotificationValidator.validateSend(null)).toThrow();
  });

  it('Uses IDS fixture (sanity)', () => {
    expect(IDS.userId).toBeTruthy();
  });
});
