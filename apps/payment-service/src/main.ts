/**
 * Payment Service — Bootstrap
 * @module payment-service
 */
import { config as loadEnvFile } from 'dotenv';
import { resolve } from 'node:path';

// Force-load .env BEFORE any other module imports its providers
const envPath = resolve(process.cwd(), '.env');
const loadResult = loadEnvFile({ path: envPath, override: true });

console.log('════════════════════════════════════════');
console.log('📂 cwd:', process.cwd());
console.log('📂 env path:', envPath);
console.log('📂 env loaded:', !loadResult.error ? '✅' : `❌ ${loadResult.error?.message}`);
console.log('🔑 PERSISTENCE_DRIVER:', process.env['PERSISTENCE_DRIVER'] ?? '(undefined)');
console.log('════════════════════════════════════════');

// ⚠️ Dynamic import: AppModule must load AFTER dotenv
async function bootstrap(): Promise<void> {
  const { NestFactory } = await import('@nestjs/core');
  const { Logger, ValidationPipe, BadRequestException } = await import('@nestjs/common');
  const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
  const { AppModule } = await import('./module/modules/app.module.js');
  const { AllExceptionsFilter } = await import(
    '@vubon/shared-kernel/interfaces/filters'
  );
  const { LoggingInterceptor, CorrelationIdInterceptor } = await import(
    '@vubon/shared-kernel/interfaces/interceptors'
  );

  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Idempotency-Key',
      'X-Idempotency-Key',
      'X-Correlation-Id',
      'Stripe-Signature',
      'X-Bkash-Signature',
      'PayPal-Transmission-Sig',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,  // ← relaxed: log errors but don't reject extra fields
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        const details = errors.map((e) => ({
          field: e.property,
          constraints: e.constraints,
          children: e.children?.map((c) => ({
            field: c.property,
            constraints: c.constraints,
          })),
        }));
        console.error('════════ VALIDATION ERROR ════════');
        console.error(JSON.stringify(details, null, 2));
        console.error('════════════════════════════════════');
        return new BadRequestException({ message: 'Validation failed', details });
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new CorrelationIdInterceptor(),
    new LoggingInterceptor(),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Payment Service API')
    .setDescription('Vubon Payment Service — REST API')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  app.enableShutdownHooks();

  const port = Number(process.env['PORT'] ?? 3006);
  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 Payment Service running on http://0.0.0.0:${port}`);
  logger.log(`📖 Swagger UI: http://0.0.0.0:${port}/api/docs`);
}

void bootstrap();
