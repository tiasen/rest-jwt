import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix("/api");

  const options = new DocumentBuilder()
      .addBearerAuth({
          type: "apiKey",
          description: "用户令牌"
      }, 'Authorization')
      .setTitle('Zying Project API Document')
      .setDescription('The API document for zying project')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options );
  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.EXPRESS_PORT || 3000);
}
bootstrap();
