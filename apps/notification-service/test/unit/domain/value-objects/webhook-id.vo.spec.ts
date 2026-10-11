import { describe, it, expect } from '@jest/globals';
import { WebhookIdVO } from '../../../../src/module/domain/value-objects/primitives/webhook-id.vo.js';
import { makeUuid } from '../../../helpers/test-factories.js';

describe('WebhookIdVO', () => {
  it('create valid', () => expect(WebhookIdVO.create(makeUuid()).value).toBeDefined());
  it('rejects empty', () => expect(() => WebhookIdVO.create('')).toThrow());
  it('rejects bad', () => expect(() => WebhookIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(WebhookIdVO.reconstitute('any').value).toBe('any'));
});
