/**
 * Provider-gateways barrel — Export completeness
 */
import * as ProvidersBarrel from '@modules/provider-gateways/providers/index.js';

describe('ProviderGateways Providers Barrel', () => {
  it('should export SendgridProviderModule', () => {
    expect(ProvidersBarrel.SendgridProviderModule).toBeDefined();
  });
  it('should export MailgunProviderModule', () => {
    expect(ProvidersBarrel.MailgunProviderModule).toBeDefined();
  });
  it('should export SesProviderModule', () => {
    expect(ProvidersBarrel.SesProviderModule).toBeDefined();
  });
  it('should export TwilioProviderModule', () => {
    expect(ProvidersBarrel.TwilioProviderModule).toBeDefined();
  });
  it('should export FcmProviderModule', () => {
    expect(ProvidersBarrel.FcmProviderModule).toBeDefined();
  });
  it('should export ApnsProviderModule', () => {
    expect(ProvidersBarrel.ApnsProviderModule).toBeDefined();
  });
  it('should export WebhookProviderModule', () => {
    expect(ProvidersBarrel.WebhookProviderModule).toBeDefined();
  });
});
