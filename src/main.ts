// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // فعالسازی ولیدیشن
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // تنظیمات Swagger
  const config = new DocumentBuilder()
    .setTitle('Travel App API')
    .setDescription('API documentation for Travel App')
    .setVersion('1.0')
    .addBearerAuth() // افزودن پشتیبانی از JWT Bearer
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
