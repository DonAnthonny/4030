import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  // فعالسازی ولیدیشن
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // تنظیمات Swagger
  const config = new DocumentBuilder()
    .setTitle('Travel App API')
    .setDescription('API documentation for Travel App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // فقط یک بار listen
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
