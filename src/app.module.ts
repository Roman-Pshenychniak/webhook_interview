import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { RowModule } from './rows/row.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { EmailModule } from './email/email.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    RowModule,
    AnalyticsModule,
    DatabaseModule,
    CacheModule.register({ isGlobal: true }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule { }
