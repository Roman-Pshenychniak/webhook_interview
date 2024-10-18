import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
    imports: [AnalyticsModule],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule { }
