import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RowService } from './rows/row.service';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:8080',
        credentials: true,
    },
})
export class AppGateway {
    @WebSocketServer()
    server: Server;
}
