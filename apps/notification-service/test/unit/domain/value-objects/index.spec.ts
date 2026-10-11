/**
 * VO Barrel — imports sanity check
 */
import { describe, it, expect } from '@jest/globals';
import * as VO from '../../../../src/module/domain/value-objects/primitives/index.js';

describe('ValueObjects barrel', () => {
  it('should export NotificationIdVO', () => {
    expect(VO.NotificationIdVO).toBeDefined();
  });

  it('should export NotificationStatusVO', () => {
    expect(VO.NotificationStatusVO).toBeDefined();
  });

  it('should export NotificationChannelVO', () => {
    expect(VO.NotificationChannelVO).toBeDefined();
  });

  it('should export NotificationPriorityVO', () => {
    expect(VO.NotificationPriorityVO).toBeDefined();
  });

  it('should export NotificationTypeVO', () => {
    expect(VO.NotificationTypeVO).toBeDefined();
  });
});
