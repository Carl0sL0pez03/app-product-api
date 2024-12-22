import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

  logger.log(`Server init: ${await app.getUrl()}`);
}
bootstrap();
