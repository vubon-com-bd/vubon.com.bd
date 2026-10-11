import { describe, it, expect } from '@jest/globals';
import { SmsProviderVO } from '../../../../src/module/domain/value-objects/primitives/sms-provider.vo.js';

describe('SmsProviderVO', () => {
  it('create + reconstitute', () => {
    expect(SmsProviderVO.create('twilio').value).toBe('twilio');
    expect(() => SmsProviderVO.create('bad')).toThrow();
    expect(SmsProviderVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(SmsProviderVO.twilio().value).toBe('twilio');
    expect(SmsProviderVO.vonage().value).toBe('vonage');
    expect(SmsProviderVO.awsSns().value).toBe('aws_sns');
    expect(SmsProviderVO.msg91().value).toBe('msg91');
    expect(SmsProviderVO.sslwireless().value).toBe('sslwireless');
    expect(SmsProviderVO.banglalink().value).toBe('banglalink');
    expect(SmsProviderVO.robi().value).toBe('robi');
    expect(SmsProviderVO.grameenphone().value).toBe('grameenphone');
    expect(SmsProviderVO.custom().value).toBe('custom');
  });
  it('predicates', () => {
    expect(SmsProviderVO.sslwireless().isBangladeshi()).toBe(true);
    expect(SmsProviderVO.banglalink().isBangladeshi()).toBe(true);
    expect(SmsProviderVO.twilio().isInternational()).toBe(true);
  });
});
