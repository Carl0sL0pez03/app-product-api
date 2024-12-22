import { Module } from '@nestjs/common';

import { ApplicationModule } from './application/application.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ApplicationModule,
  ],
})
export class AppModule {}
