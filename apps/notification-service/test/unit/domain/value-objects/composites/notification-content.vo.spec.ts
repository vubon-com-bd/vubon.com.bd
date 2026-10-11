import { describe, it, expect } from '@jest/globals';
import { NotificationContentVO } from '../../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationTitleVO } from '../../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { NotificationDataVO } from '../../../../../src/module/domain/value-objects/primitives/notification-data.vo.js';

describe('NotificationContentVO', () => {
  it('create valid', () => {
    const vo = NotificationContentVO.create({
      title: NotificationTitleVO.create('Hi'),
      body: NotificationBodyVO.create('Body'),
    });
    expect(vo.title.value).toBe('Hi');
    expect(vo.body.value).toBe('Body');
  });
  it('hasData false when no data', () => {
    const vo = NotificationContentVO.create({
      title: NotificationTitleVO.create('Hi'),
      body: NotificationBodyVO.create('B'),
    });
    expect(vo.hasData()).toBe(false);
  });
  it('hasData true with data', () => {
    const vo = NotificationContentVO.create({
      title: NotificationTitleVO.create('Hi'),
      body: NotificationBodyVO.create('B'),
      data: NotificationDataVO.create({ orderId: '1' }),
    });
    expect(vo.hasData()).toBe(true);
  });
  it('reconstitute', () => {
    const vo = NotificationContentVO.reconstitute({
      title: NotificationTitleVO.reconstitute('x'),
      body: NotificationBodyVO.reconstitute('y'),
    });
    expect(vo.title.value).toBe('x');
  });
  it('rejects missing title', () => {
    expect(() => NotificationContentVO.create({} as never)).toThrow();
  });
});
