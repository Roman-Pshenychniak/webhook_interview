import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytics } from './analytics.entity';
import { Row } from 'src/rows/row.entity';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(Analytics)
        private analyticsRepository: Repository<Analytics>,
        @InjectRepository(Row)
        private rowRepository: Repository<Row>,
    ) { }

    async logEvent(event: string, userId: string, rowId: number): Promise<Analytics> {
        const row = await this.rowRepository.findOne({ where: { id: rowId } });

        const analytics = this.analyticsRepository.create({
            event,
            userId,
            row,
        });

        return this.analyticsRepository.save(analytics);
    }

    async getAllAnalytics(): Promise<Analytics[]> {
        return this.analyticsRepository.find();
    }

}
