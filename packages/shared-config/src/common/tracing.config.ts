export const tracingConfig = {
  enabled: true,
  provider: 'jaeger',
  serviceName: 'vubon-api',
  host: 'localhost',
  port: 6832,
  sampling: {
    enabled: true,
    rate: 1.0,
  },
  headers: {
    'x-request-id': true,
    'x-correlation-id': true,
  },
};
