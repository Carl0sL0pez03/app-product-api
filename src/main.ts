import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger();
  await app.listen(3000);

  logger.log(`Server init: ${await app.getUrl()}`);
}
bootstrap();
