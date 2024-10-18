import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { Analytics } from './analytics.entity';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Event logged successfully.', type: Analytics })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async logEvent(
        @Body('event') event: string,
        @Body('userId') userId: string,
        @Body('rowId') rowId: number,
    ): Promise<Analytics> {
        return this.analyticsService.logEvent(event, userId, rowId);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'List of all analytics events.', type: [Analytics] })
    async getAllAnalytics(): Promise<Analytics[]> {
        return this.analyticsService.getAllAnalytics();
    }
}
