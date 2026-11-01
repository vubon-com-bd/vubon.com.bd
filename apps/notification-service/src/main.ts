/**
 * Notification Service — Bootstrap
 * @module notification-service
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
console.log('🔑 PRISMA_SKIP_ENGINE_BOOTSTRAP:', process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] ?? '(undefined)');
console.log('🔑 DISABLE_AUTH:', process.env['DISABLE_AUTH'] ?? '(undefined)');
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

  // No global prefix — align with payment/product/cart/vendor/order services
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
      'Sendgrid-Signature',
      'Twilio-Signature',
      'X-Twilio-Signature',
      'X-Webhook-Signature',
      'X-Webhook-Timestamp',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // ← relaxed: log errors but don't reject extra fields
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
    .setTitle('Notification Service API')
    .setDescription('Vubon Notification Service — REST API')
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

  const port = Number(process.env['PORT'] ?? 3003);
  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 Notification Service running on http://0.0.0.0:${port}`);
  logger.log(`📖 Swagger UI: http://0.0.0.0:${port}/api/docs`);
}

void bootstrap();
