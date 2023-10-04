import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import { APP_URL, PORT, SetupSwagger } from '@src/config';
import { HttpExceptionFilter } from '@src/httpException';
import { HTTPResponseInterceptor } from '@src/httpResponse';
import { AuthGuard } from '@src/middleware';

const setupMiddlewares = (app: INestApplication) => {
  app.enableCors();
  app.useLogger(new Logger(undefined, { timestamp: true }));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HTTPResponseInterceptor());
  app.useGlobalGuards(new AuthGuard());
};

const logApplicationInfo = () => {
  Logger.log(`Application Running on ${APP_URL}`, 'NestApplication');
  Logger.log(`Swagger Running on ${APP_URL}/swagger`, 'NestApplication');
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  setupMiddlewares(app);
  await SetupSwagger(app);
  await app.listen(PORT);
  logApplicationInfo();
};
bootstrap();
