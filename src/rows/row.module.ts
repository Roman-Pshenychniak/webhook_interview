import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Row } from './row.entity';
import { RowService } from './row.service';
import { RowController } from './row.controller';
import { RowsGateway } from './row.gateway';
import { AnalyticsModule } from '../analytics/analytics.module';
import { EmailModule } from 'src/email/email.module';

@Module({
    imports: [TypeOrmModule.forFeature([Row]), AnalyticsModule, EmailModule],
    controllers: [RowController],
    providers: [RowService, RowsGateway],
    exports: [RowService]
})
export class RowModule { }
