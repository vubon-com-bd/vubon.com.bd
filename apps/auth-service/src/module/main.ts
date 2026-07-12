// main.ts
app.useGlobalFilters(new HttpExceptionFilter());
app.useGlobalInterceptors(new LoggingInterceptor());
app.useGlobalPipes(new ZodValidationPipe());
