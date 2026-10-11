/**
 * Services barrel — sanity imports
 */
import { describe, it, expect } from '@jest/globals';
import * as S from '../../../../src/module/domain/services/index.js';

describe('Domain services barrel', () => {
  it('should export NotificationDispatcherService', () => {
    expect(S.NotificationDispatcherService).toBeDefined();
  });
  it('should export NotificationRateLimitService', () => {
    expect(S.NotificationRateLimitService).toBeDefined();
  });
  it('should export NotificationTemplateRendererService', () => {
    expect(S.NotificationTemplateRendererService).toBeDefined();
  });
  it('should export NotificationRetryPolicyService', () => {
    expect(S.NotificationRetryPolicyService).toBeDefined();
  });
  it('should export NotificationChannelPlannerService', () => {
    expect(S.NotificationChannelPlannerService).toBeDefined();
  });
  it('should export NotificationPreferenceCheckerService', () => {
    expect(S.NotificationPreferenceCheckerService).toBeDefined();
  });
});
