import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  HttpExceptionFilter,
  LoggingInterceptor,
  ResponseInterceptor,
} from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Prefix
  app.setGlobalPrefix('v1');

  // Auto validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // enable cors
  const allowOrigin = process.env.CORS_ACCESS_CONTROL_ALLOW_ORIGIN || '*';
  Logger.log(`Access Control Allow Origin set to : ${allowOrigin}`);
  app.enableCors({
    origin: allowOrigin,
  });

  // Response Formatter
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Logger Formatter
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Http Exception
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
