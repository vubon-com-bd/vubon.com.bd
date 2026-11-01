/**
 * GatewayModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { GatewayModule } from '@modules/gateway/gateway.module';
import * as Wrappers from '@modules/gateway/gateways';

describe('GatewayModule', () => {
  it('is defined', () => {
    expect(GatewayModule).toBeDefined();
  });

  it('exposes all 9 gateway wrappers', () => {
    expect(Wrappers.BkashModule).toBeDefined();
    expect(Wrappers.NagadModule).toBeDefined();
    expect(Wrappers.RocketModule).toBeDefined();
    expect(Wrappers.StripeModule).toBeDefined();
    expect(Wrappers.PaypalModule).toBeDefined();
    expect(Wrappers.SslcommerzModule).toBeDefined();
    expect(Wrappers.AamarpayModule).toBeDefined();
    expect(Wrappers.CodModule).toBeDefined();
    expect(Wrappers.CryptoModule).toBeDefined();
  });

  it('imports 9 gateway modules', () => {
    const imports = Reflect.getMetadata('imports', GatewayModule) as unknown[];
    expect(imports).toHaveLength(9);
  });
});
