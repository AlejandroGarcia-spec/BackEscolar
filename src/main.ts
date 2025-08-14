import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Aumentar el límite de tamaño del body a 30 MB (o el que necesites)
  app.use(bodyParser.json({ limit: '30mb' }));
  app.use(bodyParser.urlencoded({ limit: '30mb  ', extended: true }));
  app.enableCors({
    origin: '*',
  }); // <-- Esto permite que tu frontend acceda
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
