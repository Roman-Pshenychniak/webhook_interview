import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RowService } from './row.service';
import { AnalyticsService } from '../analytics/analytics.service';

@WebSocketGateway()
export class RowsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(
        private readonly rowService: RowService,
        private readonly analyticsService: AnalyticsService
    ) { }

    async handleConnection(client: any) {
        console.log('Client connected:', client.id);
        await this.analyticsService.logEvent('Client Connected', client.id, null);
    }

    async handleDisconnect(client: any) {
        console.log('Client disconnected:', client.id);
        await this.analyticsService.logEvent('Client Disconnected', client.id, null);
    }

    @SubscribeMessage('newRow')
    async handleNewRow(client: any, data: { id: number, content: string }): Promise<void> {
        console.log('New row received:', data);
        try {
            const savedRow = await this.rowService.saveRow(data.content);

            await this.analyticsService.logEvent('Row Created', client.id, savedRow.id);

            this.server.emit('rowUpdate', savedRow);
        } catch (error) {
            console.error('Error saving row:', error);
            client.emit('error', { message: 'Failed to save row' });
        }
    }

    @SubscribeMessage('updateRow')
    async handleUpdateRow(client: any, data: { id: number, content: string }): Promise<void> {
        try {
            const updatedRow = await this.rowService.updateRow(data.id, data.content);
            console.log('Updated row:', updatedRow);

            await this.analyticsService.logEvent('Row Updated', client.id, updatedRow.id);

            this.server.emit('rowUpdate', updatedRow);
        } catch (error) {
            console.error('Error updating row:', error);
            client.emit('error', { message: 'Failed to update row.' });
        }
    }

    @SubscribeMessage('deleteRow')
    async handleDeleteRow(client: any, data: { id: number }): Promise<void> {
        try {
            await this.rowService.deleteRow(data.id);
            console.log('Row deleted:', data.id);

            await this.analyticsService.logEvent('Row Deleted', client.id, data.id);

            this.server.emit('rowDeleted', data.id);
        } catch (error) {
            console.error('Error deleting row:', error);
            client.emit('error', { message: 'Failed to delete row.' });
        }
    }
}
